'use client';
import ProductComponent from "../components/product/product.component";
import { use, useEffect } from "react";
import './i18n';
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n} = useTranslation();
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
        <section className="bg-[#0f0f10] text-white py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-sm uppercase tracking-widest text-[#25d170] font-medium mb-4">Ravenure Labs</div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  Projelerinize Akıl Katan<br />
                  Dijital Güçler
                </h1>
                <p className="text-white/70 text-lg mb-10 max-w-xl">
                  Minecraft sunucuları için efsanevi eklentiler, görsel tasarım çözümleri ve özel Discord botlarıyla sizi sıradanlıktan çıkarıyoruz.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="/store" className="px-6 py-3 bg-[#25d170] text-black rounded-xl font-semibold shadow-lg hover:bg-[#1cbf63] transition">
                    Mağazayı Keşfet
                  </a>
                  <a href="/discord-link" className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-black transition">
                    Discord'a Katıl
                  </a>
                </div>
              </div>

              <div className="relative group">
                <div className="relative bg-[#1a1a1c] rounded-3xl p-6 shadow-2xl w-[320px] h-[380px] mx-auto border border-white/10 hover:scale-105 transition-transform duration-500">
                  <div className="absolute -top-6 left-6 bg-[#25d170] text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Öne Çıkan
                  </div>
                  <img src="grass.jpg" alt="Minecraft Visual" className="rounded-2xl w-full h-48 object-cover mb-4" />
                  <h3 className="text-xl font-bold mb-2">Gelişmiş Eklenti Paketi</h3>
                  <p className="text-white/70 text-sm">
                    Performans odaklı, sürdürülebilir ve topluluk dostu mod sistemleri.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-28 grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md hover:shadow-xl transition">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="text-xl font-semibold mb-1">Akıllı Sistemler</h4>
                <p className="text-white/70 text-sm">Sunucunuzu analiz eden ve dinamik çözümler üreten teknolojiler.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md hover:shadow-xl transition">
                <div className="text-4xl mb-3">🎨</div>
                <h4 className="text-xl font-semibold mb-1">Tasarım Gücü</h4>
                <p className="text-white/70 text-sm">Estetik, fonksiyon ve marka kimliğini buluşturan görseller.</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-md hover:shadow-xl transition">
                <div className="text-4xl mb-3">⚙️</div>
                <h4 className="text-xl font-semibold mb-1">Otomasyon</h4>
                <p className="text-white/70 text-sm">Discord ve Minecraft için entegre edilmiş bot sistemleri.</p>
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <a href="#products" id="arrow"
  
                className="text-white text-4xl animate-bounce hover:opacity-70 transition">
                ↓
              </a>
            </div>
          </div>
        </section>
        <section id="products" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white">Öne Çıkan Ürünler</h2>
          <span className="block text-center text-sm font-semibold bg-gradient-to-l from-[#25d170] to-[#139f8b] bg-clip-text text-transparent mb-16 mt-4">
            asdasdasdddaddadadadadadadadadadadsadadadad
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <ProductComponent
              id="1"
              name="Gelişmiş Eklenti Paketi"
              description="Performans odaklı, sürdürülebilir ve topluluk dostu mod sistemleri."
              price={49.99}
              discountPrice={39.99}
              imageUrl="/Product Thumbnail RBlackshop.png"
              author="Ravenure Labs"
              reviews={{ rating: 4.8, count: 120 }}
              category="Eklentiler"
              salesCount={300}
              createdAt="2023-01-01"
              updatedAt="2023-10-01"
              stock={50}
              isFeatured={true}
              isActive={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
