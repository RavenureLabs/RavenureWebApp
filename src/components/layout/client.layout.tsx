"use client";
import { LanguageProvider } from "@/src/context/language/language.context";
import { SessionProvider } from "next-auth/react";
import NavbarComponent from "../navbar/navbar.component";
import { usePathname } from "next/navigation";
import FooterComponent from "../footer/footer.component";

const HIDDEN_NAVBAR_ROUTES = ['/login'];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = HIDDEN_NAVBAR_ROUTES.includes(pathname);
    return (
    <SessionProvider>
      <LanguageProvider>
        {!hideNavbar && <NavbarComponent />}
        {children}
        <FooterComponent />
      </LanguageProvider>
    </SessionProvider>
  );
}
