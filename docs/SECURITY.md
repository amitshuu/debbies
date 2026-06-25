# Debbies — Security Rules (Non-Negotiable)

These rules exist because this is a real e-commerce site handling real payments. Claude Code must follow these in every relevant feature, without being reminded each time.

## 1. Price Is Never Trusted From The Client

The client sends: product ID, selected fabric ID, selected lining ID, quantity.
The server calculates: final price, every time, from current DB values.

**Never** accept a `price` or `total` field from a client request and use it directly in an order or payment. This is the #1 way custom e-commerce sites get exploited (user edits a hidden form field or replays a modified request to buy a $500 bag for $5).

## 2. Payments Never Touch Our Server

Card numbers, CVCs, expiry dates — none of this should ever be received by our backend in plaintext or otherwise. Stripe Elements / Stripe Checkout handles card collection client-side and gives us back a token/payment intent ID. Our server only ever sees that token.

## 3. All DB Access Through Prisma

No raw SQL string concatenation, ever. Prisma's parameterized queries prevent SQL injection by construction — but if a feature ever needs raw SQL (it shouldn't, but if), use Prisma's tagged template `$queryRaw` (parameterized), never `$executeRawUnsafe` with interpolated strings.

## 4. Server Actions / API Routes Validate Everything

Every server action or API route that touches the DB must:
- Validate input shape (use `zod` for schema validation).
- Re-fetch authoritative data (price, stock, fabric/lining availability) from the DB rather than trusting what was passed in.
- For admin-only actions (phase 3), verify the session belongs to an authenticated admin before doing anything.

## 5. Environment Variables

- `DATABASE_URL`, Stripe secret key, Supabase service role key — all in `.env.local`, never committed.
- `.env.local` must be in `.gitignore` from the very first commit.
- Anything prefixed `NEXT_PUBLIC_` is exposed to the browser — never put a secret there.

## 6. Row Level Security (Supabase)

Even though Prisma is the primary access layer, enable RLS on every table in Supabase as a defense-in-depth measure, in case anything ever queries Supabase directly (e.g. Storage policies). Default-deny, then add explicit policies.

## 7. Stock & Race Conditions

When stock is tracked (`Product.stock` is not null), decrement it inside the same DB transaction that creates the order — never as a separate step — to avoid overselling if two customers buy the last item simultaneously.

## 8. Rate Limiting (Phase 2+)

Checkout and order-creation endpoints should have basic rate limiting to prevent abuse (e.g. someone scripting hundreds of fake orders). Revisit when we get to checkout.
