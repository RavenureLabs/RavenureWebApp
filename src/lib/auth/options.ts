// lib/auth/options.ts
import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { userService } from "../services";
import { UserType } from "@/src/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email" } },
      async profile(profile) {
        let userDoc: UserType | null = null;
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/discord/${profile.id}`,
            { cache: "no-store" }
          );
          if (res.ok) {
            const json = await res.json().catch(() => null);
            userDoc = (json && (json.user ?? json)) || null;
          }
        } catch {
        }

        if (!userDoc) {
          const created = await userService.register({
            name: profile.global_name ?? profile.username ?? "Discord User",
            email: profile.email ?? null, 
            accountType: "discord",
            discordId: profile.id,
            profilePictureUrl: profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
              : `https://cdn.discordapp.com/embed/avatars/0.png`,
            role: "member",
            createdAt: new Date().toISOString(),
            products: [],
            isVerified: true,
          });

          userDoc = created.user as UserType;
        }

        const dbId =
          (userDoc as any)?._id
            ? String((userDoc as any)._id)
            : null;
        return {
          id: profile.id,
          dbId,

          name:
            userDoc?.name ??
            profile.global_name ??
            profile.username ??
            "Discord User",
          email: userDoc?.email ?? profile.email ?? null,
          image:
            userDoc?.profilePictureUrl ??
            (profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
              : `https://cdn.discordapp.com/embed/avatars/0.png`),

          discordId: userDoc?.discordId ?? profile.id,
          role: userDoc?.role ?? "member",
          accountType: userDoc?.accountType ?? "discord",
          isActive: userDoc?.isActive ?? true,
          isVerified: userDoc?.isVerified ?? true,
          lastLogin: userDoc?.lastLogin ?? null,
          phoneNumber: userDoc?.phoneNumber ?? null,
          products: (userDoc as any)?.products ?? [],
        } as any;
      },
    }),
  ],

  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          dbId: (user as any).dbId ?? null,
          discordId: (user as any).discordId ?? (user as any).id ?? null,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // İstemciye yalnızca kimlik gidiyor
      session.user = token.user as any; // { dbId, discordId }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
