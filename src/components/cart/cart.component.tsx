'use client';

import { cartService, productService } from '@/src/lib/services';
import { CartType } from '@/src/models/cart.model';
import { useCartStore } from '@/src/stores/cart.store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CardProductComponent from './cartproduct.component';
import { ProductType } from '@/src/models/product.model';
import ForYouComponent from './foryou.component';
import { FiArrowRight } from 'react-icons/fi';

export default function CartComponent() {
  const { isOpen, toggle } = useCartStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [animate, setAnimate] = useState(false);
  const [cart, setCart] = useState<CartType | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [mostSold, setMostSold] = useState<ProductType[]>([]);

  const formatTRY = (n: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  const calcTotal = async (items: NonNullable<CartType['items']>) => {
    if (!items?.length) return 0;
    const prices = await Promise.all(
      items.map(async (item) => {
        const product = await productService.getProduct(item.productId);
        return (product?.price || 0) * item.quantity;
      })
    );
    return prices.reduce((acc, p) => acc + p, 0);
  };

  const fetchCart = useCallback(async () => {
    if (!session?.user?.email || status !== 'authenticated') return;
    setLoading(true);
    try {
      const [ms, c] = await Promise.all([
        productService.getMostSoldProducts(),
        cartService.getCart(session.user.email as string),
      ]);
      setMostSold(ms ?? []);
      setCart(c ?? null);
      setTotal(await calcTotal(c?.items ?? []));
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email, status]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const refresh = () => fetchCart();

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => toggle(), 300);
  };

  // Drag to scroll (masaüstü)
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
    const walk = (x - startX) * 0.6;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDelete = async (id: string) => {
    // İyimser güncelleme
    setCart((prev) => {
      if (!prev) return prev;
      return { ...prev, items: prev.items.filter((i) => i.productId !== id) };
    });
    try {
      const updatedItems = cart?.items.filter((i) => i.productId !== id) ?? [];
      await cartService.saveCart({ ...(cart || {}), email: session?.user?.email, items: updatedItems });
      setTotal(await calcTotal(updatedItems));
    } catch {
      // hata olursa tekrar yükle
      refresh();
    }
  };

  if (!isOpen && !animate) return null;

  const itemCount = cart?.items?.length ?? 0;
  const isEmpty = !loading && itemCount === 0;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Arka Plan Blur */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Sepet Paneli */}
      <div
        className={`
          ml-auto h-full w-full sm:w-[640px] bg-gradient-to-br from-[#09080a] to-[#171717]
          backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col rounded-l-2xl overflow-hidden
          transform transition-transform duration-300 ease-out
          ${animate ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Başlık */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <h2 id="cart-title" className="text-lg font-semibold">
              Sepetim
            </h2>
            {itemCount > 0 && (
              <span className="text-xs text-white/70">({itemCount} {itemCount > 1 ? 'ürün' : 'ürün'})</span>
            )}
          </div>
          <button
            onClick={handleClose}
            aria-label="Kapat"
            className="text-gray-300 hover:text-red-500 hover:scale-110 duration-150"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-white space-y-6 divide-y divide-white/10">
          {/* Ürünler */}
          <div className="space-y-6 pb-6">
            {loading && (
              <div className="space-y-3">
                <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
              </div>
            )}

            {isEmpty && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <div className="text-sm text-white/80">Sepetiniz boş.</div>
                <button
                  onClick={handleClose}
                  className="mt-3 inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white/10 hover:bg-white/15"
                >
                  Alışverişe Devam Et <FiArrowRight />
                </button>
              </div>
            )}

            {!loading &&
              !isEmpty &&
              cart?.items.map((item) => (
                <CardProductComponent
                  key={item.productId}
                  productId={item.productId}
                  quantity={item.quantity}
                  handleDelete={() => handleDelete(item.productId)}
                />
              ))}
          </div>

          {/* Sizin İçin */}
          {mostSold.length > 0 && (
            <div className="pt-6 pb-4">
              <h3 className="text-md font-semibold mb-3">Sizin İçin</h3>
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`flex gap-4 overflow-x-auto scrollbar-hide select-none ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{ scrollbarWidth: 'none', paddingLeft: '0.5rem' }}
              >
                {mostSold.map(
                  (product) =>
                    !cart?.items.find((it) => it.productId === product._id.toString()) && (
                      <ForYouComponent key={product._id.toString()} refresh={refresh} product={product} />
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sepet Özeti */}
        <div className="bg-white/10 border-t border-white/10 px-6 py-4 text-white">
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-200 font-semibold">Ara toplam</span>
            <span className="text-lg font-bold text-white">{formatTRY(total)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Vergiler ödeme sırasında hesaplanır.</p>
          <button
            disabled={total <= 0}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              total > 0
                ? 'bg-gradient-to-r from-[#25d170] to-[#139f8b] hover:opacity-90 cursor-pointer'
                : 'bg-white/10 text-white/60 cursor-not-allowed'
            }`}
          >
            Ödeme Yap
          </button>
          <p className="text-center text-xs text-gray-300 mt-5">
            ya da{' '}
            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-[#25d170] to-[#139f8b] bg-clip-text text-transparent font-semibold inline-flex items-center gap-1"
            >
              Alışverişe Devam Et <FiArrowRight className="text-base" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
