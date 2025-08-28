'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';

export default function ShopPageComponent() {
  const { text } = useLanguage();

  const categories = ['Tümü', 'Discord Botları', 'Eklentiler', 'Eklenti Paketleri'];

  const products = [
    {
      id: 'p1',
      name: 'Phoenix Crates',
      desc: 'Phoenix Crates is one of the most exclusive and unique crate plugin you can find on the market. With a super customized animation system that allows more than 120...',
      image: '/products/crates.png',
      price: 15.99,
      oldPrice: 19.99,
    },
    {
      id: 'p2',
      name: 'Phoenix Lobby',
      desc: 'Phoenix Lobby is one of the most comprehensive and user-friendly Minecraft lobby plugins available. This plugin combines the best features from multiple lobby plugins...',
      image: '/products/lobby.png',
      price: 15.99,
      oldPrice: 19.99,
    },
  ];

  const fmt = (v: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
    }).format(v);

  return (
    <div className="min-h-screen bg-[#0c0e11] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_-10%,#1a4636_0%,#0c0e11_45%)] opacity-70 pointer-events-none" />
        <div className="absolute inset-x-0 -top-24 h-48 blur-3xl bg-gradient-to-r from-[#25d17044] via-transparent to-[#139f8b44]" />

        <div className="relative max-w-6xl mx-auto px-5 pt-14 pb-10 md:pt-20 md:pb-16">
          {/* breadcrumb */}
          <div className="inline-flex items-center gap-2 text-xs text-[#9fe9c9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d170]" />
            Anasayfa
          </div>

          {/* başlık */}
          <h1 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#25d170] to-[#139f8b]">
              {text('store.hero-title')}
            </span>
          </h1>

          {/* açıklama */}
          <p className="mt-3 text-white/70 max-w-2xl">
            {text('store.looking for something?')}{' '}
            {text('store.looking for something?-2')}
          </p>

          {/* kategoriler */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-[#139f8b] transition cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section className="py-10 md:py-14 -mt-12">
        <div className="max-w-6xl mx-auto px-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-full max-w-[420px] mx-auto text-white relative cursor-pointer hover:opacity-90 transition"
            >
              {/* Görsel */}
              <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-black/20">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Başlık */}
              <h3 className="mt-4 text-[18px] font-semibold leading-tight">
                {p.name}
              </h3>

              {/* Açıklama */}
              <p className="mt-1 text-sm text-white/70 line-clamp-3">{p.desc}</p>

              {/* Fiyat + Buton */}
              <div className="mt-4 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-white/55 line-through">
                    {fmt(p.oldPrice)}
                  </span>
                  <span className="text-2xl font-extrabold">{fmt(p.price)}</span>
                </div>

                {/* GRADIENT SWEEP HOVER — normalde tek renk, hover'da soldan sağa kayan gradient */}
                <button
                  className="
                    relative h-10 px-5 rounded-full text-sm font-semibold text-white
                    bg-[#139f8b] overflow-hidden cursor-pointer
                    transition-colors duration-300 ease-out
                    before:content-[''] before:absolute before:inset-0
                    before:bg-gradient-to-r before:from-[#25d170] before:to-[#139f8b]
                    before:rounded-full before:pointer-events-none
                    before:translate-x-[-100%] hover:before:translate-x-0
                    before:transition-transform before:duration-200 before:ease-in
                    before:will-change-transform
                  "
                >
                  <span className="relative z-[1]">Add to cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
