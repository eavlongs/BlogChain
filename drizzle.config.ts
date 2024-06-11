import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env" });

export default defineConfig({
    introspect: {
        casing: "camel",
    },
    schema: "./src/drizzle/schema.ts",
    /**
     * schema.ts will be introspected and migration files will be generated in this folder
     */
    out: "./src/drizzle/migrations",
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DB_URL as string,
    },
});
