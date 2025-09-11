// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      dbId: string | null;

      name: string | null;
      email: string | null;
      image?: string | null;
      profilePictureUrl?: string | null;

      discordId?: string | null;

      role: "admin" | "member" | "user";
      products: string[];
      accountType: "discord" | "email";

      isActive?: boolean;
      isVerified?: boolean;
      lastLogin?: string | null;
      phoneNumber?: string | null;
    };
  }

  interface User extends DefaultUser {
    id: string; 
    dbId?: string | null;

    name: string | null;
    email: string | null;
    image?: string | null;

    discordId?: string | null;

    role?: "admin" | "member" | "user";
    accountType?: "discord" | "email";

    isActive?: boolean;
    isVerified?: boolean;
    lastLogin?: string | null;
    phoneNumber?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      discordId: string;
      dbId: string;
    };
  }
}
