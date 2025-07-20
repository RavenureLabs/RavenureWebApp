'use client';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { config } from '@/src/config/config';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/src/stores/cart.store';

export default function Header() {
  const { text } = useLanguage();
  const {data:session} = useSession();
  const {toggle} = useCartStore();

  return (
    <header className="sticky top-0 z-50 text-white border-b border-gray-700 border-opacity-40 backdrop-blur bg-gradient-to-b from-[#0f0f10] to-[#171717]">

      <div className="w-full bg-gradient-to-r from-[#25d170] to-[#139f8b] text-center py-2 text-sm font-semibold">
        {text("navbar.broadcast")}
      </div>
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Menü */}
        <div className="flex items-center gap-8">
          <a href="/" className="transition-transform duration-200 hover:scale-110">
            <img src="/Ravenure-Logo.png" alt="Ravenure Logo" className="h-8 w-auto object-contain" />
          </a>
 
          <nav className="flex gap-4 text-sm font-semibold">
            <a href="/" className="relative px-4 py-4   transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.home")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
            </a>
            <a href="/store" className="relative px-4 py-4   transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.store")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
            </a>
            <a href="/referances" className="relative px-4 py-4 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.referances")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
            </a>
            <a href={config.discordServerUrl} className="relative px-4 py-4 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.discord")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
            </a>
            <a href="/s-s-s" className="relative px-4 py-4  transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.sss")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
            </a>
          </nav>
        </div>

        {/* İkonlar */}
        <div className="flex items-center gap-2 cursor-pointer">
          <a onClick={toggle} className="relative p-2  transition-all duration-300 overflow-hidden group">
            <span className="relative z-10"><ShoppingCartIcon className="w-5 h-5" /></span>
            <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href={session?.user ? "/dash" : "/login"} className="relative p-2 ransition-all duration-300 overflow-hidden group">
            <span className="relative z-10"><UserIcon className="w-5 h-5" /></span>
            <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
}
