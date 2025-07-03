'use client';

import { FaDiscord, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0f0f10] text-white py-10 px-4 border-t border-gray-700 border-opacity-40 backdrop-blur">
      <div className="max-w-screen-md mx-auto text-center space-y-6">
        {/* Logo ve yazı */}
        <a href="/" className="flex flex-col items-center justify-center gap-2">
          <img
            src="/Ravenure-Logo.png"
            alt="Ravenure Logo"
            className="w-12 h-12 object-contain hover:scale-110 duration-300 transition-all"
          />
          <h1 className="text-xl font-semibold leading-tight">
            Ravenure
          </h1>
        </a>

        {/* Copyright ve açıklama */}
        <div className="text-sm text-gray-300 space-y-1">
          <p>Copyright © 2025 Ravenure Labs – All rights reserved</p>
          <p>Ravenure Labs is not affiliated with Minecraft or Mojang AB</p>
        </div>

        {/* Sayfa linkleri */}
        {/* Sayfa linkleri */}
        <div className="flex justify-center gap-4 text-sm font-medium text-white">
        <a href="#" className="relative px-4 py-2 transition-all duration-300 overflow-hidden group rounded-[20px]">
            <span className="relative z-10">Terms</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
        </a>

        <a href="#" className="relative px-4 py-2 transition-all duration-300 overflow-hidden group rounded-[20px]">
            <span className="relative z-10">Privacy</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
        </a>

        <a href="#" className="relative px-4 py-2 transition-all duration-300 overflow-hidden group rounded-[20px]">
            <span className="relative z-10">Support</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
        </a>

        <a href="#" className="relative px-4 py-2 transition-all duration-300 overflow-hidden group rounded-[20px]">
            <span className="relative z-10">About</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[20px]" />
        </a>
        </div>


        {/* Sosyal medya ikonları */}
        <div className="flex justify-center gap-6 text-white text-xl">
          <a href="#" className="hover:text-gray-300"><FaDiscord /></a>
          <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
