// src/pages/api/contact.ts
// Generic contact form handler — reads all client-specific values from email.config.ts.
// Fields expected: name, email, message, subscribe (optional), source (optional honeypot/meta).

import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { EMAIL_CONFIG } from "~/lib/email.config";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey:  import.meta.env.MAILCHIMP_API_KEY,
  server:  import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data      = await request.formData();
    const name      = data.get("name")?.toString().trim()      ?? "";
    const email     = data.get("email")?.toString().trim()     ?? "";
    const message   = data.get("message")?.toString().trim()   ?? "";
    const subscribe = data.get("subscribe") === "true";
    const source    = data.get("source")?.toString().trim()    ?? "";

    if (!email || !name || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required." }),
        { status: 400 }
      );
    }

    // Internal notification
    try {
      await resend.emails.send({
        from:    EMAIL_CONFIG.from.notifications,
        to:      EMAIL_CONFIG.notify,
        subject: `New contact form submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>
          ${source ? `<hr><p style="color:#888;font-size:13px"><strong>Source</strong><br>${source.replace(/\n/g, "<br>")}</p>` : ""}
        `,
      });
    } catch (err) {
      console.error("Resend notify error:", err);
    }

    // Confirmation to submitter
    try {
      await resend.emails.send({
        from:    EMAIL_CONFIG.from.hello,
        to:      email,
        subject: EMAIL_CONFIG.copy.contact.confirmSubject,
        html:    EMAIL_CONFIG.copy.contact.confirmBody(name, EMAIL_CONFIG.brand.url),
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    // Optional Mailchimp list sync
    if (subscribe && EMAIL_CONFIG.mailchimp.enabled) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status:        "subscribed",
          merge_fields:  { FNAME: name.split(" ")[0] },
        });
      } catch (err: any) {
        console.error("Mailchimp opt-in error:", err?.response?.body ?? err);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
