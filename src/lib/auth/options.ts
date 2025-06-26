// lib/auth/options.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials || {};

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "login",
                data: {
                    username,
                    password,
                }
            }),
        })
        const user = await res.json();
        if (res.ok && user) {
          return user; // Return user object if login is successful
        } else {
          throw new Error("Invalid credentials");
        }
        }
    }),
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