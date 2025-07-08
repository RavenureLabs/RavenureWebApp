'use client';

import { referanceService } from '@/src/lib/services';
import { ReferanceType } from '@/src/models/referance.model';
import { useEffect, useState } from 'react';
import ReferanceComponent from '../referance/referance.component';

export default function ReferencesPageComponent() {
  const [referances, setReferances] = useState<ReferanceType[]>([]);

  useEffect(() => {
    const fetchReferances = async () => {
      const referances = await referanceService.getReferances();
      setReferances(referances);
    };
    fetchReferances();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f10] px-6 pt-28 pb-20">
      
      {/* Başlık */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Bize Güvenen Oyun Sunucuları
        </h1>
        <p className="text-lg text-gray-400">
          LeaderOS altyapısını kullanan seçkin oyun sunucularından bazıları.
        </p>
      </div>
      {/* Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Kart 1 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Kart 2 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Provanas" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Provanas</h3>
            <p className="text-sm text-gray-400">provanas.com</p>
          </div>
          <a
            href="https://provanas.com"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Kart 3 */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="CrageNetwork" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">CrageNetwork</h3>
            <p className="text-sm text-gray-400">cragenetwork.com</p>
          </div>
          <a
            href="https://cragenetwork.com"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative">
          <img src="/Ravenure-Logo.png" alt="Ravenure" className="h-20 w-auto object-contain mb-6" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">Ravenure</h3>
            <p className="text-sm text-gray-400">ravenure.net</p>
          </div>
          <a
            href="https://ravenure.net"
            target="_blank"
            className="absolute bottom-4 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-transform duration-300 hover:bg-white/10 hover:translate-x-3"
          >
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
