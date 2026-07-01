# Clutch Asset Pipeline

This doc covers how lining PNG assets are produced and added to the configurator.

---

## Rendering Overview

The `ClutchConfigurator` component renders three absolutely-positioned `<Image fill>` layers inside a `relative w-full aspect-[1010/1024]` container:

1. **Base photo** — the clutch bag shot, no transparency.
2. **Lining PNG** — a pre-composited PNG with the lining area filled with the fabric pattern/color, transparent everywhere outside the lining shape.
3. **Label overlay** — the SVG label composited at calibrated constants (see `ClutchConfigurator.tsx` header).

Because both images use `fill` on the same container, they align automatically — no offset math, no canvas pixel work.

---

## Lining PNG Spec

| Property | Value |
|---|---|
| Target dimensions | 1010×1024 px (match base photo aspect ratio) |
| Color type | RGBA (PNG color type 6, bit depth 8) |
| Outside lining shape | Fully transparent (alpha = 0) |
| Inside lining shape | Opaque fabric texture or solid color |

Minor dimension deviations are tolerated — `fill` stretches to the container — but the lining shape must align with the base photo at the container's aspect ratio.

---

## Adding a New Lining

1. Produce a PNG with the lining area filled and everything else at alpha = 0.
2. Place it at `public/images/clutch/lining-<name>.png`.
3. Add one entry to `LINING_OPTIONS` in `src/components/storefront/ClutchConfigurator.tsx`:
   ```ts
   { name: "<Hebrew name>", swatchColor: "<hex>", imageUrl: "/images/clutch/lining-<name>.png" },
   ```
   Derive `swatchColor` from the average color of the opaque pixels (e.g., via `System.Drawing` or Pillow).
4. No other code changes needed.

---

## Asset Table

| File | Dimensions | Notes |
|---|---|---|
| `lining-zebra.png` | 1010×1024 | Zebra print; standard pipeline |
| `lining-lion.png` | 1024×1038 | Lion print; delivered pre-converted with genuine RGBA transparency — no conversion step was needed |
