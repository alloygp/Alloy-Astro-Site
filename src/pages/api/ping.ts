import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email")?.toString() ?? "(none)";
  return new Response(JSON.stringify({ ok: true, received: email }), { status: 200 });
};
