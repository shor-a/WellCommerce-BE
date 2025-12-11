import { integer, pgSchema, pgTable, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import "dotenv/config"

// Define a schema
export const general = pgSchema(process.env.SCHEMA!)

export const NotesTable = general.table("notes", {
  id: integer()
    .default(sql`nextval('general.notes_id_seq'::regclass)`)
    .notNull(),
  title: text().notNull(),
  body: text(),
})
