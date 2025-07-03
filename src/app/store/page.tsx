'use client';

import { useLanguage } from '@/src/hooks/uselanguage.hooks';

export default function ShopPage() {
  const { text } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white flex flex-col items-center">
      {/* Hero Section */}
      <section
        className="w-full py-22 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/storewall.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#25d170] text-left">
            {text("store.hero-title")}
          </h1>
        </div>
      </section>

      {/* Ürünler Bölümü */}
      <section id="products" className="w-full max-w-screen-xl px-4 py-12">
        <h2 className="text-3xl md:text-3xl font-bold text-left mb-12">{text("store.categories")}</h2>
        
        <p className="text-left text-sm mb-12 text-white">
            <strong>{text("store.looking for something?")}</strong> {text("store.looking for something?-2")}
        </p>

        <div className="flex flex-wrap gap-4 mb-14">
        <a href="/store/all?tag=all" className="relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300">
            <span className="relative z-10">{text("store.categories-1")}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
        </a>

        <a href="/store/all?tag=plugins" className="relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300">
            <span className="relative z-10">{text("store.categories-2")}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
        </a>

        <a href="/store/all?tag=plugin-packs" className="relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300">
            <span className="relative z-10">{text("store.categories-3")}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
        </a>

        <a href="/store/all?tag=discord-bots" className="relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300">
            <span className="relative z-10">{text("store.categories-4")}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
        </a>
     </div>


        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Ürün Kartı */}
          <div className="bg-[#111112] border border-gray-700 rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
            <div className="relative overflow-hidden">
              <img
                src="/embed.avif"
                alt="Ravenure Ticket Bot"
                className="w-full h-[220px] object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-2 right-2 bg-white/90 px-3 py-1 rounded-xl shadow text-sm font-bold text-[#25d170] flex items-center gap-2">
                ₺99,00 <span className="text-gray-400 line-through text-xs">₺119,00</span>
              </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <h3 className="text-xl font-bold text-[#25d170] mb-1 hover:underline cursor-pointer">
                Ravenure Ticket Bot
              </h3>
              <span className="inline-flex items-center gap-1 bg-gray-800/50 text-xs px-2 py-1 rounded mb-3">
                <span className="bg-gradient-to-l from-[#25d170] to-[#139f8b] bg-clip-text text-transparent font-semibold">
                  Omerfsarrac
                </span>
                <span className="text-gray-400">• Discord Bot</span>
              </span>
              <p className="text-sm text-gray-400 mb-4">
                Gelişmiş bilet sistemi, kolay yönetim paneli ve daha fazlası.
              </p>
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1 text-teal-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z" />
                  </svg>
                  <span className="text-gray-300">4.8</span>
                  <span className="text-gray-500">(11 oylama)</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-teal-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                    />
                  </svg>
                  <span className="text-gray-300">853 Satış</span>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="/store/product/1"
                  className="w-1/2 text-center px-4 py-2 bg-[#25d170] text-black text-sm font-bold rounded-xl hover:bg-[#139f8b] transition"
                >
                  Satın Al
                </a>
                <a
                  href="/product-detail/1"
                  className="w-1/2 text-center px-4 py-2 border border-[#25d170] text-[#25d170] text-sm font-bold rounded-xl hover:bg-[#25d170]/10 transition"
                >
                  İncele
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Müşteri Yorumu */}
      <section className="w-full max-w-screen-md text-center py-16 px-4">
        <h3 className="text-2xl font-bold mb-4">Müşterilerimiz Ne Diyor?</h3>
        <p className="text-gray-400 italic max-w-xl mx-auto mb-4">
          “Ravenure botları sayesinde sunucumuzu bambaşka bir seviyeye taşıdık. Destek ekibi harika ve ürünler çok kaliteli!”
        </p>
        <span className="text-[#25d170] font-semibold">— Discord Sunucu Sahibi</span>
      </section>
    </div>
  );
}
