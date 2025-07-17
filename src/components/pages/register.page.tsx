'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function RegisterPageComponent() {
  const { text } = useLanguage();
  const router = useRouter();

  const handleRegister = async () => {
    // API isteği yapılabilir
    router.push('/dash'); // Kayıt sonrası yönlendirme
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0f0f10] via-[#1a1a1c] to-[#0f0f10] text-white relative overflow-hidden">
      {/* Arka plan efekti */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0e786a]/10 via-[#0f0f10]/20 to-[#0e786a]/10 animate-pulse z-0 pointer-events-none" />

      {/* Form Alanı */}
      <div className="w-full flex justify-center items-center px-4 z-10">
        <div className="w-full max-w-xl space-y-8 bg-[#1a1a1c]/60 rounded-2xl p-10 backdrop-blur-xl shadow-xl relative">
          
          {/* Geri Dön Butonu */}
          <a
            href="/"
            className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white border-gray-600 px-4 py-3 rounded-xl transition group"
          >
            <FiArrowLeft size={16} className="transition-all duration-200 ease-in-out group-hover:translate-x-[-10px]" />
            {text('login.back-home')}
          </a>

          {/* Başlık */}
          <div className="text-center text-2xl font-semibold text-gray-300 flex flex-col items-center justify-center space-y-4">
            <img src="/Ravenure-Logo.png" alt="Logo" className="w-16 h-16 mb-2" />
            <p>Hesap Oluştur</p>
            <p className="text-sm text-gray-400 text-center">Devam etmek için formu doldurun.</p>
          </div>

          {/* Form Alanları */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-base text-gray-300">{text('login.email')}</label>
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
                <label className="block text-base text-gray-300">Şifre</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base text-gray-300">Şifre Tekrar</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
            </div>

            {/* Telefon En Alta */}
            <div>
              <label className="block text-base text-gray-300">Telefon Numarası</label>
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
              {text('login.create-account')}
            </span>
          </button>

          {/* Giriş Linki */}
          <p className="text-sm text-center text-gray-400">
            Zaten bir hesabınız var mı?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Giriş Yap
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
