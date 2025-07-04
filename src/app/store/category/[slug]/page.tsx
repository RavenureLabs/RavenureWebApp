'use client';
import { useLanguage } from "@/src/hooks/uselanguage.hooks";
import { productService } from "@/src/lib/services";
import { ProductType } from "@/src/models/product.model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string };
  const { text } = useLanguage();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productService.getProductsByCategory(slug.replaceAll("-", " "));
      setProducts(products);
    };
    fetchProducts();
  }, [slug]);

  return (
    <div>
      <p>{slug}</p> {/* Burada slug değeri /store/category/{slug} varya oradan alır kullanmak istersen böyle kullanabilirsin */}
      {/* Örnek şöyle mesela mesela ben bu değeri api'den verileri isme göre vs alıyorum*/}
      
    </div>
  );
}