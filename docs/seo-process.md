# SEO Process — alloygp.co

This document is the canonical internal reference for SEO on the Alloy Astro site.
It covers how meta tags work, required fields, where defaults live, and what to do
when adding or launching any new page.

---

## Architecture overview

```
src/config/site.ts          ← Single source of truth for site-wide defaults
src/layouts/BaseLayout.astro ← Renders all <head> meta using those defaults
src/content/config.ts       ← Zod schemas for content collections (future MDX)
```

Every page on the site renders its `<head>` through `BaseLayout.astro`. There is
no other place where `<title>`, `<meta>`, OG tags, or JSON-LD are emitted.
**Never add meta tags directly to a page component or `.astro` route file outside
of BaseLayout props.**

---

## Site-wide defaults (`src/config/site.ts`)

| Key | Value | Purpose |
|---|---|---|
| `SITE.name` | `Alloy Growth Partners` | `og:site_name`, JSON-LD name |
| `SITE.url` | `https://alloygp.co` | Canonical base URL |
| `SITE.twitterHandle` | `@alloygp` | `twitter:site` |
| `SITE.defaultOgImage` | `/assets/alloy-og.png` | Fallback OG image for all pages |
| `SITE.ogImageWidth/Height` | `1200` / `630` | OG image dimensions in meta |
| `SITE.locale` | `en_US` | `og:locale` |

If any of these values ever change (new Twitter handle, new default OG image,
rebranding), update `site.ts` only. Everything propagates automatically.

---

## BaseLayout props reference

```astro
<BaseLayout
  title="Page Title — Alloy"         {/* required, ≤ 60 chars */}
  description="Meta description."    {/* required, 120–160 chars */}
  pageId="services"                  {/* optional — controls nav highlight */}
  ogType="website"                   {/* optional — 'website' | 'article' */}
  ogImage="/assets/og/my-page.png"   {/* optional — per-page OG image override */}
  robots="noindex,nofollow"          {/* optional — omit for normal pages */}
  headerTheme="light"                {/* optional — 'light' | 'purple' */}
  animatedBar={true}                 {/* optional — footer accent bar */}
  hideHeader={false}                 {/* optional — for course pages etc. */}
  pageSchema={schemaObject}          {/* optional — JSON-LD schema object/array */}
>
```

### `pageId` values

| Value | Highlights nav item |
|---|---|
| `home` | (no highlight) |
| `about` | About |
| `services` | Services |
| `boardsuite` | BoardSuite |
| `approach` | Our Approach |
| `resources` | Resources |

---

## Adding meta to a new page

### Standard page (custom `.tsx` component)

Create two files:

**1. `src/components/pages/MyNewPage.tsx`** — page content only, no meta.

**2. `src/pages/my-url-slug.astro`** — thin wrapper with all SEO props:

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import MyNewPage from '~/components/pages/MyNewPage';
---
<BaseLayout
  title="Specific Page Title — Alloy"
  description="120–160 char description focused on the page's primary value proposition."
  pageId="services"
>
  <MyNewPage client:load />
</BaseLayout>
```

That's it. Canonical URL is auto-derived from `Astro.url.pathname`. OG tags,
Twitter cards, and the Organization JSON-LD all emit automatically.

### Article / resource hub page

Use `ogType="article"` and add an `Article` JSON-LD schema:

```astro
---
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Your Article Title',
  description: 'Article description.',
  author: { '@type': 'Organization', name: 'Alloy Growth Partners' },
  publisher: { '@type': 'Organization', name: 'Alloy Growth Partners' },
  datePublished: '2026-05-01',
  url: 'https://alloygp.co/resource-hub/your-slug',
};
---
<BaseLayout
  title="Article Title — Alloy Resource Hub"
  description="…"
  pageId="resources"
  ogType="article"
  pageSchema={articleSchema}
>
  <MyArticle client:load />
</BaseLayout>
```

### Service page with FAQ schema

```astro
---
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Question text?',
      acceptedAnswer: { '@type': 'Answer', text: 'Answer text.' },
    },
  ],
};
---
<BaseLayout
  title="…"
  description="…"
  pageId="services"
  pageSchema={faqSchema}
>
```

---

## Required fields

| Field | Required? | Max length | Notes |
|---|---|---|---|
| `title` | **Yes** | 60 chars | Include brand suffix `— Alloy` or `\| Alloy GP` |
| `description` | **Yes** | 160 chars | Minimum ~120 chars. Focus on value, not features. |
| `pageId` | Recommended | — | Omit only for legal, error, or redirect-only pages |
| `ogType` | No | — | Default `website`; use `article` for editorial content |
| `ogImage` | No | — | Only override when you have a page-specific 1200×630 PNG |
| `robots` | No | — | Omit entirely for pages you want indexed |
| `pageSchema` | Recommended | — | Add FAQ schema on service pages; Article schema on articles |

### What NOT to include

- **`<meta name="keywords">`** — deprecated, ignored by Google, leaks competitive strategy. It is not in BaseLayout and must not be added.
- **Duplicate canonical tags** — BaseLayout emits the canonical automatically. Never add a second `<link rel="canonical">` inside a page component.

---

## Custom vs. collection-based pages

### Custom pages (current system)

All current pages are custom: a TSX component + an Astro route shell. SEO is
declared inline on the `<BaseLayout>` in the `.astro` file.

### Collection-based pages (future)

When content moves to MDX (blog posts, case studies), use Astro content
collections with the schemas defined in `src/content/config.ts`. The schemas
enforce required fields at build time — a missing `title` or `description`
in frontmatter will fail `astro build`.

Example collection entry (`src/content/articles/my-post.mdx`):

```yaml
---
title: "How CAM Firms Win in AI Search"           # required, ≤ 70 chars
description: "ChatGPT and Perplexity now answer…" # required, 50–160 chars
pubDate: 2026-05-01                                # required
author: "Alloy Growth Partners"                    # optional
tags: ["SEO", "AI search", "GEO"]                 # optional
pillar: "reach"                                    # optional
---
```

A dynamic route (`src/pages/resource-hub/[slug].astro`) would then do:

```astro
---
import { getCollection } from 'astro:content';
const { entry } = Astro.props;
const { Content } = await entry.render();
---
<BaseLayout
  title={entry.data.title}
  description={entry.data.description}
  ogImage={entry.data.ogImage}
  ogType="article"
  pageId="resources"
>
  <Content />
</BaseLayout>
```

---

## Per-page OG images

The default OG image (`/assets/alloy-og.png`, 1200×630px) is used by all pages
unless overridden. To set a custom OG image for a page:

1. Add the image file to `/public/assets/og/` (create the folder if needed)
2. Name it after the page slug: `/public/assets/og/your-slug.png`
3. Pass it to BaseLayout: `ogImage="/assets/og/your-slug.png"`
4. Dimensions must be **1200×630px PNG**

High-priority pages to eventually give custom OG images:
- Homepage
- BoardSuite
- Each pillar overview (BoardReach, BoardMatch, BoardRetain)
- Key case study pages

---

## `robots` meta — when to use noindex

BaseLayout only emits `<meta name="robots">` when the `robots` prop is explicitly
set. Absence means the page is fully indexable (default behavior).

| Page type | Recommended value |
|---|---|
| Normal content / service / about pages | (omit — default index) |
| Legal pages (privacy, terms) | `noindex,follow` |
| Tool/calculator pages with no organic value | `noindex,nofollow` |
| Thank-you / confirmation pages | `noindex,nofollow` |
| Legacy redirect pages | `noindex,follow` |
| Staging / preview deployments | `noindex,nofollow` (set via env var) |

Current pages with `robots` set:

| Page | Value | Reason |
|---|---|---|
| `/privacy-policy` | `noindex,follow` | Legal utility |
| `/terms-conditions` | `noindex,follow` | Legal utility |
| `/growth-modeled` | `noindex,nofollow` | Calculator tool |
| `/results/rise-amg` | `noindex,follow` | Legacy URL, redirects to apex-cmg |

---

## New page launch checklist

Before merging / deploying any new page:

- [ ] `title` set — ≤ 60 chars, includes brand suffix
- [ ] `description` set — 120–160 chars, value-prop focused
- [ ] `pageId` set (if it belongs to a nav section)
- [ ] `ogType` correct (`article` for editorial, `website` for everything else)
- [ ] `pageSchema` added if page has FAQs or is an article
- [ ] `robots` set if the page should NOT be indexed
- [ ] Custom `ogImage` created and referenced if the page warrants one
- [ ] Canonical URL will be correct (auto-derived from Astro.url.pathname — just verify the route file is at the right path)
- [ ] Redirect added in `astro.config.mjs` if an old URL should point here
- [ ] CLAUDE.md file tree and changelog updated

---

## Sitemap and robots.txt

These are auto-generated by Astro's sitemap integration configured in
`astro.config.mjs`. Pages with `robots="noindex"` are **not** automatically
excluded from the sitemap — if a page should be excluded, add it to the
`exclude` list in the sitemap integration config.

---

## Where to go if something looks wrong

| Problem | Where to look |
|---|---|
| Wrong site name in OG tags | `src/config/site.ts` → `SITE.name` |
| Wrong default OG image | `src/config/site.ts` → `SITE.defaultOgImage` |
| Twitter handle wrong | `src/config/site.ts` → `SITE.twitterHandle` |
| Canonical URL wrong | Check the `.astro` route file path matches the intended URL |
| JSON-LD not appearing | Check `pageSchema` prop is a plain object (not a class instance) |
| Page indexed that shouldn't be | Add `robots="noindex,follow"` to the BaseLayout call |
| Build failing on content collection entry | Check frontmatter against schema in `src/content/config.ts` |
