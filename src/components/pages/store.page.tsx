'use client';

import Image from 'next/image';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { useEffect, useMemo, useState } from 'react';
import { ProductType } from '@/src/models/product.model';
import { cartService, categoryService, productService } from '@/src/lib/services';
import { CategoryType } from '@/src/models/category.model';
import { getSession, useSession } from 'next-auth/react';

export default function ShopPageComponent() {
  const { text, language } = useLanguage();
    const {data: session} = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<string>('all');

  const fmt = (v: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 2,
    }).format(v);

  useEffect(() => {
    const fetch = async () => {
      const products = await productService.getProducts();
      setProducts(products || []);
      const categories = await categoryService.getCategories();
      setCategories(categories || []);
    };
    fetch();
  }, []);

  const visible = useMemo(() => {
    if (category === 'all') return products;
    return products.filter(
      (p) => p?.category?.toString?.() === category
    );
  }, [products, category]);

  const addToCart = async (product: ProductType) => {
    if (!session?.user?.email) return;
    const cart = await cartService.getCart(session?.user.email);
    if (cart && cart.items.find((i) => i.productId.toString() === product._id.toString()) || session.user.products.includes(product._id!.toString())) {
      return;
    }
    let updatedItems = cart?.items || [];
    updatedItems.push({
      productId: new (require('bson').ObjectId)(product._id!),
      quantity: 1
    })
  
    await cartService.saveCart(
      {
        "email": session?.user?.email,
        ...cart,
      }
    );
  };


const catBtn = (active: boolean) =>
    [
      'px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer',
      active
        ? 'bg-[#139f8b] text-white'
        : 'bg-white/10 text-white hover:bg-[#139f8b]'
    ].join(' ');

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
            {text('store.hero-title')}
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
            {/* Tüm ürünler */}
            <button
              key="all"
              onClick={() => setCategory('all')}
              className={catBtn(category === 'all')}
            >
              {text('store.all-products')}
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id.toString()}
                onClick={() => setCategory(cat._id.toString())}
                className={catBtn(category === cat._id.toString())}
              >
                {cat?.name?.[language] ?? ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ÜRÜNLER */}
      <section className="py-10 md:py-14 -mt-12">
        <div className="max-w-6xl mx-auto px-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const hasDiscount = !!p.discountPrice && p.discountPrice < p.price;
            const topLine = hasDiscount ? p.price : null; 
            const mainPrice = hasDiscount ? p.discountPrice! : p.price;

            return (
              <div
                key={p._id.toString()}
                className="w-full max-w-[420px] mx-auto text-white relative cursor-pointer hover:opacity-90 transition"
              >
                {/* Görsel */}
                <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-black/20">
                  <Image
                    src={p.imageUrl}
                    alt={p.name?.[language] ?? ''}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Başlık */}
                <h3 className="mt-4 text-[18px] font-semibold leading-tight">
                  {p.name?.[language] ?? ''}
                </h3>

                {/* Açıklama */}
                <p className="mt-1 text-sm text-white/70 line-clamp-3">
                  {p.description?.[language] || ''}
                </p>

                {/* Fiyat + Buton */}
                <div className="mt-4 flex items-end justify-between">
                  <div className="flex flex-col">
                    {topLine !== null && (
                      <span className="text-xs text-white/55 line-through">
                        {fmt(topLine)}
                      </span>
                    )}
                    <span className="text-2xl font-extrabold">
                      {fmt(mainPrice)}
                    </span>
                  </div>
                  {/* Sepete ekle butonu */}
                  <button
                    className="
                      relative h-10 px-5 rounded-full text-sm font-semibold text-white
                      bg-[#139f8b] overflow-hidden cursor-pointer
                      transition-colors duration-300 ease-out
                      before:content-[''] before:absolute before:inset-0
                      before:bg-gradient-to-r before:from-[#25d170] before:to-[#139f8b]
                      before:rounded-full before:pointer-events-none
                      before:translate-x-[-100%] hover:before:translate-x-0
                      before:transition-transform before:duration-500 before:ease-out
                      before:will-change-transform
                    "
                  >
                    <span onClick={() => {
                      addToCart(p);
                    }} className="relative z-[1]">Add to cart</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Boş durum */}
          {visible.length === 0 && (
            <div className="col-span-full text-center text-white/70 py-16">
              {text('store.no-products') || 'Ürün bulunamadı.'}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
