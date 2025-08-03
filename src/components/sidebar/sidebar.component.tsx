'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCreditCard, FiHome, FiKey, FiSettings, FiUser, FiUsers } from "react-icons/fi";


export default function SidebarComponent() {
    const { data: session, status } = useSession();
    const role = (session?.user as any)?.role;
    return (
        <aside className="w-full md:w-[360px] min-h-[90vh] bg-transparent rounded-3xl border border-gray-600 flex flex-col items-center overflow-hidden">
            <div className="w-full relative">
            <div className="h-24 w-full rounded-3xl overflow-hidden relative shadow-xl">
                <img
                src="/profile-bg.jpg"
                alt="Profil Kapak"
                className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
            <div className="absolute top-8 left-[20%] transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-600 shadow-md">
                <img
                    src={session?.user?.image || '/default-avatar.png'}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                />
                </div>
            </div>
            <div className="mt-8 w-full px-8 pb-5 pt-3 flex items-center justify-between">
                <h2 className="font-semibold text-xl bg-gradient-to-r from-[#25d170] to-[#139f8b] bg-clip-text text-transparent">
                {formatName(session?.user?.name || '')}
                </h2>
                <div className="inline-block bg-gradient-to-tl from-[#25d170] via-transparent to-[#139f8b] p-px rounded-xl">
                <div className="bg-gradient-to-b from-[#09080a] to-[#171717] rounded-xl px-2 py-1 text-base font-medium md:text-lg lg:text-xl lg:leading-tight flex items-center justify-center text-center">
                    <span className="text-gray-300 font-medium text-sm">
                    {role === 'admin' ? 'Yönetici' : 'Kullanıcı'}
                    </span>
                </div>
                </div>
            </div>
            </div>

            <div className="w-full h-[1px] bg-gray-600" />

            <nav
            className="space-y-5 w-full px-4 pt-6 pb-4 overflow-y-auto text-sm"
            style={{ maxHeight: '55vh' }}
            >
            <div className="space-y-4">
                <NavItem slug='profile' label="Profilim" />
                <NavItem slug='licenses' label="Lisanslarım" />
                <NavItem slug='orders' label="Satın Alım Geçmişi" />
                <NavItem slug='reset-password' label="Şifre Değiştir" />
                {role === 'admin' && (
                <NavItem slug='admin-dashboard' label="Yönetici Panel" />
                )
                }
            </div>
            </nav>

            <div className="w-full flex justify-center mt-64 gap-12 px-6">
            <button
                onClick={() => window.location.href = '/'}
                className="group w-28 h-14 text-sm flex items-center gap-1 justify-center rounded-xl text-gray-300 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-x-1 cursor-pointer"
            >
                <FiArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-2" />
                Geri Dön
            </button>

            <button
                onClick={async () => {
                    await signOut();
                    window.location.href = '/';
                }}
                className="group w-28 text-sm h-14 flex items-center justify-center gap-1 rounded-xl text-red-500 hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-1 cursor-pointer"
            >
                Çıkış Yap
                <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
            </button>
            </div>

            <div className="w-full text-center text-xs text-gray-400 select-none px-4 py-4 mt-auto">
            Copyright © 2025 Ravenure Labs – All rights reserved
            </div>
        </aside>
    )
}

function NavItem({ label, active = false, slug }: { label: string; active?: boolean, slug?: string }) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if(slug === "profile") window.location.href = '/dash';
        else if(slug === "admin-dashboard") window.location.href = '/admin-dashboard';
        else window.location.href = '/dash/' + slug;
      }}
      className={`w-full h-10 flex items-center gap-2 text-sm cursor-pointer px-4 py-2 rounded-2xl border-l-6 border-transparent transform transition-all duration-300
        ${
          active
            ? 'text-purple-400 font-semibold border-purple-400'
            : 'text-gray-300 hover:bg-gray-800 hover:border-gray-600 hover:translate-x-2'
        }`}
    >
      {getIconByLabel(label)}
      {label}
    </div>
  );
}

function formatName(name: string) {
  return name
    .split(' ')
    .map(
      (part) =>
        part.charAt(0).toLocaleUpperCase('tr-TR') +
        part.slice(1).toLocaleLowerCase('tr-TR')
    )
    .join(' ');
}

function getIconByLabel(label: string) {
  switch (label) {
    case 'Profilim':
      return <FiUser className="text-purple-400 w-5 h-5" />;
    case 'Lisanslarım':
      return <FiBookOpen className="text-green-400 w-5 h-5" />;
    case 'Satın Alım Geçmişi':
      return <FiCreditCard className="text-yellow-400 w-5 h-5" />;
    case 'Şifre Değiştir':
      return <FiKey className="text-red-400 w-5 h-5" />;
    case 'Ana Sayfa':
      return <FiHome className="text-blue-400 w-5 h-5" />;
    case 'Yönetici Panel':
      return <FiSettings className="text-pink-400 w-5 h-5" />;
    default:
      return null;
  }
}