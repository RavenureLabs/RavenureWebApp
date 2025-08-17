'use client';

import { useState } from 'react';
import {
  UserIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { config } from '@/src/config/config';
import { signIn, useSession } from 'next-auth/react';
import { useCartStore } from '@/src/stores/cart.store';
import { FaChevronDown } from 'react-icons/fa';

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

export default function Header() {
  const { text, setLanguage, language } = useLanguage();
  const { data: session } = useSession();
  const { toggle } = useCartStore();
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (lang: (typeof languages)[0]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setLanguage(lang.code);
  };

  const navLinks = [
    { href: '/', key: 'navbar.home' },
    { href: '/store', key: 'navbar.store' },
    { href: '/referances', key: 'navbar.referances' },
    { href: config.discordServerUrl, key: 'navbar.discord' },
    { href: '/s-s-s', key: 'navbar.sss' },
  ];

  return (
    <header className="sticky top-0 z-50 text-white backdrop-blur bg-gradient-to-b from-[#09080a] to-[#171717]">
      {/* Broadcast Banner */}
      <div className="w-full bg-gradient-to-r from-[#25d170] to-[#139f8b] text-center py-2 text-sm font-semibold">
        {text('navbar.broadcast')}
      </div>

      {/* Navbar */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Sol taraf: Logo + Nav */}
        <div className="flex items-center gap-6">
          <a href="/" className="transition-transform duration-200 hover:scale-110">
            <img src="/Ravenure-Logo.png" alt="Ravenure Logo" className="h-8 w-auto object-contain" />
          </a>

          {/* Nav Menüsü - Masaüstü */}
          <nav className="hidden lg:flex gap-x-4 text-sm font-semibold">
            {navLinks.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                className="relative px-4 py-2 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">{text(key)}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
              </a>
            ))}
          </nav>
        </div>

        {/* Sağ taraf: Butonlar */}
        <div className="flex items-center gap-4">
          {/* Sepet & Kullanıcı */}
          <div className="flex items-center gap-2">
            <a
              onClick={toggle}
              className="relative p-2 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">
                <ShoppingCartIcon className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
            <a
              onClick={async () => await signIn('discord', { callbackUrl: '/dash' })}
              className="relative p-2 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">
                <UserIcon className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>

          {/* Dil Seçici - Sadece Masaüstü */}
          <div className="relative text-sm select-none hidden lg:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center gap-1 px-2 py-2 text-white cursor-pointer"
            >
              <span className="z-10 pointer-events-none">
                {languages.find((lang) => lang.code === language)?.label}
              </span>
              <FaChevronDown
                className={`w-3 h-3 transition-transform z-10 pointer-events-none ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-all duration-300" />
            </button>

            {isOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-5 w-32 text-white rounded-md shadow-xl z-50 animate-fadeInScale origin-top bg-gradient-to-b from-[#171717] to-[#0f0f10]">
                <ul className="py-1 flex flex-col text-sm">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => handleSelect(lang)}
                      className="cursor-pointer px-4 py-2 flex justify-center items-center relative overflow-hidden transition-all duration-200 rounded-[10px]"
                      onMouseEnter={(e) => {
                        const bg = e.currentTarget.querySelector('.hover-bg');
                        const text = e.currentTarget.querySelector('span.relative');
                        if (bg) bg.classList.add('opacity-100');
                        if (text) text.classList.add('translate-x-2');
                      }}
                      onMouseLeave={(e) => {
                        const bg = e.currentTarget.querySelector('.hover-bg');
                        const text = e.currentTarget.querySelector('span.relative');
                        if (bg) bg.classList.remove('opacity-100');
                        if (text) text.classList.remove('translate-x-2');
                      }}
                    >
                      <span className="relative z-10 pointer-events-none transition-transform duration-200">
                        {lang.label}
                      </span>
                      <span
                        className="hover-bg absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-all duration-300 rounded-[10px]"
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menü - Mobil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative w-6 h-6 flex flex-col justify-between items-center group"
            >
              <span
                className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü Açıldığında */}
      {mobileMenuOpen && (
        <nav className="lg:hidden px-4 pb-4 animate-fadeIn">
          <ul className="flex flex-col gap-2 text-sm font-semibold">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <a
                  href={href}
                  className="block px-4 py-2 rounded-[10px] bg-white/5 hover:bg-white/10 transition"
                >
                  {text(key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
