import { betterAuth } from "better-auth";
import { db } from "@/lib/db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: db,
  emailAndPassword: {
    enabled: true,
  },
});
