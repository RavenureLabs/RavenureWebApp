'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function RegisterPageComponent() {
  const { text } = useLanguage();
  const router = useRouter();

  const handleRegister = async () => {
    router.push('/dash');
  };

  const handleLoginWithDiscord = async () => {
    signIn('discord', { callbackUrl: '/dash' });
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0f0f10] via-[#1a1a1c] to-[#0f0f10] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0e786a]/10 via-[#0f0f10]/20 to-[#0e786a]/10 animate-pulse z-0 pointer-events-none" />

      <div className="w-full flex justify-center items-center px-4 z-10">
        <div className="w-full max-w-xl space-y-8 bg-[#1a1a1c]/60 rounded-2xl p-10 backdrop-blur-xl shadow-xl relative">

          {/* Geri Dön Butonu */}
          <a
            href="/"
            className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white border-gray-600 px-4 py-3 rounded-xl transition group"
          >
            <FiArrowLeft size={16} className="transition-all duration-200 ease-in-out group-hover:translate-x-[-10px]" />
            {text('register.back-home')}
          </a>

          {/* Başlık */}
          <div className="text-center text-2xl font-semibold text-gray-300 flex flex-col items-center justify-center space-y-4">
            <img src="/Ravenure-Logo.png" alt="Logo" className="w-16 h-16 mb-2" />
            <p>{text('register.title')}</p>
            <p className="text-sm text-gray-400 text-center">{text('register.description')}</p>
          </div>

          {/* Discord ile Giriş */}
          <a
            onClick={handleLoginWithDiscord}
            className="w-full relative overflow-hidden flex items-center justify-center bg-[#5865F2] hover:bg-[#4752c4] transition-all duration-300 text-white font-medium py-3 rounded-xl group cursor-pointer"
          >
            <span className="absolute opacity-0 group-hover:opacity-100 -top-10 group-hover:top-3 transition-all duration-300 ease-in-out">
              <FaDiscord size={20} />
            </span>
            <span className="transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
              {text('register.login-with-discord')}
            </span>
          </a>

          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-600" />
            <span className="text-sm font-bold">{text('login.or')}</span>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent" />
          </div>

          {/* Form Alanları */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-base text-gray-300">{text('register.email')}</label>
              <input
                type="email"
                name="email"
                placeholder="you@ravenure.com"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
              />
            </div>

            {/* Şifre ve Tekrar */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-base text-gray-300">{text('register.password')}</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base text-gray-300">{text('register.confirm-password')}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-base text-gray-300">{text('register.phone')}</label>
              <input
                type="tel"
                name="phone"
                placeholder="+90 5xx xxx xx xx"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
              />
            </div>
          </div>

          {/* Kayıt Butonu */}
          <button
            onClick={handleRegister}
            className="w-full group relative flex items-center justify-center gap-2 bg-white text-[#0f0f10] font-semibold py-4 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer"
          >
            <span className="transition-all duration-200 ease-in-out group-hover:scale-90 group-hover:translate-x-[-6px]">
              {text('register.create-account')}
            </span>
          </button>

          {/* Giriş Linki */}
          <p className="text-sm text-center text-gray-400">
            {text('register.have-account')}{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              {text('register.login')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
