import { pgTable, pgSchema, check, serial, varchar, numeric, jsonb, timestamp, text, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import "dotenv/config"

// Define a schema
export const wellcommerce = pgSchema("wellcommerce")

export const cartInWellcommerce = wellcommerce.table(
  "cart",
  {
    id: serial().notNull(),
    customerName: varchar("customer_name", { length: 50 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 16 }).notNull(),
    customerAddress: varchar("customer_address", { length: 256 }).notNull(),
    totalPrice: numeric("total_price", { precision: 12, scale: 2 }).notNull(),
    variantDetails: jsonb("variant_details").default([]).notNull(),
    orderComplete: varchar("order_complete", { length: 1 }).default("N").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [check("cart_total_price_check", sql`total_price >= (0)::numeric`)]
)

export const productsInWellcommerce = wellcommerce.table(
  "products",
  {
    id: serial().notNull(),
    image: text().notNull(),
    name: varchar({ length: 150 }).notNull(),
    category: varchar({ length: 80 }).notNull(),
    dressStyle: varchar("dress_style", { length: 80 }).notNull(),
    rating: numeric({ precision: 2, scale: 1 }).notNull(),
    ratingCount: integer("rating_count").default(0).notNull(),
    price: numeric({ precision: 10, scale: 2 }).notNull(),
    description: text().notNull(),
    originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
    discount: numeric({ precision: 5, scale: 2 }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    check("products_rating_check", sql`(rating >= (0)::numeric) AND (rating <= (5)::numeric)`),
    check("products_rating_count_check", sql`rating_count >= 0`),
    check("products_price_check", sql`price >= (0)::numeric`),
  ]
)
