// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Discord OAuth ID */
      id: string;
      /** DB ObjectId */
      dbId: string | null;

      name: string | null;
      email: string | null;
      image?: string | null;            // normalize görsel alanı
      profilePictureUrl?: string | null; // (opsiyonel) geriye dönük uyum

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
    /** Discord OAuth ID */
    id: string;                // NextAuth 'User' zorunlu id
    /** DB ObjectId */
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
      id: string;               // Discord ID
      dbId: string | null;

      name: string;
      email: string;
      image?: string | null;
      profilePictureUrl?: string | null;

      discordId?: string | null;

      role: "admin" | "member" | "user";
      accountType: "discord" | "email";

      isActive?: boolean;
      isVerified?: boolean;
      lastLogin?: string | null;
      phoneNumber?: string | null;
    };
  }
}
