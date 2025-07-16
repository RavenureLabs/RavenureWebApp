"use client";
import { LanguageProvider } from "@/src/context/language/language.context";
import { SessionProvider } from "next-auth/react";
import NavbarComponent from "../navbar/navbar.component";
import { usePathname } from "next/navigation";
import FooterComponent from "../footer/footer.component";
import path from "path";


const HIDDEN_NAVBAR_ROUTES = ['/login', "/admin-dashboard/*"];
const HIDDEN_FOOTER_ROUTES = ['/login', "/admin-dashboard/*"];

export default function ClientLayout({ children, lang }: { children: React.ReactNode, lang: string }) {
  const pathname = usePathname();
  const hideNavbar = HIDDEN_NAVBAR_ROUTES.some(uri => {
    if(uri.includes("/*")){
      const basePath = pathname.split("/")[1];
      if(basePath === uri.split("/")[1]){
        return true;
      }
    }else{
      if(pathname === uri){
        return true;
      }
    }
    return false;
  })

  const hideFooter = HIDDEN_FOOTER_ROUTES.some(uri => {
    if(uri.includes("/*")){
      const basePath = pathname.split("/")[1];
      if(basePath === uri.split("/")[1]){
        return true;
      }
    }else{
      if(pathname === uri){
        return true;
      }
    }
    return false;
  })
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
