'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { signIn } from 'next-auth/react';
import { FaDiscord, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NotificationComponent, { NotificationComponentProps } from '../notification/notification.component';

export default function RegisterPageComponent() {
  const { text } = useLanguage();
  const router = useRouter();
  const [notification, setNotification] = useState<NotificationComponentProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termsAccepted) {
      setNotification({ iconPath: 'https://img.icons8.com/ios/50/error--v1.png', message: 'Kullanım sözlesmesini kabul etmelisiniz.' });
      setTimeout(() => {
        setNotification(null);
      },3000)
      return;
    }

    setLoading(true);

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setNotification({ iconPath: 'https://img.icons8.com/ios/50/error--v1.png', message: 'Sifreler uyusmuyor.' });
      setTimeout(() => {
        setNotification(null);
      },3000)
      setLoading(false);
      return;
    }

    // TODO: Kayıt işlemi (API çağrısı vs)
    router.push('/dash');
  };

  const handleLoginWithDiscord = async () => {
    signIn('discord', { callbackUrl: '/dash' });
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#0f0f10] via-[#1a1a1c] to-[#0f0f10] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0e786a]/10 via-[#0f0f10]/20 to-[#0e786a]/10 animate-pulse z-0 pointer-events-none" />
      {notification && <NotificationComponent {...notification} />}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-base text-gray-300">{text('register.email')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@ravenure.com"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
            </div>

            {/* Şifre ve Tekrar */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-base text-gray-300">{text('register.password')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-base text-gray-300">{text('register.confirm-password')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                  />
                </div>
              </div>
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-base text-gray-300">{text('register.phone')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="5xxxxxxxxx"
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  onInput={(e) => {
                    const input = e.currentTarget;
                    input.value = input.value.replace(/[^0-9]/g, '');
                  }}
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
            </div>

            {/* Checkbox */}
      {/* Checkbox */}
<div className="flex items-start gap-3">
  <div className="relative w-[30px] h-[30px]">
    <input
      type="checkbox"
      id="terms"
      name="terms"
      checked={termsAccepted}
      onChange={() => setTermsAccepted(!termsAccepted)}
      className="w-full h-full appearance-none border-2 border-gray-500 rounded flex items-center justify-center
        checked:before:content-['✔'] checked:before:text-gray-500 checked:before:text-[20px]
        checked:before:absolute checked:before:top-1/2 checked:before:left-1/2
        checked:before:-translate-x-1/2 checked:before:-translate-y-1/2"
    />
  </div>
  <label htmlFor="terms" className="text-sm text-gray-300 leading-[30px]">
    I agree to the{' '}
    <a href="#" className="text-[#139f8b] no-underline hover:underline">
      Terms of service
    </a>{' '}
    and{' '}
    <a href="#" className="text-[#139f8b] no-underline hover:underline">
      Privacy Policy
    </a>.
  </label>
</div>





            {/* Kayıt Butonu */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full group relative flex items-center justify-center gap-2 bg-white text-[#0f0f10] font-semibold py-4 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="transition-all duration-200 ease-in-out group-hover:scale-90 group-hover:translate-x-[-6px]">
                {loading ? 'Kayıt oluyor...' : text('register.create-account')}
              </span>
            </button>
          </form>

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
