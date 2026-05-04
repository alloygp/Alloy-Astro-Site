# Trust Building Course — Deployment (v3)

Five files. URLs are now flat (no nested folder):
- /courses/trust-building (cover)
- /courses/trust-building-lesson
- /courses/trust-building-quiz

## Apply
1. Unzip
2. Drag `src/` into your Alloy-Astro-Site folder → Merge
3. **DELETE the old nested folder** if it exists from previous attempts:
   `src/pages/courses/trust-building/` (the directory, not the file)
4. Push via GitHub Desktop

## What changed in v3
- Switched from nested folder (`courses/trust-building/lesson.astro`) to flat (`courses/trust-building-lesson.astro`)
- This matches the structure used everywhere else on the site that builds successfully
- All internal links updated to the new flat URLs
