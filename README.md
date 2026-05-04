# Trust Building Course — Deployment (v4.1 — BUILD FIX)

## What changed in v4.1
The Vercel build failed with:
`Rollup failed to resolve import "~/styles/site.css" from "BaseLayout.astro"`

The `~/` path alias is set in tsconfig but Vite/Rollup wasn't resolving it during the production build for CSS imports. Fix: switch BaseLayout's CSS and component imports to **relative paths** (`../styles/site.css` instead of `~/styles/site.css`). Same files, same behavior, just resolves cleanly through Rollup.

This is the **only** change vs v4 — one file: `src/layouts/BaseLayout.astro`.

## How to apply
Same as before — drag `src/` into your repo and merge. Then push.

## All 8 files (unchanged from v4 except BaseLayout)
```
src/
├── components/pages/
│   ├── CourseTrustBuildingPage.tsx
│   ├── CourseTrustBuildingLessonPage.tsx
│   └── CourseTrustBuildingQuizPage.tsx
├── layouts/
│   └── BaseLayout.astro                  ← FIXED in v4.1 (relative imports)
├── pages/courses/
│   ├── trust-building.astro
│   ├── trust-building-lesson.astro
│   └── trust-building-quiz.astro
└── styles/
    └── courses.css
```
