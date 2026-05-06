// src/pages/thinktank.ts
// Serves public/thinktank.html at /thinktank with no redirect chain.
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  const filePath = path.join(process.cwd(), 'public', 'thinktank.html');
  const html = fs.readFileSync(filePath, 'utf-8');
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
