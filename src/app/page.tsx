'use client';
import { useEffect } from "react";
import { useLanguage } from "../hooks/uselanguage.hooks";
import { useSession } from "next-auth/react";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { data: session } = useSession();
  useEffect(() => {
    const arrow = document.getElementById("arrow");
    if (arrow) {
      arrow.addEventListener("click", () => {
        const productsSection = document.getElementById("products");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, []);
  return (
    <div>
        
        <section id="products" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white">Öne Çıkan Ürünler</h2>
          <span className="block text-center text-sm font-semibold bg-gradient-to-l from-[#25d170] to-[#139f8b] bg-clip-text text-transparent mb-16 mt-4">
            asdasdasdddaddadadadadadadadadadadsadadadad
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          </div>
        </div>
      </section>
    </div>
  );
}
