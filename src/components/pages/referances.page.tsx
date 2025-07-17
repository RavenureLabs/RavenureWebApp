'use client';

import { referanceService } from '@/src/lib/services';
import { ReferanceType } from '@/src/models/referance.model';
import { Suspense, useEffect, useState } from 'react';
import ReferanceComponent from '../referance/referance.component';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';

export default function ReferencesPageComponent() {
  const [referances, setReferances] = useState<ReferanceType[]>([]);
  const {text} = useLanguage();

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
          {text('referances.title')}
        </h1>
        <p className="text-lg text-gray-400">
          {text('referances.sub-title')}
        </p>
      </div>
      {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {
            referances.map((referance) => (
              <ReferanceComponent
                referance={referance}
              />
            ))
          }
        </div>
    </div>
  );
}
