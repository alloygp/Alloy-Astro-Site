# Trust Building Course — Deployment

## What's in this zip

Five files that add the "Building Trust as a CAM" course to your live site:

### New pages
- `src/pages/courses/trust-building.astro` — Course cover page (lives at /courses/trust-building)
- `src/pages/courses/trust-building/lesson.astro` — Sample lesson view (lives at /courses/trust-building/lesson)
- `src/pages/courses/trust-building/quiz.astro` — Knowledge check / quiz (lives at /courses/trust-building/quiz)

### Updated pages
- `src/components/pages/CoursesPage.tsx` — Adds "Building Trust" as the featured tile (first position) on /courses, marks the others "Coming soon"
- `src/components/pages/ResourceHubPage.tsx` — Replaces the "Outsmarting AI Search" micro-course tile in the featured row with "Building Trust as a CAM"

## How to apply

1. Unzip
2. Inside, you'll see a `src/` folder mirroring your repo structure
3. Drag `src/` into your local Alloy-Astro-Site folder — Finder will ask to merge or replace; choose **Merge** (or Replace if Merge isn't offered)
4. Commit & push via GitHub Desktop

## URLs after deploy

- Course cover: https://alloygp.co/courses/trust-building
- Sample lesson: https://alloygp.co/courses/trust-building/lesson
- Quiz: https://alloygp.co/courses/trust-building/quiz
- Tile entry points:
  - /courses (top-left tile, featured)
  - /resource-hub (third featured tile)

## Known limits / things to know

- The lesson page is a single sample lesson, not all 6 lessons. Same for the quiz — one knowledge check.
- The course's own internal navigation (sidebar, progress bar) lives below the site's main header. Two stacked navs is intentional and standard for course UIs (Coursera, Maven do the same).
- The other course tiles on /courses now show "Coming soon" since they don't have real pages yet. Pull request me if you want the AI Search course built next.
