# Alloy Growth Partners — Astro Site

Astro rewrite of the Alloy marketing site. **In progress.** See `MIGRATION_NOTES.md` for status, what's done, and what's left.

## Quick start

```bash
npm install
npm run dev
```

## Structure

```
astro/
├── public/                  # static — assets, fonts, robots.txt, sitemap.xml
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro # single shell for every page
│   ├── components/
│   │   ├── chrome/          # SiteHeader, SiteFooter
│   │   ├── modules/         # SystemDiagram, AuditQuiz, ROICalculator, etc. (TODO)
│   │   ├── pages/           # HomePage, ServicesPage, etc. (TODO)
│   │   ├── Icon.tsx
│   │   ├── AccentBar.tsx
│   │   └── EngineLoop.tsx
│   ├── lib/
│   │   ├── tokens.ts        # brand color constants
│   │   └── nav.ts           # site-wide navigation config
│   ├── pages/               # one .astro file per route (TODO)
│   └── styles/              # global CSS (verbatim from parent)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vercel.json
```

## Key decisions

- **Tweaks panel removed.** Default config baked in (`refined` hero, `split` layout, `deep` purple background, `editorial` density).
- **No `window.ASSET` cache-buster.** Astro/Vite handle fingerprinting.
- **Strict TS** via `astro/tsconfigs/strictest`.
- **Static output** — every route pre-rendered to HTML at build.
- **React islands** for interactive bits only (forms, calculators, accordions).
