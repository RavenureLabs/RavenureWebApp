import "./globals.css";
import ClientLayout from "../components/layout/client.layout"; 
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // istediğin ağırlıklar
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
      <body className={`${poppins.className}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
