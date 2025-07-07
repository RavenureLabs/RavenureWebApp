'use client';

import { ArrowRight } from 'lucide-react';

export default function ReferencesPageComponent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-[#25d170] to-[#139f8b] bg-clip-text text-transparent">
          Bizleri Tercih Edenler
        </h1>
        <p className="text-gray-400 text-base">
          Ravenure ile sunucularına güç katan bazı projeler
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {/* Referans 1 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition">
          <img src="/Ravenure-Logo.png" alt="Mythonia" className="w-16 h-16 object-contain mb-4" />
          <h3 className="text-xl font-semibold text-white">Ravenure</h3>
        </div>

        {/* Referans 2 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition">
          <img src="/Ravenure-Logo.png" alt="SkyForge" className="w-16 h-16 object-contain mb-4" />
          <h3 className="text-xl font-semibold text-white">Ravenure</h3>
        </div>

        {/* Referans 3 */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center text-center hover:scale-[1.02] transition">
          <img src="/Ravenure-Logo.png" alt="BlockRealm" className="w-16 h-16 object-contain mb-4" />
          <h3 className="text-xl font-semibold text-white">Ravenure</h3>
        </div>
      </div>
    </div>
  );
}
