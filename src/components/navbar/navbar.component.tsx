'use client';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import Image from 'next/image';
import { useEffect } from 'react';

export default function NavbarComponent() {
    const { text } = useLanguage();
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

        toggleBtn?.addEventListener("click", () => {
        const isOpen = mobileMenu?.classList.contains("translate-x-0");
        isOpen ? closeMenu() : openMenu();
        });

        overlay?.addEventListener("click", () => closeMenu());

        document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
        });
    }, []);
    return(
  <header className="bg-[#0f0f10]">
    <div className="container mx-auto flex items-center justify-between py-10 px-4 relative">
      <div className="flex items-center justify-start flex-1">
        <a href="/" className="flex flex-col items-center">
          <Image
            src="/Ravenure Logo 1080x Transparent TEXT.png"
            alt="Ravenure Logo"
            width={100}
            height={100}
            className="h-16 w-auto"
            />
        </a>
      </div>

      <nav className="hidden md:flex space-x-6 font-semibold text-gray-700 z-10 flex-1 justify-center">
        <a href="/" className="text-white transition-all duration-300 hover:scale-110 hover:text-[#25d170]">{text('navbar.home')}</a>
        <a href="/store" className="text-white transition-all duration-300 hover:scale-110 hover:text-[#25d170]">{text('navbar.store')}</a>
        <a href="/referances" className="text-white transition-all duration-300 hover:scale-110 hover:text-[#25d170]">{text('navbar.referances')}</a>
        <a href="/discord-link" className="text-white transition-all duration-300 hover:scale-110 hover:text-[#25d170]">{text('navbar.discord')}</a>
      </nav>

      <div className="hidden md:block z-10 flex-1 text-right">
        <a href="/login" className="bg-[#25d170] text-white font-bold px-5 py-2 rounded-xl hover:bg-[#139f8b] transition-all duration-300">
          {text('navbar.login')}
        </a>
      </div>

      <div className="md:hidden z-30">
        <button id="menuToggle" className="relative group">
          <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transition-all duration-200 shadow-md bg-gradient-to-r from-[#25d170] to-[#139f8b]">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-[.open]:translate-x-10"></div>
              <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 delay-75 group-[.open]:translate-x-10"></div>
              <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left delay-150 group-[.open]:translate-x-10"></div>

              <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-[.open]:translate-x-0 flex w-0 group-[.open]:w-12">
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-[.open]:rotate-45"></div>
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-[.open]:-rotate-45"></div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
    <div id="mobileMenu" className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-white z-20 p-8 flex flex-col items-center justify-center space-y-6 font-semibold text-gray-800 text-lg transform -translate-x-full transition-transform duration-500 pointer-events-none">
      <a href="/" className="transition-all duration-300 hover:text-[#139f8b] hover:scale-105">{text('navbar.home')}</a>
      <a href="/store" className="transition-all duration-300 hover:text-[#139f8b] hover:scale-105">{text('navbar.store')}</a>
      <a href="/referances" className="transition-all duration-300 hover:text-[#139f8b] hover:scale-105">{text('navbar.referances')}</a>
      <a href="/discord-link" className="transition-all duration-300 hover:text-[#139f8b] hover:scale-105">{text('navbar.discord')}</a>
      <a href="#" className="bg-[#25d170] text-white font-bold px-6 py-2 rounded-xl hover:bg-[#139f8b] transition-all duration-300">{text('navbar.login')}</a>
    </div>
    <div id="overlay" className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-10 hidden"></div>
  </header>
    );
}
