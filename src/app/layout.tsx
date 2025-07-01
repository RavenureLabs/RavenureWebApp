<<<<<<< HEAD
import {Poppins } from "next/font/google";
=======
>>>>>>> 90baf45e452f2cf101e5ef89d6842496422cf90e
import "./globals.css";
import ClientLayout from "../components/layout/client.layout"; 
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
<<<<<<< HEAD
  weight: ['400', '600', '700'], 
=======
  weight: ['400', '600', '700'], // istediğin ağırlıklar
>>>>>>> 90baf45e452f2cf101e5ef89d6842496422cf90e
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="logo.png" type="image/png" />
      </head>
<<<<<<< HEAD
      <body className={`${poppins.className} antialiased`}>
=======
      <body className={`${poppins.className}`}>
>>>>>>> 90baf45e452f2cf101e5ef89d6842496422cf90e
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
