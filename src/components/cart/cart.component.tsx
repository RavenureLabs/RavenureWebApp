'use client';

import { cartService, productService } from '@/src/lib/services';
import { CartType } from '@/src/models/cart.model';
import { useCartStore } from '@/src/stores/cart.store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CardProductComponent from './cartproduct.component';
import { ProductType } from '@/src/models/product.model';
import { FiArrowRight } from 'react-icons/fi';

export default function CartComponent() {
  const { isOpen, toggle } = useCartStore();
  // For horizontal drag (ForYou section)
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [animate, setAnimate] = useState(false);
  const [cart, setCart] = useState<CartType | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [mostSold, setMostSold] = useState<ProductType[]>([]); // şu an kullanılmıyor ama bıraktım

  const formatTRY = (n: number) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(n);

  const calcTotal = async (items: NonNullable<CartType['items']>) => {
    if (!items?.length) return 0;
    const prices = await Promise.all(
      items.map(async (item) => {
        const productId = typeof item.productId === 'object' && '_id' in item.productId
          ? (item.productId as any)._id?.toString?.() ?? item.productId.toString()
          : item.productId.toString();
        const product = await productService.getProduct(productId);
        return (product?.price || 0) * item.quantity;
      }),
    );
    return prices.reduce((acc, p) => acc + p, 0);
  };

  const handleCheckout = async () => {
    if (!cart || total <= 0 || !session?.user?.email) return;

    try {
      const response = await fetch('/api/payment/shopier/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.email,
          amount: total,
          productName: 'Ravenure Bakiye Yükleme',
          buyerName: session.user.name?.split(' ')[0],
          buyerSurname: session.user.name?.split(' ').slice(1).join(' '),
          buyerEmail: session.user.email,
          buyerPhone: session.user.phoneNumber,
        }),
      });
      const html = await response.text();
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
      }
    } catch (error) {
      console.error(error);
    }
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

  const refresh = useCallback(() => {
    fetchCart();
  }, [fetchCart]);

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

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => toggle(), 300);
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
    const walk = (x - startX) * 0.6;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDelete = async (id: string) => {
    if (!cart) return;

    const prevCart = cart;
    const updatedItems = prevCart.items.filter((i) => i.productId.toString() !== id);

    // optimistic update
    setCart({ ...prevCart, items: updatedItems });
    setTotal(await calcTotal(updatedItems));

    try {
      await cartService.saveCart({
        ...(prevCart || {}),
        email: session?.user?.email,
        items: updatedItems,
      });
    } catch {
      // rollback on error
      setCart(prevCart);
      setTotal(await calcTotal(prevCart.items));
      refresh();
    }
  };

  if (!isOpen && !animate) return null;

  const itemCount = cart?.items?.length ?? 0;
  const isEmpty = !loading && itemCount === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Side Panel */}
      <aside
        className={`ml-auto h-full w-full sm:w-[640px] bg-gradient-to-br from-[#09080a] to-[#171717]
        backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col rounded-l-2xl overflow-hidden
        transform transition-transform duration-300 ease-out
        ${animate ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drag handle (mobile hint) */}
        <div className="sm:hidden w-full py-2 grid place-items-center">
          <div className="h-1.5 w-14 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <h2 id="cart-title" className="text-lg font-semibold">
              Sepetim
            </h2>
            {itemCount > 0 && (
              <span className="text-xs text-white/70">
                ({itemCount} {itemCount > 1 ? 'ürün' : 'ürün'})
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            aria-label="Kapat"
            className="text-gray-300 hover:text-red-500 hover:scale-110 duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* İçerik */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex-1 overflow-y-auto px-6 py-4 text-white space-y-6 divide-y divide-white/10"
        >
          <div className="space-y-6 pb-6">
            {loading && (
              <div className="space-y-3">
                <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
                <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
              </div>
            )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 text-white space-y-6">
          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-3">
              <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
            </div>
          )}

          {/* Empty state */}
          {!loading && isEmpty && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-sm text-white/80">Sepetiniz boş.</div>
              <button
                onClick={handleClose}
                className="mt-3 inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white/10 hover:bg白/15"
              >
                Alışverişe Devam Et <FiArrowRight />
              </button>
            </div>
          )}

          {/* Cart items */}
          {!loading && !isEmpty && (
            <div className="space-y-4">
              {cart?.items.map((item) => (
                <CardProductComponent
                  key={item.productId.toString()}
                  productId={item.productId as any}
                  quantity={item.quantity}
                  handleDelete={() => handleDelete(item.productId.toString())}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="bg-white/10 border-t border-white/10 px-6 py-4 text-white">
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-200 font-semibold">Ara toplam</span>
            <span className="text-lg font-bold text-white">{formatTRY(total)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Vergiler ödeme sırasında hesaplanır.</p>
          <button
            onClick={handleCheckout}
            disabled={total <= 0}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              total > 0
                ? 'bg-gradient-to-r from-[#25d170] to-[#139f8b] hover:opacity-90 cursor-pointer'
                : 'bg-white/10 text-white/60 cursor-not-allowed'
            }`}
          >
            Ödeme Yap
          </button>
        </div>
      </aside>
      </div>
    
  );
}