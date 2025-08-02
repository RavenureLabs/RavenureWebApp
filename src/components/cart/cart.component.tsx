'use client';

import { useCartStore } from '@/src/stores/cart.store';
import { useEffect, useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function CartComponent() {
  const { isOpen, toggle } = useCartStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      document.body.style.overflow = 'hidden';
    } else {
      setAnimate(false);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      toggle();
    }, 500);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 0.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!isOpen && !animate) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Arka Plan Blur */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Sepet Paneli */}
      <div
        className={`
          ml-auto h-full w-full sm:w-[640px] bg-gradient-to-br from-[#09080a] to-[#171717]
          backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col rounded-l-2xl overflow-hidden
          transform transition-transform duration-500 ease-in-out
          ${animate ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Başlık */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 text-white">
          <h2 className="text-lg font-semibold">Sepetim</h2>
          <span className="text-xs absolute  left-26">( 3 Eşya )</span>
          <button
            onClick={handleClose}
            aria-label="Kapat"
            className="text-gray-300 cursor-pointer hover:text-red-600 hover:scale-110 duration-200 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content (Ürünler + Sizin İçin) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-white space-y-6 divide-y divide-white/10">
          {/* Ürünler */}
          <div className="space-y-6 pb-6">
            {/* Ürün 1 */}
            <div className="pt-0 flex items-center gap-4 group ml-3">
              <img
                src="/Product Thumbnail Ticket bot.png"
                alt="Throwback Hip Bag"
                className="w-20 h-20 object-cover rounded-lg"  // Büyüttüm
              />
              <div className="flex-1 flex flex-col ml-2">
                <h4 className="text-sm font-medium mb-2">Ravenure RGuilds</h4>
                <div className="flex items-center gap-3">
                  <p className="text-xs line-through text-red-400/70">$120.00</p>
                  <p className="text-sm font-medium text-white">$90.00</p>
                </div>
              </div>
              <button className="transition cursor-pointer">
                <FiTrash2 className="text-gray-400 hover:text-red-600 w-5 h-5 hover:scale-110 transition-all duration-200 mr-3" />
              </button>
            </div>

            {/* Ürün 2 */}
            <div className="flex items-center gap-4 group ml-3">
              <img
                src="/Product Thumbnail Ticket bot.png"
                alt="Medium Stuff Satchel"
                className="w-20 h-20 object-cover rounded-lg"  // Büyüttüm
              />
              <div className="flex-1 flex flex-col ml-2">
                <h4 className="text-sm font-medium mb-2">Ravenure Ticket Bot</h4>
                <div className="flex items-center gap-3">
                  <p className="text-xs line-through text-red-400/70">$50.00</p>
                  <p className="text-sm font-medium text-white">$32.00</p>
                </div>
              </div>
              <button className="transition cursor-pointer">
                <FiTrash2 className="text-gray-400 hover:text-red-600 w-5 h-5 hover:scale-110 transition-all duration-200 mr-3" />
              </button>
            </div>

            {/* Ürün 3 */}
            <div className="flex items-center gap-4 group ml-3">
              <img
                src="/Product Thumbnail Ticket bot.png"
                alt="Zip Tote Basket"
                className="w-20 h-20 object-cover rounded-lg"  // Büyüttüm
              />
              <div className="flex-1 flex flex-col ml-2">
                <h4 className="text-sm font-medium mb-2">Ravenure RBlackShop</h4>
                <div className="flex items-center gap-3">
                  <p className="text-xs line-through  text-red-400/70">$160.00</p>
                  <p className="text-sm font-medium text-white">$140.00</p>
                </div>
              </div>
              <button className="transition cursor-pointer mr-3">
                <FiTrash2 className="text-gray-400 hover:text-red-600 w-5 h-5 hover:scale-110 transition-all duration-200" />
              </button>
            </div>
          </div>

          {/* Sizin İçin Bölümü */}
          <div className="pt-6 pb-4">
            <h3 className="text-md font-semibold mb-3">Sizin İçin</h3>
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex gap-4 overflow-x-auto cursor-default scrollbar-hide"
              style={{ scrollbarWidth: 'none', paddingLeft: '0.5rem' }}
            >
              <div className="w-[140px] bg-transparent p-2 rounded-lg cursor-default transition flex flex-col items-center"> {/* Küçülttüm */}
                <div className="w-full aspect-square overflow-hidden rounded-md mb-2 group">
                  <img
                    src="/Product Thumbnail Ticket bot.png"
                    alt="Ravenure Ticket Bot"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <p className="text-white text-sm font-medium text-center mb-1 truncate">
                  Ravenure Ticket Bot
                </p>
                <div className="flex items-center space-x-0.5 text-purple-500 text-xs mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="flex items-baseline justify-end w-full px-1 mb-2">
                  <p className="text-xs text-gray-400 line-through mr-1">€19,99</p>
                  <p className="text-white font-semibold text-sm">€15,99</p>
                </div>
                <button className="w-full bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white text-sm py-1.5 rounded-full hover:opacity-90 transition cursor-pointer">
                  Hızlı Ekle
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sepet Özeti */}
        <div className="bg-white/10 border-t border-white/10 px-6 py-4 text-white">
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-200 font-semibold">Ara toplam</span>
            <span className="text-lg font-bold text-white">₺262.00</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Vergiler ödeme sırasında hesaplanır.
          </p>
          <button className="w-full py-3 bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white font-semibold rounded-lg hover:opacity-90 transition cursor-pointer">
            Ödeme Yap
          </button>
          <p className="text-center text-xs text-gray-300 mt-5">
            yada{' '}
            <span className="bg-gradient-to-r from-[#25d170] to-[#139f8b] bg-clip-text text-transparent cursor-pointer font-semibold inline-flex items-center">
              Alışverişe Devam Et →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
