# Astro Migration — Status & Handoff

**Status:** Foundation complete. Page-component porting partially done. **Not yet runnable as a complete site** — see "What's left" below.

This folder contains the in-progress Astro rewrite of the original SPA‑style site that lives in the parent project (`index.html` + `app.jsx` + ~7 JSX files loaded via Babel-in-browser).

## What's done ✅

### Scaffold
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `vercel.json`
- React integration wired up
- Strict TS config with `~/*` path alias to `src/*`
- Legacy `.html` URL redirects configured in `astro.config.mjs`

### Assets (copied verbatim from parent)
- `public/assets/` — logo, icon, jason-delgado.jpg
- `public/fonts/` — 6 Gotham OTF files
- `public/robots.txt`, `public/sitemap.xml`
- `src/styles/colors_and_type.css`, `src/styles/site.css`, `src/styles/chrome.css`

### Layout & chrome
- **`src/layouts/BaseLayout.astro`** — single shell replacing all 24 `.html` files. Per-page SEO via props (`title`, `description`, `pageId`, `animatedBar`). Ships `<head>` (meta, OG, fonts, JSON-LD ProfessionalService), header + footer, content `<slot />`.
- **`src/components/chrome/SiteHeader.tsx`** — full hide-on-scroll header with mega menu, dropdown, mobile drawer. `client:load`.
- **`src/components/chrome/SiteFooter.tsx`** — brand block, link columns, Mailchimp newsletter (JSONP), bottom bar. `client:visible`.
- **`src/components/Icon.tsx`** — Lucide-style icon set (~30 icons), pure SVG. Drop-in replacement for the original `<Icon>`.
- **`src/components/AccentBar.tsx`** — 5-color brand bar.
- **`src/components/EngineLoop.tsx`** — animated SVG pillar marks (reach/match/retain).
- **`src/lib/tokens.ts`** — `PURPLE`, `PINK`, `YELLOW`, `BLUE`, `GREEN` color constants.
- **`src/lib/nav.ts`** — `NAV` config (single source of truth for header + footer + mobile).

### Behavioral changes vs the original
- **Tweaks panel removed.** The original homepage had a `<TweaksPanel>` (5-way hero variant + layout + color mode + density + animated bar). Per direction, the new build hard-codes the chosen defaults: `heroVariant="refined"`, `heroLayout="split"`, `colorMode="deep"`, `density="editorial"`, `animatedBar=true`, `statsHero=true`. The Tweaks UI is gone; the Hero variants and layouts can stay as code branches if we want them back later.
- **`window.__alloyTweaks` and `getTweak()` removed.** Pages that read tweaks now take normal props.
- **Asset hashing dropped.** Original used `window.ASSET("path")` to add cache-busting query strings. Astro/Vite handles fingerprinting at build, so all `window.ASSET(x)` calls become plain `/x` strings.
- **Speaker notes / `__edit_mode_*` postMessage protocol removed** — those were artifacts of the design-tool runtime, not production needs.

## What's left ⏳

The bulk of the page content has not yet been ported. I read every JSX source file to understand the full scope, then ran out of working context before I could finish writing them out. The mechanical port pattern is well-established by the chrome work; here's exactly what's left.

### Files to port from parent → astro

| Parent file | Lines | Target |
|---|---|---|
| `pages.jsx` | 866 | `src/components/sections/Hero.tsx`, plus `src/pages/index.astro`, `src/pages/services.astro`, `src/pages/our-approach/boardreach.astro`, `src/pages/about.astro`, `src/pages/contact.astro` |
| `pages-extra.jsx` | 1238 | One `.astro` per page in `src/pages/` (15 routes) |
| `pages-testimonials.jsx` | (large) | `src/pages/about/testimonials.astro` |
| `rise-case-study.jsx` | (large) | `src/pages/results/rise-amg.astro` (RiseDeepCaseStudy) + an inline component for MicroHoaCaseStudy |
| `modules.jsx` | 1099 | Split into `src/components/modules/`: `SystemDiagram.tsx`, `AuditQuiz.tsx`, `MarketChecker.tsx`, `ROICalculator.tsx`, `RiseCaseStudy.tsx` (+ helpers `RiseGrowthChart`, `RiseStatCompact`, `RangeInput`, `ResultCell`), `MicroHoaInquiryChart.tsx`, `ResourceHub.tsx` |
| `pillar-marks.jsx` | 258 | `src/components/PillarMark.tsx` (pure SVG, can be `.astro`) + `PillarIcon` + `ServiceMark` |
| `system-tabs-anim.jsx` | 119 | Already partially ported as `src/components/EngineLoop.tsx` (review for parity) |
| `components.jsx` | 214 | Most ported (Icon, Button, Eyebrow, Tag, AccentBar, AnimatedNumber). The original `Header`/`Footer` in this file are **legacy stubs** — use the new chrome instead. |

### Mechanical port recipe (per file)

1. Copy the JSX file into `src/components/...` or `src/pages/...` with `.tsx` extension.
2. Add at the top:
   ```ts
   import { useState, useEffect, useRef, useMemo } from 'react';
   import Icon from '~/components/Icon';
   import Button from '~/components/Button';   // (port from components.jsx if not yet)
   import Eyebrow from '~/components/Eyebrow';
   import Tag from '~/components/Tag';
   import AccentBar from '~/components/AccentBar';
   import EngineLoop from '~/components/EngineLoop';
   import AnimatedNumber from '~/components/AnimatedNumber';
   import { PURPLE, PINK, YELLOW, BLUE, GREEN } from '~/lib/tokens';
   ```
3. Replace `React.useState` → `useState`, `React.useEffect` → `useEffect`, `React.useRef` → `useRef`, `React.useMemo` → `useMemo`.
4. Replace `window.ASSET("assets/foo.jpg")` → `"/assets/foo.jpg"` (delete the conditional).
5. Replace `getTweak("x", default)` → just `default` (pages no longer read tweaks).
6. Delete the trailing `Object.assign(window, { ... })` line.
7. Add `export default ComponentName;` at the bottom (or named exports for sub-components).
8. Add proper TypeScript prop types for each component (parent JSX was untyped).

### `src/pages/*.astro` per route

Each route gets a tiny `.astro` wrapper:

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
import HomePage from '~/components/pages/HomePage';
---
<BaseLayout
  title="Alloy — One growth partner. Three engines. Exclusively CAM."
  description="..."
  pageId="home"
>
  <HomePage client:load />
</BaseLayout>
```

Use `client:load` for any page with state (forms, calculators, quizzes). Use `client:visible` for pages that are mostly static + one interactive widget below the fold. Use no directive (server-rendered only) for fully static content pages — but most Alloy pages need at least one client island.

### Routes to create (24 total — from `app.jsx`)

```
/                              → HomePage             (client:load — hero animations + 4 modules)
/about                         → AboutPage            (static)
/about/testimonials            → TestimonialsPage     (client:load — filter UI)
/we-know-cam                   → WeKnowCamPage        (static)
/contact                       → ContactPage          (client:load — form)
/strategic-review-request      → StrategicReviewPage  (client:load — form)
/services                      → ServicesPage         (static)
/hoa-cam-marketing-services    → CamMarketingPage     (static)
/property-management-seo       → SeoPage              (static)
/hoa-board-education-programs  → BoardEdPage          (static)
/groundwork                    → GroundworkPage       (static)
/boardsuite                    → BoardSuitePage       (static)
/our-approach                  → ApproachPage         (static + 3 EngineLoops)
/our-approach/boardreach       → BoardReachPage       (static)
/our-approach/boardmatch       → BoardMatchPage       (static)
/our-approach/boardretain      → BoardRetainPage      (static)
/resource-hub                  → ResourceHubPage      (static)
/resource-hub/ai-search-for-cam → AISearchArticle     (static)
/resource-hub/cam-marketing-strategy → MarketingStrategyArticle (static)
/courses                       → CoursesPage          (static)
/results                       → ResultsPage          (static)
/results/rise-amg              → RiseDeepCaseStudy    (client:visible — chart)
/faq                           → FAQPage              (client:load — accordion)
/terms-conditions              → TermsPage            (static)
/privacy-policy                → PrivacyPage          (static)
/growth-modeled                → GrowthModeledPage    (client:load — ROI calc)
```

## How to run (once page porting is finished)

```bash
cd astro
npm install
npm run dev          # http://localhost:4321
npm run build        # → dist/
npm run preview      # serves dist/
```

For Vercel: `vercel.json` already pins clean URLs. The repo root must point at `astro/`, or move these files up to repo root once you're ready to retire the SPA.

## Why this is the right destination shape

- **One layout, 24 routes, real `<head>` per page.** Every page is statically pre-rendered with its own title, description, canonical URL, OG image, and JSON-LD. Crawlers and AI search engines see real HTML, not a JS-rendered shell. This was the explicit goal of the migration.
- **Islands, not SPA.** The header is one client island, the footer another, plus per-page interactive widgets (forms, ROI calc, quiz, market checker, charts). Everything else ships as zero-JS HTML — major Lighthouse + GEO win.
- **One source of truth for nav.** `src/lib/nav.ts` drives header, mega menu, mobile drawer, and (eventually) footer columns. Adding a route is one file edit instead of three.
- **No more cache-busting hack.** Vite fingerprints assets at build time. `window.ASSET()` is gone.
- **No Babel-in-browser.** All JSX compiles at build, ships as plain JS bundles. ~5–10× faster page loads.
- **Direct path to a CMS.** When you want blog/resource content out of code, swap any of the static pages to `src/content/` collections — no shape changes needed.
