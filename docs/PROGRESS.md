# Debbies — Progress Log

This file tracks what's actually been built, so any new Claude Code session (today, tomorrow, next month) knows exactly where the project stands without the user having to re-explain context.

**Rule: update this file at the end of every task**, right after finishing a feature — add what was built, not what was planned. If a task was only partially completed, say so explicitly rather than marking it done.

---

## Status: Phase 1 — Public Storefront

### Done
- **Header** (`src/components/layout/Header.tsx`) — Logo centered, SHOP/ABOUT left, CONTACT + cart/account icons right; hamburger collapses to full-screen slide-in overlay on mobile. `"use client"` for menu state.
- **Hero** (`src/components/storefront/Hero.tsx`) — Two-column desktop / stacked mobile layout; mixed serif/italic headline "CRAFTED & PERSONAL"; placeholder paragraph; outline CTA "EXPLORE →". Server Component. _(Revised: section is now `min-h-[90vh]` full-viewport, main image from Unsplash via `<Image>`, badge image overlapping bottom-right of main image on desktop only, badge hidden on mobile.)_
- **Featured products carousel** (`src/components/storefront/ProductCarousel.tsx`) — Native scroll-snap horizontal carousel; 6 placeholder cards (name + ₪ price + `bg-border` image block); desktop arrow buttons that scroll 75% of container width; single-card swipe on mobile. `"use client"` for scroll ref.
- **Footer** (`src/components/layout/Footer.tsx`) — `bg-espresso rounded-t-2xl`; three columns (brand + social, Navigate, Shop); inline SVG icons for Instagram, Facebook, WhatsApp; dynamic copyright year. Server Component.

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

- `public/logo-transparent.svg` — basic "D E B" wordmark SVG; will likely be replaced with a final designed logo.
- **Hero headline** — "CRAFTED & PERSONAL" with a specific mixed-italic letter pattern (R, F, E, O italicised); swap copy and re-apply italic pattern to final words.
- **Hero paragraph** — "Every bag tells your story. Handmade with care, each piece is crafted to be as unique as the person carrying it." — placeholder brand copy.
- **Hero main image** — currently `https://images.unsplash.com/photo-1523297467724-f6758d7124c5?fm=jpg&q=80&w=1200` (Unsplash license, free to use temporarily); replace with Debbie's real product lifestyle photo.
- **Hero badge image** — currently `https://images.unsplash.com/photo-1591561954555-607968c989ab?fm=jpg&q=80&w=400` (Unsplash license); replace with Debbie's real close-up product shot. Badge is desktop-only, overlapping bottom-right corner of the main image.
- **Hero CTA href** — `href="#"` on the "EXPLORE →" button; link to `/shop` once that route exists.
- **ProductCarousel data** — 6 hardcoded `PLACEHOLDER_PRODUCTS` objects (`Placeholder Bag 1–6`, fake ₪ prices); replace with a real DB query via Prisma. Note: DB stores prices in agorot — divide by 100 before displaying as ₪.
- **ProductCarousel images** — six `bg-border` placeholder blocks; replace with real product photos from Supabase Storage.
- **Footer tagline** — "Handmade bags, made just for you." — placeholder copy.
- **Footer social links** — all three social `href="#"` anchors (Instagram, Facebook, WhatsApp); replace with real URLs.
- **Footer WhatsApp icon** — speech-bubble SVG stand-in; replace with the official WhatsApp brand SVG when social links are wired up.
- **All nav hrefs** — SHOP, ABOUT, CONTACT, footer navigation, footer shop links are all `href="#"`; wire to real routes as pages are built.
- **Header cart/account icons** — `href="#"` placeholders; cart links to the cart page (Phase 1), account to auth (Phase 2).

---

## Decisions Made Along The Way

_(log any judgment call made when docs were ambiguous, so it doesn't get silently re-decided differently next time)_

- **Logo filename**: The homepage prompt referenced `public/logo.svg`, but the actual file on disk is `public/logo-transparent.svg`. Used the real file; the non-existent `logo.svg` name in the prompt was treated as a typo.
- **Tailwind config location**: DESIGN_SYSTEM.md says tokens go in `tailwind.config.ts`, but the project uses Tailwind v4, which uses `@theme` in `globals.css` instead of a JS config file. No `tailwind.config.ts` was created; all color and font tokens live in `globals.css`.
- **Social icons**: lucide-react v1.21.0 (the installed version) does not export `Instagram` or `Facebook`. Used hand-written inline SVG paths for all three social icons in the Footer rather than installing a separate brand-icon library. The WhatsApp icon is a speech-bubble shape, not the official WhatsApp logo.
- **Header as single `"use client"` component**: ARCHITECTURE.md mentions `layout/MobileNav` as a separate component. For Phase 1, the hamburger state was kept inside `Header.tsx` directly rather than splitting it out. Split into `Header` (Server) + `MobileNav` (Client) if the header grows more complex.
- **Carousel scroll amount**: Design system doesn't specify how much to scroll per arrow click. Used 75% of the container's live `offsetWidth` so it adapts across all breakpoints instead of a hardcoded pixel value.
- **Footer copyright year**: Prompt said "© Debbies 2026. All rights reserved." — used `new Date().getFullYear()` instead so it stays correct after 2026 without a manual edit. The prompt explicitly said to adjust if using dynamic date.
- **`(storefront)` route group**: ARCHITECTURE.md shows the homepage at `src/app/(storefront)/page.tsx` inside a route group. The build currently has it at `src/app/page.tsx` (matching the existing scaffold). Move to the route group when adding other storefront routes if a shared storefront layout is needed.
- **Hero viewport height**: Prompt said roughly `min-h-screen` or `min-h-[90vh]`. Used `min-h-[90vh]` — full `min-h-screen` would push the fold past the header on most viewports, making the hero feel disconnected from the nav. 90vh gives the dominant viewport presence while keeping the page feeling intentionally composed.
- **Hero badge position**: Badge image is `absolute bottom-[10%] right-0 w-[36%]` inside a `relative` outer div where the main image is `md:w-[86%]`. The 14% gap on the right of the main image creates the space for the badge to overlap — badge left edge lands at 64% of column width, main image right edge at 86%, giving ~22% horizontal overlap. Tweak these percentages if the overlap feels too much/little once real photography is in.
- **Logo SVG tightened**: Changed from `letter-spacing="28"` with text `"D E B"` (explicit spaces + wide tracking = excessively loose) to `"DEB"` with `letter-spacing="12"` (≈ 0.25em). The old spacing was roughly double the EPIDERMIS reference's proportional tracking. SVG viewBox unchanged (680×120), so `<Image width={198} height={35}>` still renders correctly.
