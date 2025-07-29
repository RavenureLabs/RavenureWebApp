'use client';

import { useState } from 'react';
import { UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { config } from '@/src/config/config';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/src/stores/cart.store';
import { FaChevronDown } from 'react-icons/fa';

const languages = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

export default function Header() {
  const { text, setLanguage , language} = useLanguage();
  const { data: session } = useSession();
  const { toggle } = useCartStore();
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: (typeof languages)[0]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setLanguage(lang.code);
  };

  return (
    <header className="sticky top-0 z-50 text-white  backdrop-blur bg-gradient-to-b from-[#09080a] to-[#171717]">
      {/* Broadcast Banner */}
      <div className="w-full bg-gradient-to-r from-[#25d170] to-[#139f8b] text-center py-2 text-sm font-semibold">
        {text("navbar.broadcast")}
      </div>

      {/* Navbar */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="transition-transform duration-200 hover:scale-110">
            <img src="/Ravenure-Logo.png" alt="Ravenure Logo" className="h-8 w-auto object-contain" />
          </a>
          <nav className="flex gap-4 text-sm font-semibold">
            {[
              { href: "/", key: "navbar.home" },
              { href: "/store", key: "navbar.store" },
              { href: "/referances", key: "navbar.referances" },
              { href: config.discordServerUrl, key: "navbar.discord" },
              { href: "/s-s-s", key: "navbar.sss" },
            ].map(({ href, key }) => (
              <a
                key={key}
                href={href}
                className="relative px-4 py-4 transition-all duration-300 overflow-hidden group"
              >
                <span className="relative z-10">{text(key)}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <a onClick={toggle} className="relative p-2 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">
                <ShoppingCartIcon className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
            <a href={session?.user ? "/dash" : "/login"} className="relative p-2 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">
                <UserIcon className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>
          <div className="relative text-sm select-none">
            <button onClick={() => setIsOpen(!isOpen)} className="relative flex items-center gap-1 px-2 py-2 text-white cursor-pointer">
              <span className="z-10 pointer-events-none">{languages.find((lang) => lang.code === language)?.label}</span>
              <FaChevronDown className={`w-3 h-3 transition-transform z-10 pointer-events-none ${isOpen ? "rotate-180" : ""}`} />
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
                      <span className="relative z-10 pointer-events-none transition-transform duration-200">{lang.label}</span>
                      <span className="hover-bg absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-all duration-300 rounded-[10px]" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
