# Resend → Slack alerts

One Vercel endpoint that all client domains point their Resend webhooks at.
It verifies the signature and posts to Slack **only when an email fails**
(bounced, send-failed, delayed, or marked as spam) — so you stop receiving
every single form submission and only hear about problems.

## What counts as a failure

| Event                    | Slack shows         |
| ------------------------ | ------------------- |
| `email.bounced`          | 🔴 Bounced          |
| `email.failed`           | 🔴 Send failed      |
| `email.delivery_delayed` | 🟡 Delivery delayed |
| `email.complained`       | ⚠️ Marked as spam   |

`email.delivered` / `email.sent` are ignored unless `ALERT_ON_SUCCESS=true`.

## One-time setup

### 1. Make the Slack channel + Incoming Webhook
- In Slack, create the channel (e.g. `#form-alerts`).
- api.slack.com → Your Apps → create an app → enable **Incoming Webhooks** →
  add one to that channel → copy the `https://hooks.slack.com/...` URL.

### 2. Deploy this folder to Vercel
- New Vercel project from this repo (it auto-detects the `api/` function).
- Add environment variables (see `.env.example`):
  - `RESEND_WEBHOOK_SECRET` — fill in after step 3
  - `SLACK_WEBHOOK_URL` — from step 1
  - `CLIENT_MAP` — optional friendly names
- Your endpoint will be: `https://<project>.vercel.app/api/resend-webhook`

### 3. Add the webhook in Resend
- Resend dashboard → **Webhooks** → Add endpoint → paste the URL above.
- Subscribe to: `email.bounced`, `email.failed`, `email.delivery_delayed`,
  `email.complained` (add `email.delivered` only if you want success pings).
- Copy the **Signing Secret** (`whsec_...`) → set it as `RESEND_WEBHOOK_SECRET`
  in Vercel → redeploy.

### 4. Point every client at it
Resend webhooks are account-wide, so if all client sites send through the same
Resend account, **this one endpoint already covers all of them**. If a client
has its own Resend account, add the same endpoint URL there too.

## Test it
- Resend dashboard lets you send a test event to the webhook.
- Or send a real email to a bounce tester like `bounced@resend.dev` —
  Resend treats it as a hard bounce and you should see the Slack alert.

## Routing different clients to different channels (optional)
Create a second Incoming Webhook for another channel and set `SLACK_WEBHOOK_MAP`:

```
SLACK_WEBHOOK_MAP={"keys-caldwell.com":"https://hooks.slack.com/services/.../kc"}
```

Anything not in the map uses `SLACK_WEBHOOK_URL`.
