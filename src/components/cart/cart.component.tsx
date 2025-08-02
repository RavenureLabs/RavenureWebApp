'use client';

import { cartService, productService } from '@/src/lib/services';
import { CartType } from '@/src/models/cart.model';
import { useCartStore } from '@/src/stores/cart.store';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import CardProductComponent from './cartproduct.component';
import { ProductType } from '@/src/models/product.model';
import ForYouComponent from './foryou.component';

export default function CartComponent() {
  const { isOpen, toggle } = useCartStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [cart, setCart] = useState<CartType | null>(null);
  const [total, setTotal] = useState(0);
  const {data:session,status} = useSession();
  const [mostSold, setMostSold] = useState<ProductType[]>([]);

  useEffect(() =>{

    if(!session || !session.user || status !== 'authenticated') return;
    const fetchCart = async () => {
      const mostSold = await productService.getMostSoldProducts();
      const cart = await cartService.getCart(session?.user?.email as string);
      let total = 0;
      if (cart?.items && cart.items.length > 0) {
        const prices = await Promise.all(
          cart.items.map(async (item) => {
            const product = await productService.getProduct(item.productId);
            return (product?.price || 0) * item.quantity;
          })
        );
        total = prices.reduce((acc, price) => acc + price, 0);
      }
      setCart(cart);
      setTotal(total);
      setMostSold(mostSold);
    }
    fetchCart();
  }, [session])

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

  const refresh = () => {
    const fetchCart = async () => {
      const mostSold = await productService.getMostSoldProducts();
      const cart = await cartService.getCart(session?.user?.email as string);
      let total = 0;
      if (cart?.items && cart.items.length > 0) {
        const prices = await Promise.all(
          cart.items.map(async (item) => {
            const product = await productService.getProduct(item.productId);
            return (product?.price || 0) * item.quantity;
          })
        );
        total = prices.reduce((acc, price) => acc + price, 0);
      }
      setCart(cart);
      setTotal(total);
      setMostSold(mostSold);
    }
    fetchCart();
  }

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

  const handleDelete = async (id: string) => {
    const newItems = cart?.items.filter(item => item.productId !== id);
    const data = {
      email: session?.user?.email,
      items: newItems
    }
    const response = await cartService.saveCart({...cart, ...data});
    if(response) refresh();
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
          {cart && cart?.items.length !== 0 && <span className="text-xs absolute  left-26">( {cart?.items.length} Eşya )</span>}
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
            {cart?.items.map((item) => (
              <CardProductComponent
              productId={item.productId}
              quantity={item.quantity}
              handleDelete={() => handleDelete(item.productId)}
              />
            ))}
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
              {
                mostSold.map((product) => (
                  !cart?.items.find(item => item.productId === product._id.toString()) &&
                  <ForYouComponent
                    refresh={refresh}
                    product={product}
                  />
                ))
              }
            </div>
          </div>
        </div>

        {/* Sepet Özeti */}
        <div className="bg-white/10 border-t border-white/10 px-6 py-4 text-white">
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-200 font-semibold">Ara toplam</span>
            <span className="text-lg font-bold text-white">₺{total}.00</span>
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
