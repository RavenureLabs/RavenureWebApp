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
  const { data: session, status } = useSession();
  const { toggle } = useCartStore();

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

  const handleSelect = (lang: (typeof languages)[0]) => {
    setIsOpen(false);
    setLanguage(lang.code);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out backdrop-blur',
          scrolled
            ? 'bg-white/90 shadow-lg border-b border-black/5'
            : 'bg-gradient-to-b from-[#09080a] to-[#171717]',
        ].join(' ')}
      >
        {/* Broadcast Banner */}
        <div
          className={[
            'w-full text-center text-sm font-semibold overflow-hidden transition-all duration-500',
            scrolled
              ? 'max-h-0 py-0'
              : 'max-h-12 py-2 bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white',
          ].join(' ')}
        >
          {!scrolled && text('navbar.broadcast')}
        </div>

        {/* Navbar */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex items-center justify-between">
          {/* Sol: Logo + Nav */}
          <div className="flex items-center gap-6">
            <a href="/" className="transition-transform duration-200 hover:scale-110">
              <img
                src={scrolled ? '/Ravenure-Logo-Black.png' : '/Ravenure-Logo.png'}
                alt="Ravenure Logo"
                className="h-8 w-auto object-contain transition-all duration-500"
              />
            </a>

            <nav className="hidden lg:flex gap-x-2 text-sm font-semibold">
              {navLinks.map(({ href, key }) => (
                <a
                  key={key}
                  href={href}
                  className={[
                    'relative px-4 py-2 rounded-[20px] transition-all duration-300 overflow-hidden group',
                    scrolled ? 'text-neutral-900' : 'text-white',
                  ].join(' ')}
                >
                  <span className="relative z-10">{text(key)}</span>
                  <span
                    className={[
                      'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]',
                      scrolled ? 'bg-black/[0.06]' : 'bg-gradient-to-r from-white/10 to-transparent',
                    ].join(' ')}
                  />
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
              href={session?.user ? '/dash' : '/login'}
              className="relative p-2 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">
                <UserIcon className="w-5 h-5" />
              </span>
              <span className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>

            {/* Dil seçici */}
            <div className="relative text-sm select-none hidden lg:block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={[
                  'relative flex items-center gap-1 px-2 py-2 cursor-pointer rounded-[20px] transition-colors duration-300',
                  scrolled ? 'text-neutral-900 hover:bg-black/[0.06]' : 'text-white hover:bg-white/10',
                ].join(' ')}
              >
                <span className="z-10 pointer-events-none">
                  {languages.find((l) => l.code === language)?.label}
                </span>
                <FaChevronDown className={`w-3 h-3 transition-transform z-10 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div
                  className={[
                    'absolute left-1/2 -translate-x-1/2 mt-3 w-32 rounded-md shadow-xl z-50 animate-fadeInScale origin-top',
                    scrolled
                      ? 'bg-white text-neutral-900 border border-black/10'
                      : 'bg-gradient-to-b from-[#171717] to-[#0f0f10] text-white',
                  ].join(' ')}
                >
                  <ul className="py-1 flex flex-col text-sm">
                    {languages.map((lang) => (
                      <li
                        key={lang.code}
                        onClick={() => handleSelect(lang)}
                        className={[
                          'cursor-pointer px-4 py-2 flex justify-center items-center rounded-[10px] transition-all duration-200',
                          scrolled ? 'hover:bg-black/[0.06]' : 'hover:bg-white/10',
                        ].join(' ')}
                      >
                        {lang.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Hamburger – Mobil */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative w-6 h-6 flex flex-col justify-between items-center group"
                aria-label="Menu"
              >
                <span className={`block h-0.5 w-full transform transition duration-300 ease-in-out ${scrolled ? 'bg-neutral-900' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`block h-0.5 w-full transition-all duration-300 ease-in-out ${scrolled ? 'bg-neutral-900' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-full transform transition duration-300 ease-in-out ${scrolled ? 'bg-neutral-900' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobil Menü */}
        {mobileMenuOpen && (
          <nav className={['lg:hidden px-4 pb-4 animate-fadeIn', scrolled ? 'text-neutral-900' : 'text-white'].join(' ')}>
            <ul className="flex flex-col gap-2 text-sm font-semibold">
              {navLinks.map(({ href, key }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={['block px-4 py-2 rounded-[10px] transition', scrolled ? 'bg-black/[0.06] hover:bg-black/[0.1]' : 'bg-white/5 hover:bg-white/10'].join(' ')}
                  >
                    {text(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* Spacer: header kadar boşluk */}
      <div aria-hidden style={{ height: headerH }} />
    </>
  );
}
