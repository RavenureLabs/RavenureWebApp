'use client';

import { FaDiscord } from 'react-icons/fa';
import { FiLogIn, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function LoginPageComponent() {
  return (
    <div className="min-h-screen flex bg-[#0f0f10] text-white relative overflow-hidden">
      {/* Sol Kısım - Form */}
      <div className="w-full md:w-1/2 flex justify-center px-2 z-10 relative">
        <div className="w-full max-w-md translate-y-40 space-y-8">
          {/* Logo ve Geri Butonu */}
          <div className="flex justify-between items-center">
            <img src="/Ravenure-Logo.png" alt="Ravenure Logo" className="w-14 h-auto" />
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border-gray-700 px-4 py-2 rounded-xl transition group"
            >
              <span className="transform transition-all duration-200 group-hover:-translate-x-2">
                <FiArrowLeft size={16} />
              </span>
              Ana Sayfa'ya dön
            </a>
          </div>
          {/* Discord ile Giriş */}
          <a
            href="/api/auth/discord"
            className="w-full flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-200 text-white font-medium py-3 rounded-xl group"
          >
            <span className="transform group-hover:-translate-x-1 transition duration-200">
              <FaDiscord size={20} />
            </span>
            <span className="transform group-hover:translate-x-1 transition duration-200">
              Discord ile giriş yap
            </span>
          </a>

          {/* Ayraç */}
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-600" />
            <span className="text-sm font-bold">VEYA</span>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent" />
          </div>

          {/* E-Posta ve Şifre */}
          <div className="space-y-4">
            <label className="block text-base text-gray-400">E-Posta ve Şifre</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="you@ravenure.com"
                required
                className="w-full bg-[#1a1a1d] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2] transition"
              />
              <svg className="absolute top-1/2 left-4 w-5 h-5 text-gray-500 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-[#1a1a1d] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#5865F2] transition"
              />
              <svg className="absolute top-1/2 left-4 w-5 h-5 text-gray-500 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                Şifremi Unuttum?
              </a>
            </div>
          </div>

          {/* Giriş Butonu */}
          <button className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-semibold py-4 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer">
            <span className="flex items-center transition-all duration-200 ease-in-out group-hover:opacity-0 group-hover:scale-75 group-hover:-translate-x-4">
              <FiLogIn size={20} />
            </span>
            <span className="flex items-center transition-all duration-200 ease-in-out group-hover:-translate-x-5">
              Giriş Yap
            </span>
            <span className="flex items-center transition-all duration-200 ease-in-out opacity-0 scale-75 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-3">
              <FiArrowRight size={20} />
            </span>
          </button>

          {/* Kayıt Linki */}
          <p className="text-sm text-center text-gray-400">
            Hesabınız yok mu?{' '}
            <a href="/register" className="text-blue-400 text-center hover:underline">
              Hesap Oluştur
            </a>
          </p>
        </div>
      </div>

      {/* Sağ Kısım - Görsel */}
      <div className="hidden md:block w-1/2 h-[104vh] relative">
        <img
          src="/storewall.jpg"
          alt="Login Right Background"
          className="w-full h-full object-cover object-center z-0 absolute"
        />

        {/* Blur arka plan */}
        <div className="absolute w-[800px] h-[1800px] left-[-295px] top-[-15rem] bg-[#0f0f10] [filter:blur(100px)]"></div>
      </div>
    </div>
  );
}
