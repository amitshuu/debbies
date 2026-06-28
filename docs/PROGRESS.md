# Debbies — Progress Log

This file tracks what's actually been built, so any new Claude Code session (today, tomorrow, next month) knows exactly where the project stands without the user having to re-explain context.

**Rule: update this file at the end of every task**, right after finishing a feature — add what was built, not what was planned. If a task was only partially completed, say so explicitly rather than marking it done.

---

## Status: Phase 1 — Public Storefront

### Done

- **Homepage — initial build** (Header, Hero, ProductCarousel, Footer): RTL layout, placeholder products, Futurism logo font, Tailwind v4 `@theme` tokens.
- **Font swap — Discovery (two weights) replaces Yael for headlines**: Headlines switched from Yael to Discovery Demibold. Yael `@font-face` and `--font-serif` token retained in `globals.css` but not applied to any element. Discovery Demibold registered as `font-weight: 600` under the same `"Discovery"` family; `--font-display` token added to `@theme` for it. Current font-to-element mapping:
  - **Discovery Demibold** (`font-display font-semibold`, weight 600) — Hero `<h1>`, ProductCarousel `<h2>` ("הקולקציה שלנו"), Footer column headings ("ניווט", "קנייה").
  - **Discovery Light** (`font-sans font-light`, weight 300) — Hero body paragraph, Hero CTA button, Header nav links (desktop + hamburger menu), ProductCarousel product name / price / placeholder label, Footer tagline, Footer nav links, Footer shop links, Footer copyright.
  - **Futurism** (`font-logo`, unchanged) — DEBBIES wordmark SVG in Header (both desktop and mobile overlay) and `<p>DEBBIES</p>` in Footer brand column.
  - **Yael** (`font-serif`) — `@font-face` kept in place, file kept in place, token kept in `@theme`, not applied anywhere currently.
- **Size bumps (subtle)**: Three element types increased; nothing else touched.
  - Hero `<h1>`: mobile 36px → 40px, desktop 56px → 60px
  - ProductCarousel `<h2>`: mobile 28px → 30px, desktop 36px → 40px
  - Header nav links (desktop + hamburger): 13px → 15px

### In Progress

_(nothing yet)_

### Not Started

- Shop / product listing page
- Single ready-made product page
- Custom clutch configurator page
- Cart (Zustand store + UI)
- Checkout & payments (Phase 2)
- Admin panel (Phase 3)

---

## Known Placeholders To Replace Later

_(running list — add an entry every time a placeholder is introduced, so nothing gets forgotten)_

- `public/logo.svg` — basic "D E B" wordmark, will likely be replaced with a final designed logo from Figma/Canva.

---

## Decisions Made Along The Way

_(log any judgment call made when docs were ambiguous, so it doesn't get silently re-decided differently next time)_
