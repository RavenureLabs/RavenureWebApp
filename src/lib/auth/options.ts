// lib/auth/options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { userService } from "../services";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { email, password } }),
        });

        const out = await res.json().catch(() => null);
        if (!out?.user) return null;

        const u = out.user;
        return {
          // Credentials akışında NextAuth bir id ister -> DB id verilebilir
          id: String(u._id),
          dbId: String(u._id),
          name: u.name,
          email: u.email,
          image: u.profilePictureUrl ?? null,
          discordId: u.discordId ?? null,
          role: u.role,
          accountType: u.accountType,
          isActive: u.isActive,
          isVerified: u.isVerified,
          lastLogin: u.lastLogin ?? null,
          phoneNumber: u.phoneNumber ?? null,
        };
      },
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email" } },
      async profile(profile) {
        // 1) Kullanıcıyı Discord ID ile ara
        const res = await fetch(
          `${process.env.NEXTAUTH_URL}/api/user/discord/${profile.id}`,
          { cache: "no-store" }
        ).catch(() => null);

        let fetchedJson: any = null;
        if (res) {
          try {
            fetchedJson = await res.json();
          } catch {
            fetchedJson = null;
          }
        }

        // 2) Yanıtı normalize et: { user: {...} } veya direkt {...}
        let userDoc =
          (fetchedJson && (fetchedJson.user ?? fetchedJson)) || null;

        // 3) Bulunamadıysa kaydet ve yine normalize et
        if (!res || res.status === 404 || !userDoc) {
          const created = await userService.register({
            name: profile.global_name ?? profile.username ?? "Discord User",
            email: profile.email ?? null, // email her zaman gelmeyebilir
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

          // register dönüşünü de normalize et
          userDoc = created?.user ?? created ?? null;
        }

        const dbId =
          (userDoc && (userDoc._id ?? userDoc.id)) ? String(userDoc._id ?? userDoc.id) : null;

        return {
          // ZORUNLU: OAuth kimliği = Discord kullanıcı ID
          id: profile.id,

          // DB kimliği ayrı alan
          dbId,

          // Görsel ve kimlik bilgileri
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

          // Ek alanlar
          discordId: userDoc?.discordId ?? profile.id,
          role: userDoc?.role ?? "member",
          accountType: userDoc?.accountType ?? "discord",
          isActive: userDoc?.isActive ?? true,
          isVerified: userDoc?.isVerified ?? true,
          lastLogin: userDoc?.lastLogin ?? null,
          phoneNumber: userDoc?.phoneNumber ?? null,
        };
      },
    }),
  ],

  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...(token.user || {}),
          // Discord’da 'id' = discordId, Credentials’ta 'id' = dbId; fark etmez, hepsini taşıyoruz
          id: (user as any).id,
          dbId: (user as any).dbId ?? (user as any).id ?? null,
          name: user.name!!,
          email: user.email!!,
          image: (user as any).image ?? (user as any).profilePictureUrl ?? null,
          discordId: (user as any).discordId ?? null,
          role: (user as any).role ?? "member",
          accountType: (user as any).accountType ?? "discord",
          isActive: (user as any).isActive ?? true,
          isVerified: (user as any).isVerified ?? true,
          lastLogin: (user as any).lastLogin ?? null,
          phoneNumber: (user as any).phoneNumber ?? null,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
