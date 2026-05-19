// src/pages/api/subscribe.ts
// Newsletter subscribe handler.
// Fields expected: email, firstName (optional).

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
    const email     = data.get("email")?.toString().trim()     ?? "";
    const firstName = data.get("firstName")?.toString().trim() ?? "";

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required." }),
        { status: 400 }
      );
    }

    // Mailchimp list add (handles "already subscribed" gracefully)
    if (EMAIL_CONFIG.mailchimp.enabled) {
      try {
        await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
          email_address: email,
          status:        "subscribed",
          merge_fields:  { FNAME: firstName },
        });
      } catch (err: any) {
        const alreadyExists = err?.response?.body?.title === "Member Exists";
        if (!alreadyExists) {
          console.error("Mailchimp subscribe error:", err?.response?.body ?? err);
          return new Response(
            JSON.stringify({ error: "Could not subscribe. Please try again." }),
            { status: 500 }
          );
        }
      }
    }

    // Welcome email to subscriber
    try {
      await resend.emails.send({
        from:    EMAIL_CONFIG.from.hello,
        to:      email,
        subject: EMAIL_CONFIG.copy.subscribe.confirmSubject,
        html:    EMAIL_CONFIG.copy.subscribe.confirmBody(firstName),
      });
    } catch (err) {
      console.error("Resend welcome error:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500 }
    );
  }
};
