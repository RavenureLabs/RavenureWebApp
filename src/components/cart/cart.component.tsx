'use client';

import { useCartStore } from "@/src/stores/cart.store";
import { useEffect, useState } from "react";

export default function CartComponent() {
  const { toggle } = useCartStore();
  const [visible, setVisible] = useState(false);

  // Sepet ilk açıldığında animasyonu başlat
  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Animasyon bitince toggle et (500ms sonra)
    setTimeout(() => toggle(), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Arka Plan Blur ve Daha Koyu Siyah Katman */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${visible ? 'backdrop-blur-sm bg-black/60' : 'backdrop-blur-none bg-black/0'}`}
        onClick={handleClose}
      />

      {/* Sepet Paneli */}
      <div
        className={`ml-auto h-full w-full sm:w-1/2 bg-white shadow-xl transform transition-transform duration-500 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-7">
          <button
            onClick={handleClose}
            className="relative -top-2 -left-4 cursor-pointer transform hover:scale-120  transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sepet İçeriği */}
        <div className="p-4">
          <h2 className="text-2xl text-center pb-6 text-gray-600">SEPETİM</h2>

          {/* İlk çizgi düzenlemesi */}
          <div className="flex items-center text-gray-400 mb-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          </div>

          {/* Sol ve Sağda uzun çizgiler */}
          <div className="flex items-center gap-8 text-gray-400 mb-4">
            {/* Başlangıçta silik olan, sonunda normal renkli olan çizgi */}
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-gray-600" />
            <span className="text-sm font-bold">For You</span>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-600 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
