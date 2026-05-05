# Alloy GP — Design Brief for Claude Design

Paste this at the start of any Claude Design session before building a page.

---

## Workflow rules — read first

**Your job is to draft new page components only.** Claude Cowork handles all merges into the real Astro codebase.

- ✅ Create new page files (e.g. `page-newsletter-production.jsx`)
- ✅ Use the components and tokens listed below by name/reference
- ❌ Never modify these shared files — they are maintained separately and your version will be out of date:
  - `SiteHeader.tsx` / `SiteFooter.tsx`
  - `BaseLayout.astro`
  - `Shells.tsx` (PageHero, CtaBand, PillarCard, ServiceList)
  - `Button.tsx`, `Icon.tsx`, `Tag.tsx`, `Eyebrow.tsx`, `AccentBar.tsx`, `PillarMark.tsx`, `EngineLoop.tsx`, `AnimatedNumber.tsx`
  - Any CSS file (`site.css`, `colors_and_type.css`, `chrome.css`, `courses.css`)
  - `tokens.ts`, `nav.ts`

If a page needs something a shared component doesn't support, implement it inline in the page file and add a comment: `// TODO: extract to shared component`.

---

## Colors

| Name | Hex | Use |
|---|---|---|
| Purple | `#381c4f` | Backgrounds, headers, authority |
| Purple Deep | `#290d41` | Footers, darkest surfaces |
| Pink | `#d9356e` | CTAs, energy, primary accent |
| Yellow | `#f5d880` | Stats, highlights, secondary energy |
| Blue | `#a1c8e7` | Trust, calm, info |
| Green | `#aed7d0` | Growth, retention, success |
| Off-white | `#f8f7fc` | Page backgrounds |
| Body gray | `#555555` | Body copy |
| Border subtle | `#e8e4ef` | Borders, dividers |

**Tints:** Pink tint `#fbe2eb` · Yellow tint `#fbf2d6` · Blue tint `#dcecf7` · Green tint `#def0ec` · Purple tint `#ece8f1`

---

## Typography

**Fonts:** Gotham (primary), Poppins (fallback), JetBrains Mono (monospace)

| Scale | Size | Weight | Use |
|---|---|---|---|
| display-xl | ~52px | 800 | Hero h1 |
| display-lg | ~42px | 800 | Section h2 |
| display-md | ~32px | 700 | Subsection h2 |
| body | 16px | 400–500 | Body copy |
| small | 14px | 400 | Secondary text |
| caption/eyebrow | 13px | 700 | Kicker labels (uppercase) |

Line heights: tight 1.1 (headlines) · normal 1.5 (body) · relaxed 1.65 (expanded)

---

## Pillar System — ALWAYS follow this color mapping

| Pillar | Stage | Color | Hex |
|---|---|---|---|
| BoardReach™ | Attract | Pink | `#d9356e` |
| BoardMatch™ | Convert | Yellow | `#f5d880` |
| BoardRetain™ | Keep | Green | `#aed7d0` |

Every service and feature maps to one pillar. Use that pillar's color for accents, tags, and top borders.

---

## Components to use

These exist in the codebase — reference them by name, don't reinvent them:

- **Button** — variants: `primary` (pink), `secondary` (purple outline), `ghost` (text), `dark` (purple fill). Add `arrow` prop for → suffix.
- **Eyebrow** — small uppercase kicker above headlines, with optional pink accent line. Use `onDark` on dark backgrounds (renders yellow).
- **Tag** — pill label. Colors: `pink`, `yellow`, `blue`, `green`, `purple`.
- **Icon** — stroke icon. Available: target, compass, handshake, shield, trending, check, mail, send, layers, bar-chart, calendar, lock, users, sparkles, globe, archive, layout, pencil, feather, edit, plus, search, book, zap, puzzle, repeat, file-sig, arrow-right, arrow-down, map-pin, clock, binoculars, circle-dot, play, phone, workflow, x, menu
- **AccentBar** — 5-color stripe (pink/yellow/blue/green/purple). Always at bottom of hero sections.
- **PageHero** — standard hero shell. Pass `bg="#381c4f"` or `bg="#0d2d45"` for dark service heroes.
- **CtaBand** — always the last section on every page. Dark purple gradient, centered CTA.
- **ServiceList** — 3-column grid of feature tiles. 9 items = perfect 3×3.
- **PillarCard** — pillar product card with top color border, checklist items.

---

## Page sections — standard order

1. Hero (dark bg — purple `#381c4f` or blue-deep `#0d2d45`)
2. Audience / framing copy
3. Stats band (4 stats, colored top borders)
4. Visual section (calendar, diagram, mockup, chart)
5. What's included (ServiceList, 9 items)
6. Before/After comparison table
7. Process steps (dark section, 4 steps)
8. How it fits BoardSuite
9. FAQ accordion
10. CtaBand (always last)

---

## Layout

- Max content width: **1240px** (`.container`)
- Narrow content: **960px** (`.container-narrow`)
- Section padding: **96px** vertical (standard), **64px** (tight)
- Card padding: **32px**
- Primary mobile breakpoint: **720px**

---

## Brand vocabulary

- **"boards"** not "clients" or "customers"
- **"associations"** or **"communities"** not "properties"
- **"CAM companies"** or **"management firms"** not "property management companies"
- **"portfolio"** — the set of associations a CAM firm manages
- **"managers"** — staff at the CAM company

---

## Rules

- Alloy brand colors only — no grays, blues, or off-brand palettes
- No dual CTAs in a single section
- Every page ends with CtaBand
- Service pages use pillar color (Pink/Yellow/Green) as the accent throughout
- Dark hero backgrounds only: purple `#381c4f` or blue-deep `#0d2d45`
