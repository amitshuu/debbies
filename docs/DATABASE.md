# Debbies — Database Schema

## Design Principle

The schema must support bags today and clothing later **without a rewrite**. This means: no `bags` table — instead a generic `products` table with a `category` relation, and product-type-specific data (like fabric/lining options) modeled as separate, reusable tables that any product could theoretically reference.

## Core Tables

### `Category`
```
id            String   @id @default(cuid())
name          String            // "Bags", "Clothing" (future)
slug          String   @unique
createdAt     DateTime @default(now())
```

### `Product`
```
id            String   @id @default(cuid())
name          String
slug          String   @unique
description   String
basePrice     Int               // stored in agorot (cents) — never floats for money
images        String[]          // Supabase Storage URLs
categoryId    String
category      Category @relation(...)
isCustomizable Boolean @default(false)  // true only for the Clutch-style configurable product
isActive      Boolean  @default(true)
stock         Int?              // null = not stock-tracked (relevant for ready-made items)
createdAt     DateTime @default(now())
updatedAt     DateTime @updatedAt
```

### `FabricOption`
```
id            String   @id @default(cuid())
name          String            // "Burgundy Linen"
imageUrl      String            // swatch image for the picker
priceModifier Int      @default(0)  // agorot, added to basePrice if selected
isActive      Boolean  @default(true)
```

### `LiningOption`
```
id            String   @id @default(cuid())
name          String
imageUrl      String
priceModifier Int      @default(0)
isActive      Boolean  @default(true)
```

### `ProductFabricOption` / `ProductLiningOption` (join tables)
Link which fabrics/linings are available for which customizable product. This is what lets future customizable clothing items reuse the same fabric/lining system without duplicating data.

### `Order`
```
id            String   @id @default(cuid())
customerName  String
customerEmail String
customerPhone String
shippingAddress String
status        OrderStatus @default(PENDING)
totalAmount   Int               // agorot — calculated server-side at creation, never from client
stripePaymentId String?
createdAt     DateTime @default(now())
```

### `OrderItem`
```
id              String  @id @default(cuid())
orderId         String
order           Order   @relation(...)
productId       String
quantity        Int
unitPrice       Int             // snapshot at time of purchase — price changes later must not affect past orders
selectedFabricId String?
selectedLiningId String?
```

### `OrderStatus` (enum)
```
PENDING, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED
```

## Key Rules

1. **All money fields are integers (agorot/cents).** Never use floats for currency — rounding errors are a real bug class.
2. **`OrderItem.unitPrice` is a snapshot.** If the owner changes a product's price next month, old orders must still reflect what the customer actually paid.
3. **Price is always recalculated server-side** from `Product.basePrice` + `FabricOption.priceModifier` + `LiningOption.priceModifier` at the moment an order is created. The client never sends a price — only a product ID and selected option IDs. See SECURITY.md.
4. **Category-based, not hardcoded.** Adding clothing later means adding a `Category` row and `Product` rows — no schema migration required for the basic case.

## Migrations

Use `npx prisma migrate dev` for every schema change, named descriptively (e.g. `add_order_status_enum`). Never edit the DB directly through the Supabase dashboard for anything that should be reflected in the schema — Prisma schema is the single source of truth.
