"use client";
import { LanguageProvider } from "@/src/context/language/language.context";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/src/stores/cart.store";
import CartComponent from "../cart/cart.component";
import { Suspense } from "react";

const NavbarComponent = dynamic(() => import("../navbar/navbar.component"), { loading: () => <Loading /> });
const FooterComponent = dynamic(() => import("../footer/footer.component"), { loading: () => <Loading /> });

const HIDDEN_NAVBAR_ROUTES = ['/login', "/admin-dashboard/*", "/register", "/dash/*"];
const HIDDEN_FOOTER_ROUTES = ['/login', "/admin-dashboard/*", "/register", "/dash/*"];

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <span className="animate-pulse text-lg">LOADING…</span>
    </div>
  );
}

export default function ClientLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const pathname = usePathname();
  const { isOpen } = useCartStore();

  const hideNavbar = HIDDEN_NAVBAR_ROUTES.some(uri => {
    if (uri.includes("/*")) {
      const basePath = pathname.split("/")[1];
      return basePath === uri.split("/")[1];
    }
    return pathname === uri;
  });

  const hideFooter = HIDDEN_FOOTER_ROUTES.some(uri => {
    if (uri.includes("/*")) {
      const basePath = pathname.split("/")[1];
      return basePath === uri.split("/")[1];
    }
    return pathname === uri;
  });

return (
  <SessionProvider>
    <LanguageProvider lang={lang}>
      <Suspense fallback={<Loading />}>
        {!hideNavbar && <NavbarComponent />}
      </Suspense>

      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>

      {isOpen && <CartComponent />}

      <Suspense fallback={<Loading />}>
        {!hideFooter && <FooterComponent />}
      </Suspense>
    </LanguageProvider>
  </SessionProvider>
);
}
