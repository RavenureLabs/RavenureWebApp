// lib/auth/options.ts
import { NextAuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { userService } from "../services";
import { api } from "../api";
import { error } from "console";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { password, email } = credentials || {};

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    email,
                    password,
                }
            }),
        })
        const user = await res.json();
        if (user.user !== undefined) {
          if(user.user.discordId !== null){
            return null;
          }
          return user.user;
        } else {
          return null;
        }
      }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      async profile(profile) {
        if (!profile?.email || !profile?.username) {
          console.error("Missing required Discord profile fields:", profile);
          throw new Error("Discord hesabınızdan e-posta ve kullanıcı adı alınamadı.");
        }

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/discord/${profile.id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "x-auth-id": profile.id
          }
        });

        if (res.status === 404) {
          const result = await userService.register({
            name: profile.username || "DiscordUser",
            email: profile.email,
            password: undefined,
            accountType: "discord",
            discordId: profile.id,
            profilePictureUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
            role: "admin",
            createdAt: new Date().toISOString(),
            products: [],
            isVerified: true,
          });
          return {
            id: result.user.discordId,
            name: result.user.name,
            email: result.user.email,
            image: result.user.profilePictureUrl,
            role: result.user.role,
            phoneNumber: result.user.phoneNumber,
            accountType: result.user.accountType,
            isActive: result.user.isActive,
            isVerified: result.user.isVerified,
            lastLogin: result.user.lastLogin,
          };
        }

        const user = await res.json();
        return {
          id: user.user.discordId,
          name: user.user.name,
          email: user.user.email,
          image: user.user.profilePictureUrl,
          role: user.user.role,
          phoneNumber: user.user.phoneNumber,
          accountType: user.user.accountType,
          isActive: user.user.isActive,
          isVerified: user.user.isVerified,
          lastLogin: user.user.lastLogin,
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
    callbacks: {
        async jwt({ token, user, account, profile  }) {
            if (user) {
              if (account?.provider === "discord") {
                let isRegistered = await userService.isRegistered(profile?.email);
                if (!isRegistered) {
                  await userService.register({
                    // @ts-ignore
                    name: profile?.username as string,
                    email: profile?.email as string,
                    password: undefined,
                    accountType: "discord",
                    // @ts-ignore
                    discordId: profile?.id as string,
                    phoneNumber: "",
                    // @ts-ignore
                    profilePictureUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile?.avatar}.png`,
                    role: "admin",
                    createdAt: new Date().toISOString(),
                    products: [],
                    isVerified: true,
                  });
                }
              }
              token.user = user; 
            }
            return token;
            },
        async session({ session, token }) {
          session.user = token.user as typeof session.user;
          return session;
        },
    },
  secret: process.env.NEXTAUTH_SECRET,
};