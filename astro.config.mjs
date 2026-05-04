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
  },
  redirects: {
    // Legacy .html URLs → clean routes (matches old static-preview behavior)
    '/index.html': '/',
    '/about.html': '/about',
    '/about/testimonials.html': '/about/testimonials',
    '/we-know-cam.html': '/we-know-cam',
    '/contact.html': '/contact',
    '/strategic-review-request.html': '/strategic-review-request',
    '/services.html': '/services',
    '/hoa-cam-marketing-services.html': '/hoa-cam-marketing-services',
    '/property-management-seo.html': '/property-management-seo',
    '/hoa-board-education-programs.html': '/hoa-board-education-programs',
    '/groundwork.html': '/groundwork',
    '/boardsuite.html': '/boardsuite',
    '/our-approach.html': '/our-approach',
    '/our-approach/boardreach.html': '/our-approach/boardreach',
    '/our-approach/boardmatch.html': '/our-approach/boardmatch',
    '/our-approach/boardretain.html': '/our-approach/boardretain',
    '/resource-hub.html': '/resource-hub',
    '/resource-hub/ai-search-for-cam.html': '/resource-hub/ai-search-for-cam',
    '/resource-hub/cam-marketing-strategy.html': '/resource-hub/cam-marketing-strategy',
    '/courses.html': '/courses',
    '/results.html': '/results',
    '/results/rise-amg.html': '/results/rise-amg',
    '/faq.html': '/faq',
    '/terms-conditions.html': '/terms-conditions',
    '/privacy-policy.html': '/privacy-policy',
  },
});
