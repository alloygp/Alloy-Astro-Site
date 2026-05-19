// ============================================================
// email.config.ts — ONE file to edit per client site.
// Drop this into src/lib/ and update the values below.
// The API routes (contact.ts, subscribe.ts, lead.ts) import
// this and never need to be touched per client.
// ============================================================

export const EMAIL_CONFIG = {

  // ── Brand ────────────────────────────────────────────────
  brand: {
    name: "Client Name",          // e.g. "Match HOA"
    url:  "https://clientsite.com",
    team: "The Team",             // used in email sign-offs: "— The Team"
  },

  // ── Sending addresses ─────────────────────────────────────
  // Both must be from a domain verified in your Resend account.
  from: {
    notifications: "Client Name <notifications@clientsite.com>",
    hello:         "Client Name <hello@clientsite.com>",
  },

  // ── Internal notification recipients ─────────────────────
  // Everyone here gets a copy of every form submission.
  notify: [
    "owner@clientsite.com",
    // "teammate@clientsite.com",
  ],

  // ── Mailchimp (set enabled: false to skip list sync) ──────
  mailchimp: {
    enabled:     true,
    defaultTags: ["website-lead"],   // applied to all lead/contact submissions
  },

  // ── Per-form email copy ───────────────────────────────────
  // Confirmation emails sent to the person who submitted.
  copy: {
    contact: {
      confirmSubject: "We received your message",
      confirmBody:    (name: string, _siteUrl: string) =>
        `<p>Hi ${name},</p>
        <p>Thanks for reaching out. We typically respond within 1 business day.</p>
        <p>— The Team</p>`,
    },
    lead: {
      confirmSubject: "Thanks — we'll be in touch",
      confirmBody:    (name: string, company: string, siteUrl: string) =>
        `<p>Hi ${name},</p>
        <p>We received your info and someone will reach out shortly to talk through what ${company || "your business"} needs.</p>
        <p>In the meantime, feel free to browse <a href="${siteUrl}">${siteUrl}</a>.</p>
        <p>— The Team</p>`,
    },
    subscribe: {
      confirmSubject: "You're on the list",
      confirmBody:    (name: string) =>
        `<p>Hi${name ? ` ${name}` : ""},</p>
        <p>Thanks for subscribing. We'll be in touch with useful content soon.</p>
        <p>— The Team</p>`,
    },
  },
};
