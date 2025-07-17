'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { FiLogIn, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

export default function LoginPageComponent() {
  const { text } = useLanguage();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      window.location.href = '/dash';
    }
  }, []);

  const handleLoginCredentials = async () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const res = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: false,
    });

    if (res?.ok) {
      window.location.href = '/dash';
    }
  };

  const handleLoginWithDiscord = async () => {
    signIn('discord', { callbackUrl: '/dash' });
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0f0f10] via-[#1a1a1c] to-[#0f0f10] text-white relative overflow-hidden">
      {/* Arka plan efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0e786a]/10 via-[#0f0f10]/20 to-[#0e786a]/10 animate-pulse z-0 pointer-events-none" />

      {/* Sol Kısım - Form */}
      <div className="w-full flex justify-center items-center px-4 z-10">
        <div className="w-full max-w-xl space-y-8 bg-[#1a1a1c]/60 rounded-2xl p-10 backdrop-blur-xl shadow-xl">
          {/* Geri Butonu Sağ Üst Köşede */}
          <a
            href="/" 
            className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white border-gray-600 px-4 py-3 rounded-xl transition group"
          >
            <FiArrowLeft size={16} className="transition-all duration-200 ease-in-out group-hover:translate-x-[-10px]" />
            {text('login.back-home')}
          </a>

          {/* Logo ve Yazı */}
          <div className="text-center text-2xl font-semibold text-gray-300 flex flex-col items-center justify-center space-y-4">
            {/* Burada Logo Ekliyoruz */}
            <img 
              src="/Ravenure-Logo.png" 
              alt="Logo" 
              className="w-16 h-16 mb-2" // Logo boyutları
            />
            <p>Ravenure Labs'a Hoşgeldiniz</p>
            <p className="text-sm text-gray-400 text-center">Devam etmek için giriş yapmalısınız.</p>
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
              {text('login.login-with-discord')}
            </span>
          </a>

          {/* Ayraç */}
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-600" />
            <span className="text-sm font-bold">{text('login.or')}</span>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent" />
          </div>

          {/* Form Alanı */}
          <div className="space-y-4">
            <label className="block text-base text-gray-300">{text('login.mail-and-password')}</label>

            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@ravenure.com"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
              />
              <svg
                className="absolute top-1/2 left-4 w-5 h-5 text-gray-500 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
              />
              <svg
                className="absolute top-1/2 left-4 w-5 h-5 text-gray-500 transform -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
                {text('login.forgot-password')}
              </a>
            </div>
          </div>

          {/* Giriş Butonu */}
          <button
            onClick={handleLoginCredentials}
            className="w-full group relative flex items-center justify-center gap-2 bg-white text-[#0f0f10] font-semibold py-4 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer"
          >
            <span className="flex items-center transition-all duration-200 ease-in-out group-hover:opacity-0 group-hover:scale-75 group-hover:-translate-x-4">
              <FiLogIn size={20} />
            </span>
            <span className="flex items-center transition-all duration-200 ease-in-out group-hover:-translate-x-5">
              {text('login.login')}
            </span>
            <span className="flex items-center transition-all duration-200 ease-in-out opacity-0 scale-75 translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-3">
              <FiArrowRight size={20} className="group-hover:translate-x-[-10px]" />
            </span>
          </button>

          {/* Kayıt Linki */}
          <p className="text-sm text-center text-gray-400">
            {text('login.dont-have-account')}{' '}
            <a href="/register" className="text-blue-400 hover:underline">
              {text('login.create-account')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
