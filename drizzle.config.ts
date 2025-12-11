import "dotenv/config"
import { defineConfig } from "drizzle-kit"
export default defineConfig({
  schema: "./src/config/db/schema.ts",
  out: "./src/config/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: [process.env.SCHEMA!],
  verbose: true,
  strict: true,
})
