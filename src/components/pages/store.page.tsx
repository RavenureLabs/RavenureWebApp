'use client';

import CategoryComponent from '@/src/components/category/category.component';
import ProductComponent from '@/src/components/product/product.component';
import { useLanguage } from '@/src/hooks/uselanguage.hooks';
import { CategoryType } from '@/src/models/category.model';
import { ProductType } from '@/src/models/product.model';
import { categoryService, commentService, productService } from '@/src/lib/services';
import { Suspense, useEffect, useState } from 'react';
import { CommentType } from '@/src/models/comment.model';
import mongoose from 'mongoose';

export default function ShopPageComponent() {
  const { text } = useLanguage();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFiltredProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Tüm Ürünler");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await categoryService.getCategories();
      setCategories(categories);
      const products = await productService.getProducts();
      setProducts(products);
      // get the comments from db service
      const comments = await commentService.getComments();
      setComments(comments);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === comments.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [comments.length]);

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
            name={{ "en": "All Products", "tr": "Tüm Ürünler" }}
            href="#products"
            clickHandler={() => {
              setActiveCategory("Tüm Ürünler");
              setFiltredProducts([]);
            }}
          />
          {categories.map((category, index) => (
            <CategoryComponent
              key={index}
              name={category.name}
              href="#products"
              clickHandler={() => {
                setActiveCategory(category._id.toString());
                const filtered = products.filter(product => product.category === category._id);
                setFiltredProducts(filtered);
              }}
            />
          ))}
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === "Tüm Ürünler" ? products : filteredProducts).map((product, index) => (
              <ProductComponent 
                key={index}
                product={product}
              />
            ))}
          </div>
      </section>
    </div>
  );
}
