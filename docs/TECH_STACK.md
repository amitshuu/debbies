# Debbies — Tech Stack

## Core

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG for performance + SEO, server actions for secure mutations |
| Language | TypeScript | Type safety across client/server boundary |
| Styling | Tailwind CSS | Fast iteration, consistent design tokens (see DESIGN_SYSTEM.md) |
| Database | Supabase (PostgreSQL) | Generous free tier, built-in Row Level Security, same provider as storage |
| ORM | Prisma | Type-safe queries, prevents SQL injection by construction, easy schema migrations |
| File storage | Supabase Storage | Same provider as DB, avoids a third external dependency, cheap at this scale |
| Client state | Zustand (+ persist middleware) | Minimal boilerplate, built-in localStorage persistence for the cart |
| Payments | Stripe | Industry standard, card data never touches our server (see SECURITY.md) |
| Auth (admin panel, phase 3) | NextAuth | Standard, well-audited, integrates cleanly with Next.js App Router |
| Hosting | Vercel | Built for Next.js, generous free tier, scales by bandwidth not by "function calls running up a bill" the way people fear |

## Why Not Shopify (recap)

Already decided — the interactive fabric/lining visualizer for the custom clutch is the product's core differentiator, and that's exactly what's expensive and limited inside Shopify's app ecosystem. Custom Next.js gives full control over that experience and is cheaper long-term.

## Why Zustand Over Redux/Context

- Redux: too much boilerplate for a cart-sized state need.
- Context: re-render issues at scale, awkward with async, no built-in persistence.
- Zustand: small API surface, official `persist` middleware handles localStorage out of the box, easy to later sync with the DB once user accounts exist.

## Versions & Conventions

- Node.js: LTS (check `node -v`, use the latest LTS at setup time).
- Package manager: npm (keep it consistent — no mixing with yarn/pnpm mid-project).
- No `any` in TypeScript unless explicitly justified with a comment explaining why.
- Server Actions preferred over API routes for internal mutations (cart sync, order creation) — fewer round trips, fewer places for client-side tampering.
- API routes reserved for things that genuinely need an HTTP endpoint (Stripe webhooks, etc).
