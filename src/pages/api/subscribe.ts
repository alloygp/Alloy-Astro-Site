import type { APIRoute } from "astro";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const email = (data.email ?? "").toString().trim() || undefined;
  const firstName = (data.firstName ?? "").toString().trim();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required." }), { status: 400 });
  }

  try {
    await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: { FNAME: firstName },
    });
  } catch (err: any) {
    const alreadyExists = err?.response?.body?.title === "Member Exists";
    if (!alreadyExists) {
      return new Response(JSON.stringify({ error: "Could not subscribe. Please try again." }), { status: 500 });
    }
  }

  await resend.emails.send({
    from: "Alloy Growth Partners <hello@alloygp.co>",
    to: email,
    subject: "You're on the list — welcome to Alloy.",
    html: `<p>Hi${firstName ? ` ${firstName}` : ""},</p><p>Thanks for subscribing. We'll be in touch with insights built specifically for HOA and CAM companies looking to grow.</p><p>— The Alloy Team</p>`,
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
