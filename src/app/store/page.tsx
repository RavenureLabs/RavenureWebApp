'use client';

import CategoryComponent from '@/src/components/category/category.component';
import ProductComponent from '@/src/components/product/product.component';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { CategoryType } from '@/src/models/category.model';
import { ProductType } from '@/src/models/product.model';
import { categoryService, productService } from '@/src/lib/services';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  const { text } = useLanguage();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoryService.getCategories();
      setCategories(categories);
      const products = await productService.getProducts();
      setProducts(products);
    };
    fetchCategories();
  }, []);

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
          {/* Default all category component */}
          <CategoryComponent
          name="Tüm Ürünler"
          href="/store"
          />
          {
            categories.map((category, index) => (
              <CategoryComponent
                key={index}
                name={category.name}
                href={`/store/category/${category.name}`}
              />
            ))
          }
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductComponent 
            product={product}
            />
          ))}
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
