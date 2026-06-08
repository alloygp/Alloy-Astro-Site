// src/pages/api/lead.ts
// Lead capture form handler — for "get a quote / request a review / book a call" forms.
// Fields expected: name, email, company, plus any optional fields (units, goal, etc.)
// Add/remove optional fields in the formData block below without touching anything else.

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
    const data    = await request.formData();
    const name    = data.get("name")?.toString().trim()    ?? "";
    const email   = data.get("email")?.toString().trim()   ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const source  = data.get("source")?.toString().trim()  ?? "";

    // ── Add client-specific optional fields here ──────────────
    // e.g. const units = data.get("units")?.toString().trim() ?? "";
    //      const goal  = data.get("goal")?.toString().trim()  ?? "";
    // ─────────────────────────────────────────────────────────

    if (!email || !name) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        { status: 400 }
      );
    }

    // Internal notification
    try {
      await resend.emails.send({
        from:    EMAIL_CONFIG.from.notifications,
        to:      EMAIL_CONFIG.notify,
        subject: `New lead: ${company || name}`,
        html: `
          <h2>New Lead Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "—"}</p>
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
        subject: EMAIL_CONFIG.copy.lead.confirmSubject,
        html:    EMAIL_CONFIG.copy.lead.confirmBody(name, company, EMAIL_CONFIG.brand.url),
      });
    } catch (err) {
      console.error("Resend confirm error:", err);
    }

    // Mailchimp — always adds leads to the list
    if (EMAIL_CONFIG.mailchimp.enabled) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status:        "subscribed",
          merge_fields: {
            FNAME:   name.split(" ")[0],
            LNAME:   name.split(" ").slice(1).join(" "),
            COMPANY: company,
          },
          tags: EMAIL_CONFIG.mailchimp.defaultTags,
        });
      } catch (err: any) {
        console.error("Mailchimp lead error:", err?.response?.body ?? err);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
