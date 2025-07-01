'use client';
import { useState } from 'react';
import { UserIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
        
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

export default function NavbarComponent() {
    const { text } = useLanguage();
    const { data: session } = useSession();
    useEffect(() => {
        const toggleBtn = document.getElementById("menuToggle");
        const mobileMenu = document.getElementById("mobileMenu");
        const overlay = document.getElementById("overlay");

        function openMenu() {
        mobileMenu?.classList.remove("-translate-x-full");
        mobileMenu?.classList.add("translate-x-0");
        mobileMenu?.classList.remove("pointer-events-none");
        overlay?.classList.remove("hidden");
        toggleBtn?.classList.add("open");

        // Disable body scroll when menu is open
        document.body.style.overflow = "hidden";
        }

        function closeMenu() {
        mobileMenu?.classList.add("-translate-x-full");
        mobileMenu?.classList.remove("translate-x-0");
        mobileMenu?.classList.add("pointer-events-none");
        overlay?.classList.add("hidden");
        toggleBtn?.classList.remove("open");

        // Enable body scroll when menu is closed
        document.body.style.overflow = "auto";
        }

export default function Header() {
  const { text } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f10] text-white border-b border-gray-700 border-opacity-40 backdrop-blur">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Menü */}
        <div className="flex items-center gap-8">
          <a href="/" className="transition-transform duration-200 hover:scale-110">
            <img src="/Ravenure-Logo.png" alt="Ravenure Logo" className="h-8 w-auto object-contain" />
          </a>

          {/* Desktop Menü */}
          <nav className="hidden md:flex gap-4 text-sm font-semibold">
            <a href="#" className="relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.home")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
            </a>
            <a href="#" className="relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.store")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
            </a>
            <a href="#" className="relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.referances")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
            </a>
            <a href="#" className="relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.discord")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
            </a>
            <a href="#" className="relative px-4 py-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">{text("navbar.sss")}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
            </a>
          </nav>
        </div>

        {/* Iconlar + Hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <a href="/cart" className="relative p-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10"><ShoppingCartIcon className="w-5 h-5" /></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
            <a href="/account" className="relative p-2 rounded-full transition-all duration-300 overflow-hidden group">
              <span className="relative z-10"><UserIcon className="w-5 h-5" /></span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white" aria-label="Open Menu">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
 
      {/* Mobil Menü - Tam Ekran Slide */}
<div
  className={`fixed top-0 right-0 w-screen h-screen bg-[#0f0f10] z-50 transform transition-transform duration-300 ${
    menuOpen ? 'translate-x-0' : 'translate-x-[100%]'
  }`}
>

  <div className="flex items-center justify-between px-6 pt-6">
    <a href="/" className="block">
      <img
        src="/Ravenure-Logo.png"
        alt="Ravenure Logo"
        className="h-8 w-auto object-contain"
      />
    </a>
    <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
      <XMarkIcon className="h-6 w-6 text-white" />
    </button>
  </div>
 
  <div className="mt-6 mb-8 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
 
  <nav className="flex flex-col items-center justify-center gap-6 text-lg font-semibold h-[calc(100%-100px)]">
    <a
      href="#"
      className="relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group"
    >
      <span className="relative z-10">{text("navbar.home")}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
    </a>
    <a
      href="#"
      className="relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group"
    >
      <span className="relative z-10">{text("navbar.store")}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
    </a>
    <a
      href="#"
      className="relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group"
    >
      <span className="relative z-10">{text("navbar.referances")}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
    </a>
    <a
      href="#"
      className="relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group"
    >
      <span className="relative z-10">{text("navbar.discord")}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
    </a>
    <a
      href="#"
      className="relative px-6 py-3 rounded-full transition-all duration-300 overflow-hidden group"
    >
      <span className="relative z-10">{text("navbar.sss")}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
    </a>

    {/* Iconlar alt kısımda */}
    <div className="flex gap-4 mt-8">
      <a
        href="/cart"
        className="relative p-3 rounded-full transition-all duration-300 overflow-hidden group"
      >
        <span className="relative z-10">
          <ShoppingCartIcon className="w-6 h-6" />
        </span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </a>
      <a
        href="/account"
        className="relative p-3 rounded-full transition-all duration-300 overflow-hidden group"
      >
        <span className="relative z-10">
          <UserIcon className="w-6 h-6" />
        </span>
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </a>
    </div>
  </nav>
</div>
}
