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
        {
          referances.map((referance, index) => (
            <ReferanceComponent 
            referance={referance}
            />
          ))
        }
      </div>
    </div>
  );
}
