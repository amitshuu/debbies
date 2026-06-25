# Debbies — Project Overview

## What This Is

Debbies is an e-commerce website for handmade, custom-designed bags. The founder is a skilled seamstress who creates personalized bags and clothing. The site currently focuses exclusively on bags, with clothing planned for a future phase.

## Business Model

Two product types coexist on the site:

1. **Ready-made products** — Bags already sewn and photographed. Standard e-commerce flow: browse, view, add to cart, checkout.
2. **Custom product (Clutch)** — A single configurable product where the customer selects fabric and lining from predefined options. The selection updates a visual preview of the bag before they buy.

## Target Feel

Warm, luxurious, personal. This is not a mass-market dropshipping site — it should feel like a boutique atelier. Every design decision should ask "does this feel handmade and premium, or does it feel like a generic template?"

## Roadmap (Phased)

- **Phase 1** — Public storefront: homepage, product listing, ready-made product pages, custom clutch configurator with visual preview, cart.
- **Phase 2** — Checkout & payments (Israel only for now).
- **Phase 3** — Admin panel for the owner to manage products, fabrics, linings, and orders.
- **Future** — Expand catalog beyond bags into clothing. Database is designed to support this from day one (see DATABASE.md).

## Who's Building This

- Two full-stack developers (the founders) working with Claude Code in VS Code.
- Claude (in chat) acts as architect/planner — produces specs, decisions, and prompts.
- Claude Code writes the actual implementation, guided by the docs in this folder.

## Non-Negotiables

- Mobile-first, fully responsive.
- No generic "AI-looking" design — see DESIGN_SYSTEM.md.
- Price calculation always happens server-side, never trust client input (see SECURITY.md).
- Clean, professional code with no unnecessary comments, sensible naming, no redundant network calls.
