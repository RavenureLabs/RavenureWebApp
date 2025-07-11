// lib/auth/options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

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
        if (res.ok && user) {
          return user.user;
        } else {
          return {
            error: user.message,
          }
        }
        }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.avatar,
        };
      },
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
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