import type { APIRoute } from "astro";
import { Resend } from "resend";
import mailchimp from "@mailchimp/mailchimp_marketing";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

mailchimp.setConfig({
  apiKey: import.meta.env.MAILCHIMP_API_KEY,
  server: import.meta.env.MAILCHIMP_SERVER_PREFIX,
});

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const name = (data.name ?? "").toString().trim();
  const email = (data.email ?? "").toString().trim();
  const message = (data.message ?? "").toString().trim();
  const subscribe = data.subscribe === "true" || data.subscribe === true;

  if (!email || !name || !message) {
    return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
  }

  await resend.emails.send({
    from: "Alloy Growth Partners <notifications@alloygp.co>",
    to: import.meta.env.INTERNAL_NOTIFY_EMAIL,
    subject: `New contact form submission from ${name}`,
    html: `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p><p><strong>Subscribe:</strong> ${subscribe ? "Yes" : "No"}</p>`,
  });

  await resend.emails.send({
    from: "Alloy Growth Partners <hello@alloygp.co>",
    to: email,
    subject: "We received your message — Alloy Growth Partners",
    html: `<p>Hi ${name},</p><p>Thanks for reaching out. We typically respond within 1 business day.</p><p>In the meantime, feel free to explore our work at <a href="https://alloygp.co">alloygp.co</a>.</p><p>— The Alloy Team</p>`,
  });

  if (subscribe) {
    try {
      await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: name.split(" ")[0] },
      });
    } catch (err: any) {
      console.error("Mailchimp opt-in error:", err?.response?.body ?? err);
    }
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
