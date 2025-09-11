// components/cart/CartClient.tsx
'use client';

import { api } from '@/src/lib/api';
import { CartDTO } from '@/src/lib/cart/getCart';
import { cartService } from '@/src/lib/services';
import { UserType } from '@/src/models/user.model';
import { useCartStore } from '@/src/stores/cart.store';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { FiArrowRight } from 'react-icons/fi';

type CartItemDTO = {
  product: {
    _id: string;
    name: Record<string,string>;
    imageUrl: string;
    price: number;
    discountPrice?: number;
  };
  quantity: number;
};

export default function CartClient({
  user,
  isLoggedIn,
  initialCart
}: {
  user: UserType;
  isLoggedIn: boolean;
  initialCart: CartDTO;
}) {
  const { isOpen, toggle } = useCartStore();
  const [cart, setCart] = useState<CartDTO>(initialCart);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  // drag state
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const formatTRY = (n: number) =>
    new Intl.NumberFormat('tr-TR', {
      style: 'currency', currency: 'TRY', maximumFractionDigits: 0,
    }).format(n);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await cartService.getCart(user._id.toString());
      setCart(res); 
    } finally {
      setLoading(false);
    }
  }, []);

useEffect(() => {
  if (isOpen) fetchCart();
}, [isOpen, fetchCart]);


  // Aç/Kapat animasyon
  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      document.body.style.overflow = 'hidden';
    } else {
      setAnimate(false);
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
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

  // Drag handlers
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

  // Sepetten sil (optimistic)
  const handleDelete = async (productId: string) => {
    const prev = cart;
    const nextItems = prev.items.filter(i => i.product._id.toString() !== productId);
    const nextTotal = nextItems.reduce((sum, it) => {
      const price = (it.product.discountPrice ?? it.product.price);
      return sum + price * it.quantity;
    }, 0);

    setCart({ items: nextItems, total: nextTotal });

    try {
      await cartService.saveCart(
        { userId: user._id.toString(), items: nextItems.map(i => ({ productId: i.product._id, quantity: i.quantity })) }
      )
    } catch {
      // rollback
      setCart(prev);
    }
  };

  const handleCheckout = async () => {
    if (!isLoggedIn || cart.total <= 0) return;
    try {
      const res = await api.post('/api/payment/shopier/deposit', {
        userId: user._id.toString(),
        amount: cart.total,
        buyerName: user.name.split(' ')[0] || "FirstName",
        buyerSurname: user.name.split(' ').slice(1).join(' ') || "LastName",
        buyerEmail: user.email,
        buyerPhone: user.phoneNumber || "0000000000",
        productIds: cart.items.map(i => i.product._id.toString()),
      });
      const html = await res.data;
      const win = window.open('', '_blank');
      if (win) {
        win.document.open();
        win.document.write(html);
        win.document.close();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen && !animate) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ${
          animate ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      <aside
        className={`ml-auto h-full w-full sm:w-[640px] bg-gradient-to-br from-[#09080a] to-[#171717]
        backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col rounded-l-2xl overflow-hidden
        transform transition-transform duration-300 ease-out
        ${animate ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <h2 id="cart-title" className="text-lg font-semibold">Sepetim</h2>
            {cart.items.length > 0 && <span className="text-xs text-white/70">({cart.items.length} ürün)</span>}
          </div>
          <button onClick={handleClose} aria-label="Kapat" className="text-gray-300 hover:text-red-500 hover:scale-110 duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* content */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex-1 overflow-y-auto px-6 py-4 text-white space-y-6 divide-y divide-white/10"
        >
          {/* empty */}
          {cart.items.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="text-sm text-white/80">Sepetiniz boş.</div>
              <button onClick={handleClose} className="mt-3 inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-white/10">
                Alışverişe Devam Et <FiArrowRight />
              </button>
            </div>
          )}

          {/* items */}
          {cart.items.length !== 0 && (
            <div className="space-y-4 pt-2">
              {cart.items.map((it) => (
                <CartItemRow
                  key={it.product._id.toString()}
                  item={{
                    ...it,
                    product: {
                      ...it.product,
                      _id: it.product._id.toString(),
                    },
                  }}
                  onDelete={() => handleDelete(it.product._id.toString())}
                />
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="bg-white/10 border-t border-white/10 px-6 py-4 text-white">
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-200 font-semibold">Ara toplam</span>
            <span className="text-lg font-bold text-white">{formatTRY(cart.total)}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Vergiler ödeme sırasında hesaplanır.</p>
          <button
            onClick={handleCheckout}
            disabled={cart.total <= 0}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              cart.total > 0
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

function CartItemRow({ item, onDelete }: { item: CartItemDTO; onDelete: () => void }) {
  const { product, quantity } = item;
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="pt-0 flex items-center gap-4 group ml-3">
      <img src={product.imageUrl} alt={product.name["tr"]} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1 flex flex-col ml-2">
        <h4 className="text-sm font-medium mb-2">{product.name["tr"]}</h4>
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium text-white">
            ₺{hasDiscount ? product.discountPrice : product.price} <span className="text-xs text-white/60">x{quantity}</span>
          </p>
          {hasDiscount && (
            <p className="text-xs line-through text-red-400/70">₺{product.price}</p>
          )}
        </div>
      </div>
      <button className="transition cursor-pointer mr-3" onClick={onDelete} aria-label="Sil">
        {/* trash icon */}
        <svg className="text-gray-400 hover:text-red-600 w-5 h-5 hover:scale-110 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-1-2H10a1 1 0 00-1 1v1h6V6a1 1 0 00-1-1z"/>
        </svg>
      </button>
    </div>
  );
}
