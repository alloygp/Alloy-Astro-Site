// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://alloygp.co',
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  build: {
    // Inline tiny stylesheets to cut requests
    inlineStylesheets: 'auto',
    // Emit /about.html instead of /about/index.html to avoid collision with redirect files
    format: 'file',
  },
  // Legacy .html → clean URL redirects are handled by vercel.json's cleanUrls: true
});
