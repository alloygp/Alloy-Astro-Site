/**
 * src/content/config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Astro content collection schemas.
 *
 * Every collection entry MUST declare the required SEO fields (title,
 * description, slug). Missing required fields cause `astro build` to fail —
 * that's intentional.
 *
 * Current collections: articles, caseStudies
 *
 * To add content:
 *   1. Create src/content/<collectionName>/<slug>.mdx
 *   2. Add the required frontmatter fields listed in the schema below
 *   3. Import and render from a [slug].astro dynamic route
 *
 * See docs/seo-process.md for the full workflow.
 */

import { defineCollection, z } from 'astro:content';

// ── Shared SEO fields required on every collection entry ─────────────────────
const seoFields = {
  /** Page <title>. Keep ≤ 60 chars for clean SERP display. */
  title: z.string().max(70),

  /** Meta description. Keep 120–160 chars. */
  description: z.string().min(50).max(160),

  /**
   * Per-entry OG image path (relative to /public, e.g. /assets/og/my-post.png).
   * Falls back to SITE.defaultOgImage if omitted.
   */
  ogImage: z.string().optional(),
};

// ── Resource hub articles ─────────────────────────────────────────────────────
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    ...seoFields,

    /** ISO 8601 publish date */
    pubDate: z.date(),

    /** ISO 8601 last-updated date — drives og:updated_time and JSON-LD */
    updatedDate: z.date().optional(),

    /** Author display name */
    author: z.string().default('Alloy Growth Partners'),

    /** Taxonomy tags for filtering / related content */
    tags: z.array(z.string()).optional(),

    /** Which pillar this article supports */
    pillar: z.enum(['reach', 'match', 'retain', 'general']).default('general'),

    /** Set true to exclude from listings and sitemaps */
    draft: z.boolean().default(false),
  }),
});

// ── Case studies ──────────────────────────────────────────────────────────────
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    ...seoFields,

    /** Anonymised client name shown publicly */
    clientName: z.string(),

    /** Metro market (e.g. "Phoenix, AZ") */
    market: z.string().optional(),

    /** Engagement start date */
    publishedDate: z.date(),

    /** Headline stat for cards / social */
    heroStat: z.string().optional(),

    draft: z.boolean().default(false),
  }),
});

// ── Services (future: MDX-driven service pages) ───────────────────────────────
const services = defineCollection({
  type: 'data',
  schema: z.object({
    ...seoFields,

    /** URL slug — must match the astro route filename */
    slug: z.string(),

    /** Which BoardSuite pillar this service belongs to */
    pillar: z.enum(['reach', 'match', 'retain']),

    /** Nav / card display name */
    name: z.string(),

    /** Whether this service page is live */
    published: z.boolean().default(true),
  }),
});

export const collections = { articles, caseStudies, services };
