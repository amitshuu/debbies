@AGENTS.md

# CLAUDE.md

This file is read automatically by Claude Code at the start of every session. It is the entry point — read the referenced docs below before making architectural decisions, and treat them as binding unless the user explicitly says otherwise in the current conversation.

## Project

Debbies — e-commerce site for handmade custom bags. Full context: `docs/PROJECT.md`.

## Required Reading, In Order

1. `docs/PROJECT.md` — what we're building and why
2. `docs/TECH_STACK.md` — exact stack, no substitutions without asking
3. `docs/ARCHITECTURE.md` — folder structure, naming, component rules
4. `docs/DATABASE.md` — schema, must stay category-flexible for future clothing line
5. `docs/SECURITY.md` — non-negotiable security rules, especially server-side price calculation
6. `docs/DESIGN_SYSTEM.md` — colors, fonts, spacing (created once design references are provided)

## How To Work On This Project

- Implement exactly what's specified in the current prompt. If something is ambiguous or not covered by the docs, ask rather than assuming.
- Follow `ARCHITECTURE.md` conventions even if a different pattern seems "easier" for a one-off — consistency across the codebase matters more than local convenience.
- Every feature touching money or orders must follow `SECURITY.md` without exception.
- No comments in code except brief "why" notes for genuinely non-obvious workarounds. No filler comments restating what a line does.
- Mobile-first responsive on every single page and component — verify at 375px width mentally before considering anything done.
- Prefer Server Components and Server Actions over client-side fetching, per `ARCHITECTURE.md`.
- After implementing a feature, briefly state which docs/conventions it followed and flag anything where a judgment call was made.

## Current Phase

Phase 1: Public storefront (homepage, shop listing, ready-made product pages, custom clutch configurator with visual preview, cart). No auth, no payments, no admin panel yet — those are Phase 2 and 3.

## Source of Truth

If anything in this file or the docs conflicts with what a person asks for in the current session, the current session's explicit instruction wins — but flag the conflict out loud rather than silently overriding the docs.
