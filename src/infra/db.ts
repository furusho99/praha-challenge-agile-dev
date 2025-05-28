import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({
  path: process.env.NODE_ENV === "development" ? ".env.local" : ".env",
});
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
