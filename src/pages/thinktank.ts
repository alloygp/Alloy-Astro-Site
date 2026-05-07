// src/pages/thinktank.ts
// Serves public/thinktank.html at /thinktank.
// Uses Vite's ?raw import so the HTML is bundled at build time —
// no filesystem access at runtime (required for Vercel serverless).
import type { APIRoute } from 'astro';
import html from '../assets/thinktank.html?raw';

export const GET: APIRoute = async () => {
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
