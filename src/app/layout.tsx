import {Poppins } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/layout/client.layout"; 
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const lang = headersList.get('x-language') || 'en';
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="logo.png" type="image/png" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientLayout lang={lang}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
