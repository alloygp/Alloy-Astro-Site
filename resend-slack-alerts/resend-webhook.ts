// api/resend-webhook.ts
//
// One Vercel function that receives Resend email webhooks from ALL client
// domains, verifies the signature, and posts an alert to Slack.
//
// By default it ONLY alerts on failures (bounced, failed, delayed, complained)
// so you stop getting every single form submission. Flip ALERT_ON_SUCCESS=true
// if you ever want delivered/sent confirmations too.
//
// Runtime: Vercel Node.js (default). Uses the Web-standard Request/Response
// signature so we can read the RAW body with request.text() — svix signature
// verification requires the raw, unparsed body.

import { Webhook } from "svix";

// ── Resend payload shape (only the bits we use) ───────────────────────────────
interface ResendEvent {
  type: string;
  created_at?: string;
  data: {
    email_id?: string;
    from?: string;
    to?: string | string[];
    subject?: string;
    [key: string]: unknown;
  };
}

// ── Which events we treat as "something went wrong" ──────────────────────────
const FAILURE_EVENTS = new Set([
  "email.bounced",
  "email.failed",
  "email.complained",
  "email.delivery_delayed",
]);

const SUCCESS_EVENTS = new Set(["email.delivered", "email.sent"]);

// ── How each event renders in Slack ──────────────────────────────────────────
const EVENT_LABELS: Record<string, string> = {
  "email.bounced": "🔴 Bounced",
  "email.failed": "🔴 Send failed",
  "email.complained": "⚠️ Marked as spam",
  "email.delivery_delayed": "🟡 Delivery delayed",
  "email.delivered": "✅ Delivered",
  "email.sent": "📤 Sent",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function jsonEnv(name: string): Record<string, string> {
  const raw = process.env[name];
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    console.error(`Could not parse ${name} as JSON — ignoring it.`);
    return {};
  }
}

// Pull the domain out of a "Name <forms@domain.com>" or "forms@domain.com" string
function domainFromAddress(addr: string | undefined): string {
  if (!addr) return "unknown";
  const match = addr.match(/@([^>\s]+)/);
  return match ? match[1].toLowerCase() : "unknown";
}

function toList(to: string | string[] | undefined): string {
  if (!to) return "—";
  return Array.isArray(to) ? to.join(", ") : to;
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const defaultSlackUrl = process.env.SLACK_WEBHOOK_URL;
  if (!secret || !defaultSlackUrl) {
    console.error("Missing RESEND_WEBHOOK_SECRET or SLACK_WEBHOOK_URL");
    return new Response("Server not configured", { status: 500 });
  }

  // 1. Read the RAW body and verify the Resend (svix) signature
  const payload = await request.text();
  const headers = {
    "svix-id": request.headers.get("svix-id") ?? "",
    "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
    "svix-signature": request.headers.get("svix-signature") ?? "",
  };

  let event: ResendEvent;
  try {
    event = new Webhook(secret).verify(payload, headers) as ResendEvent;
  } catch (err) {
    console.error("Signature verification failed:", err);
    return new Response("Invalid signature", { status: 400 }); // 400 = don't retry
  }

  // 2. Decide whether this event is worth a Slack ping
  const alertOnSuccess = process.env.ALERT_ON_SUCCESS === "true";
  const isFailure = FAILURE_EVENTS.has(event.type);
  const isSuccess = SUCCESS_EVENTS.has(event.type);

  if (!isFailure && !(alertOnSuccess && isSuccess)) {
    // Acknowledge but stay quiet (this is how the firehose gets shut off)
    return new Response("ok (ignored)", { status: 200 });
  }

  // 3. Figure out which client this is and where it should go
  const domain = domainFromAddress(event.data.from);
  const clientMap = jsonEnv("CLIENT_MAP");
  const slackMap = jsonEnv("SLACK_WEBHOOK_MAP");

  const client = clientMap[domain] ?? domain;
  const slackUrl = slackMap[domain] ?? defaultSlackUrl;
  const label = EVENT_LABELS[event.type] ?? event.type;

  // 4. Build and send the Slack message
  const blocks = [
    {
      type: "header",
      text: { type: "plain_text", text: `${label} — ${client}` },
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Client:*\n${client}` },
        { type: "mrkdwn", text: `*Event:*\n${event.type}` },
        { type: "mrkdwn", text: `*To:*\n${toList(event.data.to)}` },
        { type: "mrkdwn", text: `*Subject:*\n${event.data.subject ?? "—"}` },
        { type: "mrkdwn", text: `*From:*\n${event.data.from ?? "—"}` },
        {
          type: "mrkdwn",
          text: `*When:*\n${event.created_at ?? new Date().toISOString()}`,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `email_id: \`${event.data.email_id ?? "n/a"}\` · domain: \`${domain}\``,
        },
      ],
    },
  ];

  try {
    const res = await fetch(slackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `${label} — ${client} (${event.type})`, // notification fallback
        blocks,
      }),
    });
    if (!res.ok) {
      console.error("Slack rejected the message:", res.status, await res.text());
      return new Response("Slack post failed", { status: 502 }); // 502 = Resend retries
    }
  } catch (err) {
    console.error("Slack post threw:", err);
    return new Response("Slack post failed", { status: 502 });
  }

  return new Response("ok", { status: 200 });
}
