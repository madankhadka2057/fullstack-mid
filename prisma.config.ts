// prisma.config.ts
import "dotenv/config"; // Optional: Load environment variables
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  // Database URL for migrations and the CLI
  datasource: {
    url: env("DATABASE_URL"), // Use the URL for CLI operations
  },
  // Other configurations like migrations path or seed script command
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});
