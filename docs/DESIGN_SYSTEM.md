# Debbies — Design System

## Reference

Visual direction is based on the "Epidermis" leather brand landing page (Dribbble, by Kavya Bhatnagar). Monochrome palette with leather-brown as the only accent color — elegant, editorial, not "warm colors" in the literal sense. Lots of white space, asymmetric image layouts, mixed serif/italic headline typography.

## Colors

All colors defined as CSS variables in `tailwind.config.ts` under `theme.extend.colors`. Never hardcode hex values in components — always reference these tokens by name.

```
cream        #FAF8F5   — page background, default surface
ink          #1A1A1A   — primary text, default on light backgrounds
ink-soft     #4A4A4A   — secondary text, muted body copy
leather      #5C3A21   — primary accent: links, active states, key CTAs, borders on hover
leather-dark #3A2A1C   — darker accent: headline highlights, hover states on leather elements
espresso     #3A322E   — footer background, dark sections
espresso-soft #6B5F58  — muted text on dark backgrounds (footer secondary text)
white        #FFFFFF   — card backgrounds, contrast surfaces
border       #E5E0D8   — hairline borders, dividers (warm-toned, not cold gray)
```

Usage rules:
- Default page background is `cream`, not pure white — gives the warmth without using "warm colors."
- `leather` is the only accent color in the entire site. No secondary accent, no blue links, no green success states dressed up — if a status color is unavoidable (e.g. a future order-status badge), use `leather` for positive/active and `ink-soft` for neutral/inactive rather than introducing red/green.
- Photography supplies the color richness (leather texture, skin tones, wood). UI chrome stays neutral so photos pop.

## Typography

**Superseded from the original brief below**: this section originally specified Cormorant Garamond + Inter (Latin-only fonts). The site is Hebrew-only (see `RTL_AND_LOCALIZATION.md`), and the type system actually in use is Discovery (two weights) + Futurism for the logo. This section reflects what's actually built — treat it as current, not the Cormorant/Inter text that used to be here.

Three font roles:

```
Logo font:      "Futurism" (HaFontia, local files in public/fonts/) — DEBBIES wordmark only, Latin, dir="ltr"
Headline font:  "Discovery" Demibold (weight 600) — h1/h2/h3-level text, eyebrows excluded
Body / UI font: "Discovery" Light (weight 300) — body, nav, buttons, captions, eyebrows
```

Both Discovery weights are registered under one `font-family: "Discovery"` in `globals.css`, selected via `font-weight` (`font-semibold` → 600 Demibold, `font-light` → 300 Light). Tailwind tokens: `font-display` (headline role) and `font-sans` (body/UI role) both resolve to `"Discovery"` — the weight utility is what actually switches the visual face.

No mixed italic/upright headline treatment — Hebrew has no italic typesetting tradition, so headlines are always plain upright Discovery Demibold (see `RTL_AND_LOCALIZATION.md` §5).

### The eyebrow role

A small label (13px, Discovery Light, `ink-soft`) placed above a headline to add editorial weight without a new typeface or letter-spacing tricks — e.g. "עשוי ביד · תפירה בעבודת יד" above the Hero h1, "התאמה אישית" above the clutch configurator h2. Reserve for section-opening headlines, not every heading.

### Scale

```
h1 (hero)       : 46px mobile / 64px tablet (md) / 88px desktop (lg), Discovery Demibold (600), line-height 1.05
h2 (section)     : 30px mobile / 40px desktop,                        Discovery Demibold (600), line-height 1.2
h3 (card title)  : 22px,                                               Discovery Demibold (600)
eyebrow           : 13px,                                               Discovery Light (300), color ink-soft
nav / labels      : 15px,                                               Discovery Light (300), no letter-spacing (Hebrew — see RTL doc §5)
body              : 16px,                                               Discovery Light (300), line-height 1.7
small / caption   : 12–13px,                                            Discovery Light (300), color ink-soft
button text       : 13px,                                               Discovery Light (300), uppercase (Latin CTAs only)
```

Do not apply `tracking-wider` / wide letter-spacing to Hebrew text — it breaks Hebrew readability (see `RTL_AND_LOCALIZATION.md` §5). Reserve wide tracking for any future Latin-only UI text, if it ever appears.

## Spacing & Layout

- Generous whitespace between sections: minimum `py-24` (96px) on desktop section padding, `py-12` (48px) on mobile.
- Asymmetric image compositions are a core part of the aesthetic: a smaller image overlapping or offset against a larger one (see reference Image 2 and Image 4). Don't default to a uniform grid for every product/collection showcase — vary it.
- Max content width: `1440px`, centered, with `px-6` mobile / `px-12` desktop side padding.

## Buttons

Primary style is outline, not filled — matches the reference's understated luxury feel:
```
border: 1px solid ink (or leather on hover)
background: transparent
text: uppercase, 13px, Inter 500, tracking-wide
padding: 12px 28px
arrow icon (→) after text on primary CTAs, e.g. "EXPLORE →"
hover: background fades to ink or leather, text turns cream
```
Reserve a filled/solid button style only for the final checkout/purchase action — that's the one place a stronger visual weight is justified.

## Header

- Logo centered or left-aligned (placeholder logo currently centered per `public/logo.svg`).
- Nav links: uppercase, spaced, Inter — `ABOUT`, `SHOP`, `CONTACT` style spacing.
- Cart + account icons on the right, simple line icons, no filled backgrounds.
- Background: `cream` or `white`, no shadow — separation comes from whitespace, not a drop shadow.

## Footer

- Background: `espresso` (dark), text in `cream` / `espresso-soft`.
- Rounded top corners on the footer container (matches reference's soft rounded-rect footer block) — `rounded-t-2xl` or similar, applied to the footer section only.
- Three-column layout on desktop (brand+social, navigation, shop links), stacked on mobile.

## Product Cards

- No heavy borders or shadows — separation via whitespace and a hairline `border` color only.
- Product image first, name in body/Discovery Light, price below in `leather` or `ink`.
- Hover: subtle, e.g. image slightly scales (`scale-105`) or a second product image crossfades in — nothing bouncy or playful, this is a quiet, confident hover.

## Imagery Style

- Black & white or desaturated/muted product and lifestyle photography is the reference's dominant mode, with the actual product (leather bags) supplying the only saturated color on the page.
- Once real photography from the seamstress is available, this principle should guide editing: keep backgrounds and lifestyle shots neutral/desaturated so the product itself remains the visual focus.

## Signature Element — The Stitch

A recurring hand-stitch motif (`components/ui/StitchLine.tsx`): an irregular dashed, gently undulating SVG line — deliberately not a perfect CSS `dashed` border, which reads as generic/machine-made rather than hand-stitched.

Two uses only, kept strictly separate:
- **Animated, once, hero-only**: `<StitchLine animated />` under the Hero eyebrow, in `leather`. Draws itself in on load (`stroke`/`clip-path` reveal, right-to-left to match Hebrew reading direction) via the `stitch-line-animated` class in `globals.css`. Respects `prefers-reduced-motion` (shows fully, no animation). This is the one bold/animated moment on the page — do not add the animated variant anywhere else, or it stops being special.
- **Static, quiet, reused as a divider**: plain `<StitchLine />` in `border` color, replacing plain hairline `border-t`/`border-b` section dividers (currently: above `ProductCarousel`'s scroll strip, above `ClutchConfigurator`). No animation, no leather — it's texture, not an accent.

## What To Avoid

- No bright/saturated "warm color" palettes (oranges, golds, terracotta as backgrounds) — that was the original brief but has been superseded by this monochrome+leather direction.
- No drop shadows, no gradients, no rounded "bubbly" buttons.
- No more than one accent color (`leather`) anywhere in the UI.
- No filled nav bars with logos crammed against links — preserve the breathing room from the reference.
