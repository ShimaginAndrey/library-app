import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL not found in environment");

export default defineConfig({
    schema: "./db/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
