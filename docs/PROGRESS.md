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
- **Clutch lining picker + label overlay** (`ClutchConfigurator` section, placed below Hero on homepage): Rendering technique changed from canvas grayscale+multiply-blend to layered image-swap. Reason: canvas blend-mode can only handle hex colors; real fabric patterns (zebra, floral, denim, etc.) need a full image, so the approach changed to pre-composited PNGs. Each lining option is now a 1010×1024 PNG with the lining-shaped area filled with the fabric pattern/color, transparent outside — just drawn on top of the base photo at (0,0), no offset math needed. Implementation is three `<Image fill>` layers inside a `relative w-full aspect-[1010/1024]` container: base photo → lining PNG → label. No canvas, no pixel math, no refs/effects — just `useState` for the selected option. Hebrew label "צבע בטנה", RTL select. Body color picking still deferred. `lining-mask.png` retained in `public/` for reference/future mask generation but no longer used for rendering.
  - **Label overlay constants — unchanged, browser-calibrated**: `LABEL_CENTER_X=0.45`, `LABEL_CENTER_Y=0.36`, `LABEL_WIDTH=0.11`, `LABEL_HEIGHT=0.06`, `LABEL_ROTATION=-0.15` rad (≈−8.6°). Expressed as fractions of 1010×1024. Do not recalculate from the Python bbox derivation — these final values supersede it.
  - **Lining options with real PNG assets**: `זברה` (`lining-zebra.png`) ✓, `אריות` (`lining-lion.png`) ✓. All other options (שנהב, ורוד אבק, כחול נייבי, יין, ירוק יער, שחור) have `imageUrl: null` — they appear disabled in the dropdown with "(בקרוב)" until their PNGs are generated. Adding a new lining is a file drop + one array entry, no code changes.
  - **Lion print lining added** (`lining-lion.png`, 1024×1038, RGBA confirmed): Delivered pre-converted with genuine alpha transparency. `swatchColor: "#7E7760"` computed from average of opaque pixels.

### In Progress

_(nothing yet)_

### Not Started

- Shop / product listing page
- Single ready-made product page
- Custom clutch configurator page (full page; the lining picker section is done on homepage)
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

- **ClutchConfigurator canvas placement**: Canvas column is DOM-first so it appears on the right (start side) in RTL — product preview is the primary visual, so right-side placement felt more prominent. Controls appear on the left (end side). Mirrors the Hero's image-right / text-left RTL layout.
- **Lining rendering switched from canvas blend to image-swap** (session 3): The canvas grayscale+multiply-blend approach was replaced with pre-composited lining PNGs layered via absolutely-positioned `<Image>` elements. Canvas-era decisions (mask blur, pixel cache, selectedColorRef) no longer apply and have been removed.
