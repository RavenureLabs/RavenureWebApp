import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarComponent from "../components/navbar/navbar.component";
import { LanguageProvider } from "../context/language/language.context";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="logo.png" type="image/png"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <NavbarComponent />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
