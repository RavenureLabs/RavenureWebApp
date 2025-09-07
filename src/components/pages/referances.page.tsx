'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { referanceService } from '@/src/lib/services';
import { ReferanceType } from '@/src/models/referance.model';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export default function ReferencesPageComponent() {
  const [refs, setRefs] = React.useState<ReferanceType[]>([]);
  const { text } = useLanguage();

  React.useEffect(() => {
    const fetch = async () => {
      const res = await referanceService.getReferances();
      setRefs(res);
    }
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0e11] text-white">
      {/* HERO — store ile aynı düzen/duygu */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_-10%,#1a4636_0%,#0c0e11_45%)] opacity-70 pointer-events-none" />
        <div className="absolute inset-x-0 -top-24 h-48 blur-3xl bg-gradient-to-r from-[#25d17044] via-transparent to-[#139f8b44]" />
        <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-10 md:pt-20 md:pb-16 text-left">
          <div className="inline-flex items-center gap-2 text-xs text-[#9fe9c9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d170]" /> {text('referances.page-title')} 
          </div>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#25d170] to-[#139f8b]">
              {text('referances.title')}
            </span>
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl text-left">
            {text('referances.sub-title')}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-5">
          {refs.length > 0 && refs.map((r, i) => (
            <RefCard key={i} item={r} />
          )) || <div className="text-white/70">{text('referances.empty')}</div>
          }
        </div>
      </section>
    </div>
  );
}

/* --------------- Card --------------- */
function RefCard({ item }: { item: ReferanceType }) {
  const { name, url, imageUrl } = item;

  return (
    <div
      className="
        relative flex flex-col items-center justify-between
        rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        overflow-hidden min-h-[340px] p-10
      "
    >
      {/* Logo ortada */}
      <div className="h-28 w-28 rounded-2xl bg-white/5 border border-white/10 grid place-items-center overflow-hidden mb-8">
        <img
          src={imageUrl}
          alt={name}
          className="h-16 w-16 object-contain opacity-90"
        />
      </div>

      {/* İsim & Domain */}
      <div className="text-center flex flex-col items-center gap-1 mb-10">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-sm text-white/65">{url}</div>
      </div>

      <div className="absolute bottom-6 right-6">
        <a
          href={url || '#'}
          target={url ? '_blank' : undefined}
          rel={url ? 'noopener noreferrer' : undefined}
          className="h-12 w-12 rounded-full border border-white/15 bg-white/[0.05]
                     grid place-items-center transition-transform duration-300
                     hover:translate-x-2"
          aria-label="Git"
        >
          <ArrowRight className="h-5 w-5 text-white/85" />
        </a>
      </div>
    </div>
  );
}
