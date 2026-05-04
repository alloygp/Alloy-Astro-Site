# Trust Building Course — Style + Quiz Fixes (v5)

## What's fixed

1. **Cover/lesson/quiz pages now use the purple SiteHeader** — added `headerTheme="purple"` to all three .astro files.
2. **"FREE · AVAILABLE NOW" pill on /courses** — switched from purple text to white text on the pink background. No more purple-on-pink.
3. **Quiz interactivity** — replaced the radio-input/label pattern with plain divs + onClick handlers. Selecting an answer now reliably updates the bullet, and Submit grades the quiz.

## Files in this drop (6)
```
src/components/pages/CourseTrustBuildingQuizPage.tsx   (quiz interaction fix)
src/components/pages/CoursesPage.tsx                   (pill color fix)
src/pages/courses/trust-building.astro                 (purple header)
src/pages/courses/trust-building-lesson.astro          (purple header)
src/pages/courses/trust-building-quiz.astro            (purple header)
src/styles/courses.css                                 (option-bullet CSS)
```

## How to apply
Drag `src/` into your local repo → **Merge** (do NOT replace). Push.
