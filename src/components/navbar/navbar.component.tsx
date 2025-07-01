'use client';
import { useState } from 'react';
import Image from 'next/image';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';

export default function Header() {
  const {text} = useLanguage()
  return (
    <header className="bg-[#0f0f10] text-white border-b border-gray-700 border-opacity-40">
      <div className="max-w-screen-2xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Sol taraf: Logo + Menü */}
        <div className="flex items-center gap-12">
          {/* Logo */}
         <a href="/">
            <img
              src="/Ravenure-Logo.png"
              alt="Ravenure Logo"
              className="h-8 w-auto object-contain"
            />
          </a>

          {/* Menü */}
          <nav className="hidden md:flex gap-4 text-sm font-semibold text-white">
            <a href="#" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">{text("navbar.home")}</a>
            <a href="#" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">Store</a>
            <a href="#" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">Referances</a>
            <a href="#" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">Discord</a>
            <a href="#" className="px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/10">SSS</a>
          </nav>
        </div>

        {/* Sağ taraf: İkonlar */}
        <div className="flex items-center gap-6">
          <button className="hover:text-white">
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
          <button className="hover:text-white">
            <UserIcon className="w-5 h-5" />
          </button>
          
        </div>
      </div>
    </header>
);
}