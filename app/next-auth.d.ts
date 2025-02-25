// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    role: string; // Add any additional fields you need
  }

  interface Session {
    user: User;
  }
}
