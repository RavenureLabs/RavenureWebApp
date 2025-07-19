'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { signIn } from 'next-auth/react';
import {
  FaDiscord,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { userService } from '@/src/lib/services';
import { api } from '@/src/lib/api';

export default function RegisterPageComponent() {
  const { text } = useLanguage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState('');

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').substring(0, 10);
    const parts = [];
    if (digits.length > 0) parts.push(digits.substring(0, 3));
    if (digits.length >= 4) parts.push(digits.substring(3, 6));
    if (digits.length >= 7) parts.push(digits.substring(6, 8));
    if (digits.length >= 9) parts.push(digits.substring(8, 10));
    return parts.join(' ');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const isValidPhoneNumber = (phoneStr: string) => {
    const digits = phoneStr.replace(/\D/g, '');
    const phoneNumber = parsePhoneNumberFromString(digits, 'TR');
    return phoneNumber?.isValid() ?? false;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordError('');
    setTermsError('');
    setPhoneError('');

    if (!termsAccepted) {
      setTermsError(text('register.terms-warning'));
      return;
    }

    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
    const rawPhone = phone.replace(/\s/g, '');

    if (password !== confirmPassword) {
      setPasswordError(text('register.password-mismatch'));
      return;
    }

    if (!isValidPhoneNumber(rawPhone)) {
      setPhoneError(text('register.invalid-phone'));
      return;
    }

    /*const res = await userService.register({
      name: "Guest",
      email: email,
      password: password,
      accountType: "email",
      phoneNumber: rawPhone,
      role: "user",
      createdAt: new Date().toISOString(),
      products: [],
      isVerified: true
    })*/

    setLoading(true);

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

          <a
            href="/"
            className="absolute top-4 right-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white border-gray-600 px-4 py-3 rounded-xl transition group"
          >
            <FiArrowLeft size={16} className="transition-all duration-200 ease-in-out group-hover:-translate-x-2" />
            {text('register.back-home')}
          </a>

          <div className="text-center text-2xl font-semibold text-gray-300 flex flex-col items-center justify-center space-y-4">
            <img src="/Ravenure-Logo.png" alt="Logo" className="w-16 h-16 mb-2" />
            <p>{text('register.title')}</p>
            <p className="text-sm text-gray-400 text-center">{text('register.description')}</p>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2 relative">
                <label className="block text-base text-gray-300">{text('register.password')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    required
                    className={`w-full bg-[#1a1a1a] border rounded-xl py-3 pl-11 pr-10 text-white text-sm placeholder-gray-400 focus:outline-none transition ${
                      passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#139f8b]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="w-1/2 relative">
                <label className="block text-base text-gray-300">{text('register.confirm-password')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    required
                    className={`w-full bg-[#1a1a1a] border rounded-xl py-3 pl-11 pr-10 text-white text-sm placeholder-gray-400 focus:outline-none transition ${
                      passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#139f8b]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition cursor-pointer"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>

            <div className="relative">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none ${
                phoneError ? 'text-red-500' : 'text-gray-500'
              }`}>
                <FaPhone />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="555 *** ** **"
                required
                inputMode="numeric"
                pattern="[0-9\s]*"
                maxLength={13}
                value={phone}
                onChange={handlePhoneChange}
                className={`w-full bg-[#1a1a1a] border rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#139f8b] transition ${
                  phoneError ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-[#139f8b]'
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-[20px] h-[20px]">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted(!termsAccepted);
                    if (termsError) setTermsError('');
                  }}
                  className={`w-full h-full appearance-none border-[1.5px] rounded flex items-center justify-center
                    checked:before:content-['✔'] checked:before:text-gray-500 checked:before:text-[15px]
                    checked:before:absolute checked:before:top-1/2 checked:before:left-1/2
                    checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                    transition ${
                      termsError ? 'border-red-500 focus:border-red-500' : 'border-gray-500'
                    }`}
                />
              </div>
              <label
            htmlFor="terms"
            className={`text-sm leading-[30px] select-none ${
              termsError ? 'text-red-500' : 'text-gray-300'
            }`}
          >
            <a href="/terms" className="text-[#139f8b] no-underline hover:underline">
              {text('register.terms')}
            </a>{' '}
            {text('register.and')} {' '}
            <a href="/privacy" className="text-[#139f8b] no-underline hover:underline">
              {text('register.privacy')} {' '}
            </a> 
            {text('register.agree')}
          </label>

            </div>
            {termsError && <p className="text-red-500 text-sm mt-1">{termsError}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full group relative flex items-center justify-center gap-2 bg-white text-[#0f0f10] font-semibold py-4 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="transition-all duration-300 ease-in-out transform group-hover:-translate-x-3">
                {loading ? 'Kayıt oluyor...' : text('register.create-account')}
              </span>
              {!loading && (
                <FiArrowRight
                  size={20}
                  className="opacity-0 scale-75 -translate-x-1 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-3 transform transition-all duration-300 ease-in-out"
                />
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400">
            {text('register.have-account')}{' '}
            <a href="/login" className="text-blue-400 hover:underline">{text('register.login')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
