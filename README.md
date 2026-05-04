# Trust Building Course — Deployment (v4 — REFACTORED)

## What changed in v4 — IMPORTANT
The previous attempts (v1-v3) put the entire page content (HTML + CSS + JS) directly into .astro files. **The Astro build was choking on this** because every other page in your site uses a different pattern: a thin .astro wrapper that imports a React component.

v4 follows your existing pattern correctly:
- 3 thin `.astro` wrapper files (12 lines each, just like `our-approach/boardmatch.astro`)
- 3 React component files in `components/pages/` with all the JSX content
- 1 shared CSS file in `styles/courses.css`, imported once in BaseLayout

This **matches the pattern** used by every working page in your codebase.

## Files to apply (8 total)

```
src/
├── components/
│   └── pages/
│       ├── CourseTrustBuildingPage.tsx       (NEW — cover page component)
│       ├── CourseTrustBuildingLessonPage.tsx (NEW — lesson view component)
│       └── CourseTrustBuildingQuizPage.tsx   (NEW — quiz component, with React state)
├── layouts/
│   └── BaseLayout.astro                      (MODIFIED — adds 1 line to import courses.css)
├── pages/
│   └── courses/
│       ├── trust-building.astro              (REPLACED — now 12 lines)
│       ├── trust-building-lesson.astro       (REPLACED — now 12 lines)
│       └── trust-building-quiz.astro         (REPLACED — now 12 lines)
└── styles/
    └── courses.css                           (NEW — all course styles, scoped under .course-page)
```

## How to apply

1. Unzip
2. **Optional cleanup** — delete the old `src/pages/courses/trust-building/` directory if it still exists from a previous attempt (the directory, not the file `trust-building.astro`)
3. Drag `src/` into your Alloy-Astro-Site folder → Merge (or Replace if Merge isn't offered)
4. Push via GitHub Desktop

## URLs (unchanged from v3)
- `/courses/trust-building` — cover
- `/courses/trust-building-lesson` — lesson view
- `/courses/trust-building-quiz` — quiz

## Why this should finally build
Look at any working page like `src/pages/our-approach/boardmatch.astro` — it's 12 lines. All the content is in `src/components/pages/BoardMatchPage.tsx`. v4 follows that exact pattern.
