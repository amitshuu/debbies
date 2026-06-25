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

Two typefaces only, mirroring the reference: an editorial serif for headlines, a spaced-out sans for everything functional.

```
Headline font: "Cormorant Garamond" (Google Fonts) — serif, used at large sizes (32px+)
Body / UI font: "Inter" (Google Fonts) — sans, used for nav, buttons, body copy, labels
```

### The mixed-case headline effect

The reference's signature move: within one headline, some letters are upright serif and some are italic serif, applied irregularly (not every-other-letter — looks intentional, almost hand-set). This is achieved by wrapping individual letters in `<span>` with `italic` applied to specific ones.

This is a deliberate per-instance design decision, not a reusable utility class — apply it directly when building a specific headline (e.g. the homepage Hero "LUXURY & PRECISION" treatment), not as a global rule for every heading on the site. Most headlines elsewhere on the site can be plain upright `Cormorant Garamond` — reserve the mixed italic treatment for 1-2 hero-level moments per page, or it stops feeling special.

### Scale

```
h1 (hero)       : 56px / mobile 36px,  Cormorant Garamond, regular weight, line-height 1.1
h2 (section)     : 36px / mobile 28px,  Cormorant Garamond, regular weight, line-height 1.2
h3 (card title)  : 22px,                Cormorant Garamond, regular weight
nav / labels      : 13px,                Inter, weight 500, letter-spacing 0.12em, uppercase
body              : 16px,                Inter, weight 400, line-height 1.7
small / caption   : 13px,                Inter, weight 400, color ink-soft
button text       : 13px,                Inter, weight 500, letter-spacing 0.08em, uppercase
```

Letter-spacing on uppercase nav/button text is essential to the look — don't skip it. Tailwind: `tracking-wider` or a custom `tracking-[0.12em]`.

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
- Product image first, name in body/Inter weight 500, price below in `leather` or `ink`.
- Hover: subtle, e.g. image slightly scales (`scale-105`) or a second product image crossfades in — nothing bouncy or playful, this is a quiet, confident hover.

## Imagery Style

- Black & white or desaturated/muted product and lifestyle photography is the reference's dominant mode, with the actual product (leather bags) supplying the only saturated color on the page.
- Once real photography from the seamstress is available, this principle should guide editing: keep backgrounds and lifestyle shots neutral/desaturated so the product itself remains the visual focus.

## What To Avoid

- No bright/saturated "warm color" palettes (oranges, golds, terracotta as backgrounds) — that was the original brief but has been superseded by this monochrome+leather direction.
- No drop shadows, no gradients, no rounded "bubbly" buttons.
- No more than one accent color (`leather`) anywhere in the UI.
- No filled nav bars with logos crammed against links — preserve the breathing room from the reference.
