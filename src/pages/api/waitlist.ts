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
  const email = (data.email ?? "").toString().trim();
  const company = (data.company ?? "").toString().trim();
  const market = (data.market ?? "").toString().trim();

  if (!email || !company) {
    return new Response(JSON.stringify({ error: "Email and company are required." }), { status: 400 });
  }

  // Notify Alloy internally
  await resend.emails.send({
    from: "Alloy Growth Partners <notifications@alloygp.co>",
    to: import.meta.env.INTERNAL_NOTIFY_EMAIL,
    subject: `New waitlist signup — ${market || "unknown market"}`,
    html: `<h2>New Market Waitlist Signup</h2><p><strong>Email:</strong> ${email}</p><p><strong>Company:</strong> ${company}</p><p><strong>Market:</strong> ${market || "not specified"}</p>`,
  });

  // Confirm to the submitter
  await resend.emails.send({
    from: "Alloy Growth Partners <hello@alloygp.co>",
    to: email,
    subject: "You're on the waitlist — Alloy Growth Partners",
    html: `<p>Hi,</p><p>You're on the waitlist for <strong>${market || "your market"}</strong>. We'll reach out the moment that exclusivity opens.</p><p>In the meantime, feel free to explore what we do at <a href="https://alloygp.co">alloygp.co</a>.</p><p>— The Alloy Team</p>`,
  });

  // Add to Mailchimp with waitlist tag
  try {
    await mailchimp.lists.addListMember(import.meta.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: { COMPANY: company },
      tags: ["waitlist", market ? `waitlist-${market.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : "waitlist"],
    });
  } catch (err: any) {
    console.error("Mailchimp waitlist error:", err?.response?.body ?? err);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
