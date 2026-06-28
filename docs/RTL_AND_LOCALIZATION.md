# Debbies — RTL & Localization

## Decision

The site is Hebrew-only, RTL (right-to-left), for now. Current customers are Israeli only — no i18n/multi-language system is needed yet. Don't build a translation framework (next-intl, etc) for a single language; that's premature abstraction per ARCHITECTURE.md's "no unnecessary abstraction" rule. If/when a second language is needed later, that's a deliberate future task, not something to scaffold preemptively.

## What Stays in English

- The brand name/logo: **DEBBIES**. Keep it as a Latin-script wordmark, left-to-right, even inside an RTL page — this is standard practice (brand names commonly stay in their original script inside RTL layouts, the way "Nike" or "Apple" would in an Arabic or Hebrew site).
- The DEBBIES wordmark uses its own dedicated font, **Futurism** (HaFontia, commercial web license already purchased), loaded from local files at `public/fonts/Futurism-Light.woff2` / `.woff` and `Futurism-Bold.woff2` / `.woff` via `@font-face` in `globals.css`, applied only to the logo element.
- **Note: Futurism does in fact have full Hebrew glyph support** (it's an Israeli foundry release built for both scripts) — it isn't excluded from Hebrew text for a technical reason. It's kept logo-only here as a deliberate brand decision (a distinct mark face, separate from body/heading type), not a limitation. If a future decision is made to use Futurism more broadly across Hebrew headlines too, that's a valid option to revisit — it would just need its own additional weights/sizes considered.
- Any future SKU codes or internal IDs, if relevant — not user-facing text, so not a concern.

## What Changes to Hebrew + RTL

Everything else: navigation, buttons, headlines, body copy, form labels, footer, all placeholder content.

## Implementation Rules

### 1. Root HTML direction

In `src/app/layout.tsx`, the `<html>` tag must have `dir="rtl"` and `lang="he"`:
```tsx
<html lang="he" dir="rtl">
```
This is the single most important line — it flips default text alignment, list bullets, and block flow direction for the whole document.

### 2. Tailwind logical properties, not physical ones

Tailwind v4+ (and v3 with the right config) supports logical direction utilities. Use **logical** spacing/positioning classes instead of physical left/right ones, so they automatically flip correctly under `dir="rtl"`:

```
Use:        Instead of:
ms-4        ml-4    (margin-inline-start, not margin-left)
me-4        mr-4    (margin-inline-end, not margin-right)
ps-4        pl-4
pe-4        pr-4
start-0     left-0
end-0       right-0
text-start  text-left
text-end    text-right
```

This matters because "left" and "right" are visually fixed, but "start" and "end" flip automatically with `dir`. A component built with `ml-4` will look wrong (spacing on the wrong side) once the page is RTL; one built with `ms-4` won't.

Exception: anything that should NOT flip regardless of direction — e.g. the DEBBIES logo's internal layout, or a deliberately fixed-direction element — can use physical classes intentionally. Flag this with a one-line "why" comment per ARCHITECTURE.md's comment rule.

### 3. Icons that imply direction must flip

Arrows, chevrons, and "next/back" icons need to point the correct visual direction in RTL:
- "Explore →" in the Hero becomes "← גלו עוד" (or similar) — the arrow visually points left, because in RTL the "forward" reading direction is right-to-left.
- Carousel navigation arrows, breadcrumbs, and any "back" button must be checked individually — don't assume a horizontally-mirrored icon happens automatically. Some icon sets auto-mirror with CSS `transform: scaleX(-1)` under `dir="rtl"`; verify case by case rather than assuming.

### 4. Fonts

Three font roles, kept separate by deliberate brand choice (not technical necessity — see note above about Futurism's actual Hebrew support):

```
Logo font:      "Futurism" (HaFontia, local files in public/fonts/, commercial web license owned) — DEBBIES wordmark only
Headline font:  "David Libre" or "Frank Ruhl Libre" (Google Fonts, serif, Hebrew + Latin)
Body / UI font: "Noto Sans Hebrew" or "Assistant" (Google Fonts, sans, Hebrew + Latin)
```

This replaces the original DESIGN_SYSTEM.md plan of using Cormorant Garamond and Inter everywhere (including the logo) — Futurism is the dedicated brand-mark font, and the Hebrew-supporting Google Fonts handle headlines and body text elsewhere on the site.

### 5. Letter-spacing caution

The DESIGN_SYSTEM.md mixed serif/italic headline treatment and the wide letter-spacing on uppercase nav text were designed around Latin letterforms. Hebrew doesn't have letter case (no uppercase/lowercase distinction) and wide letter-spacing on Hebrew script can look broken or hurt readability — Hebrew letters are designed to sit closer together. When implementing Hebrew headlines and nav text:
- Drop the uppercase-style wide tracking (`tracking-wider`, `tracking-[0.12em]`) for Hebrew text specifically.
- The mixed italic/upright serif headline effect doesn't translate to Hebrew (no italic tradition in Hebrew typesetting in the same sense). For Hebrew headlines, use plain upright serif at the same large size instead — don't force an italic mix.

### 6. Numbers and prices

Hebrew text is RTL, but numbers and currency remain LTR internally (e.g. a price reads "₪150", not reversed). This is standard bidirectional text behavior and usually handled automatically by the browser's Unicode bidi algorithm — but verify prices and quantities render correctly once real content is in place, especially inside flex/grid containers where manual ordering could conflict with bidi text.

## Content Rule

All placeholder and real copy on the site should be written in natural Hebrew — not machine-translated word-for-word from the English placeholders already in the codebase. Where a direct translation would sound awkward, write new Hebrew copy that captures the same intent (e.g. the Hero's "Crafted & Personal" should become a Hebrew phrase that feels natural for a handmade bag brand, not a literal translation).
