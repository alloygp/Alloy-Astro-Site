// src/config/site.ts
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all site-level config.
// Fill in every TODO before going live. BaseLayout pulls from here — you should
// never hardcode site name, URL, OG image, or org data anywhere else.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name:           'TODO: Company Name',          // e.g. "Alloy Growth Partners"
  url:            'https://TODO.com',            // no trailing slash, production URL

  // ── Default OG image ───────────────────────────────────────────────────────
  // 1200×630px PNG in /public/assets/. Per-page overrides via BaseLayout ogImage prop.
  defaultOgImage: '/assets/og.png',
  ogImageWidth:   '1200',
  ogImageHeight:  '630',

  // ── Locale / social ────────────────────────────────────────────────────────
  locale:         'en_US',
  twitterHandle:  '@TODO',                       // e.g. "@alloygp"

  // ── Organization schema (used on every page) ───────────────────────────────
  org: {
    type:            'LocalBusiness' as const,   // or 'Organization', 'ProfessionalService', etc.
    logo:            'https://TODO.com/assets/logo.svg',
    telephone:       'TODO',                     // e.g. "+12108455989"
    email:           'TODO@TODO.com',
    addressLocality: 'TODO City',
    addressRegion:   'TX',                       // 2-letter state/region
    addressCountry:  'US',
    areaServed:      'United States',
    priceRange:      '$$',                       // $, $$, $$$, $$$$
  },
};
