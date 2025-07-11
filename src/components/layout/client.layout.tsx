"use client";
import { LanguageProvider } from "@/src/context/language/language.context";
import { SessionProvider } from "next-auth/react";
import NavbarComponent from "../navbar/navbar.component";
import { usePathname } from "next/navigation";
import FooterComponent from "../footer/footer.component";


const HIDDEN_NAVBAR_ROUTES = ['/login'];
const HIDDEN_FOOTER_ROUTES = ['/login'];

export default function ClientLayout({ children, lang }: { children: React.ReactNode, lang: string }) {
  const pathname = usePathname();
  const hideNavbar = HIDDEN_NAVBAR_ROUTES.includes(pathname);
  const hideFooter = HIDDEN_FOOTER_ROUTES.includes(pathname);
  return (
    <SessionProvider>
        <LanguageProvider lang={lang}>
          {!hideNavbar && <NavbarComponent />}
          {children}
          {!hideFooter && <FooterComponent />}
        </LanguageProvider>
    </SessionProvider>
  );
}
