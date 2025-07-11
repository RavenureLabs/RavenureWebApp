'use client';

import { FaDiscord } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';

export default function LoginPageComponent() {
  return (
    <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md space-y-6">
   
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Ravenure'a Giriş Yap</h1>
          <p className="text-gray-400">Devam etmek için giriş yapmalısınız.</p>
        </div>
 
        <a
        href="/api/auth/discord"
        className="w-full flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] cursor-pointer transition-all duration-200 text-white font-medium py-3 border-2 border-transparent rounded-xl group"
        >
        <span className="transform group-hover:-translate-x-1 transition duration-200">
            <FaDiscord size={20} />
        </span>
        <span className="transform group-hover:translate-x-1 transition duration-200">
            Discord ile giriş yap
        </span>
        </a>

 
        <div className="flex items-center gap-4 text-gray-500">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-600" />
        <span className="text-sm font-bold">VEYA</span>
        <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent" />
        </div>
 
<div className="space-y-2">
  <label className="text-base text-gray-400">EMAIL ve ŞİFRE</label>

  <div className="mt-2 relative">
  <input
    name="email"
    type="email"
    id="email"
    placeholder="you@ravenure.com"
    required
    value=""
    className="form-control pl-14 rounded-b-none focus:relative focus:z-20"
  />
  <svg
    className="absolute stroke-slate-600 top-0 left-5 w-5 h-full z-30"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
</div>

</div>






<button className="w-full group relative flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-xl hover:scale-105 transition overflow-hidden cursor-pointer">
 
  <span className="flex items-center transition-all duration-200 ease-in-out group-hover:opacity-0 group-hover:scale-75 group-hover:-translate-x-4">
    <FiLogIn size={18} />
  </span>
 
  <span className="flex items-center transition-all duration-200 ease-in-out group-hover:-translate-x-3">
    Giriş Yap
  </span>
 
  <span className="flex items-center transition-all duration-200 ease-in-out opacity-0 scale-75 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0">
    <FiArrowRight size={18} />
  </span>
</button>


        <p className="text-center text-sm text-gray-400">
          Hesabınız yok mu?{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Hesap Oluştur
          </a>
        </p>
      </div>
    </div>
  );
}
