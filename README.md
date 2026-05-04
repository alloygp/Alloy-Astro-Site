# Trust Building Course — Build Fix v5.1

## What's fixed
The Vercel build failed with:
`Rollup failed to resolve import "~/layouts/BaseLayout.astro"`

The `~` path alias is misbehaving on Vercel for these specific course pages (which sit one level deeper at `src/pages/courses/`). Fix: switch to relative imports (`../../layouts/BaseLayout.astro`).

## Files in this drop (3 — only the imports changed)
```
src/pages/courses/trust-building.astro
src/pages/courses/trust-building-lesson.astro
src/pages/courses/trust-building-quiz.astro
```

## How to apply
Drag `src/` into your local repo → **Merge** → push. Should build clean this time.
