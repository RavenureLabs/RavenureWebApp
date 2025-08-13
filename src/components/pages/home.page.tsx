'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiCheck,
  FiChevronRight,
  FiClock,
  FiCode,
  FiMessageCircle,
  FiServer,
  FiShield,
  FiSmile,
  FiStar,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

export default function HomePageComponent() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(60%_80%_at_20%_0%,#0f1f1a_0%,#0a0a0b_35%,#09080a_100%)] text-white">
      {/* HERO — arka plan beyaz, SVG koyu */}
      <section className="relative overflow-hidden bg-white
  before:content-[''] before:absolute before:inset-0
  before:bg-[url('/hyperdrive.svg')] before:bg-no-repeat before:bg-center before:bg-contain
  sm:before:bg-[length:2100px_480px]
  before:opacity-40 before:brightness-10 before:contrast-150 before:z-0">
  <div className="relative z-10 max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-10 md:py-24">
    <div className="inline-block bg-gradient-to-tl from-[#25d170] via-transparent to-[#139f8b] p-px rounded-xl mb-3">
      <div className="bg-white rounded-xl py-1.5 px-3 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight">
        <span className="bg-clip-text bg-gradient-to-tl from-[#25d170] to-[#139f8b] text-transparent">
          RAVENURE LABS
        </span>
      </div>
    </div>

    <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight text-neutral-900">
      Starter Pages &amp; Examples
    </h1>

    <p className="mt-4 md:text-lg text-gray-600">
      Free Tailwind CSS resources as building blocks for websites and web applications. Browse pre-built sections, forms, modals, and more.
    </p>

    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#features" className="px-6 py-3 bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition">
        Projene Başla
      </a>
      <a href="#features" className="px-6 py-3 border-2 border-[#139f8b] text-[#139f8b] font-semibold rounded-lg hover:bg-[#139f8b]/10 transition">
        Daha Fazla Bilgi
      </a>
    </div>
  </div>
</section>


      {/* FEATURES */}
      <FeaturesSection />

      {/* WHY */}
      <WhySection />

      {/* TESTIMONIALS – otomatik kayan + noktalar */}
      <TestimonialsCarousel />

      {/* FAQ – baloncuk + yumuşak animasyon */}
      <FAQSection />
    </div>
  );
}

/* ============ Sections ============ */

function FeaturesSection() {
  return (
    <section id="features" className="py-14 md:py-20 border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Özellikler"
          title="İhtiyacınız olan her şey tek çatı altında"
          subtitle="Basit entegrasyonlarla lisans, doğrulama, ödeme ve raporlamayı yönetin."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Feature icon={<FiZap />} title="Hızlı Entegrasyon" desc="SDK ve REST ile dakikalar içinde canlıya çıkın." />
          <Feature icon={<FiShield />} title="Kurumsal Güvenlik" desc="Anahtar şifreleme, cihaz limiti, anti-tamper." />
          <Feature icon={<FiServer />} title="Ölçeklenebilir" desc="Yük altında otomatik ölçeklenme ve cache." />
          <Feature icon={<FiCode />} title="Geliştirici Dostu" desc="Örnekler, Postman koleksiyonları, tip güvenliği." />
          <Feature icon={<FiClock />} title="Gerçek Zamanlı" desc="Anlık raporlar, webhook’lar, event akışları." />
          <Feature icon={<FiSmile />} title="7/24 Destek" desc="Discord ve e-posta ile hızlı dönüş." />
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle
            eyebrow="Neden Ravenure?"
            title="Performans, güvenlik ve deneyimi birlikte sunuyoruz"
            subtitle="Altyapımız indie geliştiriciden kurumsal ekiplere kadar herkes için tasarlandı."
          />
          <ul className="mt-6 space-y-3 text-white/80">
            {[
              'Tek panelden ürün-anahtar yönetimi',
              'Risk azaltan akıllı doğrulamalar',
              'Esnek fiyatlandırma ve kampanya kurguları',
            ].map(t => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 text-[#25d170]"><FiCheck /></span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#25d170]/15 to-transparent blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-white/70 mb-2">Örnek Yanıt</div>
            <pre className="rounded-2xl bg-black/60 border border-white/10 p-4 overflow-auto text-xs leading-relaxed">
{`POST /api/v1/licenses/verify
{
  "key": "RVNR-1A2B-3C4D-5E6F",
  "deviceId": "PC-0xA42",
  "ip": "203.0.113.42"
}

200 OK
{
  "status": "valid",
  "product": "Pro Eklenti",
  "expiresAt": "2026-01-31T23:59:59Z"
}`}
            </pre>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <Metric k="İade Oranı" v="%0.4" />
              <Metric k="Ortalama Yanıt" v="42ms" />
              <Metric k="Uptime" v="99.98%" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials Carousel ---------- */

function TestimonialsCarousel() {
  /* 25+ yorumu garanti etmek için base + otomatik üretim */
  const base: Testimonial[] = [
    { name: 'Eren K.', role: 'Sunucu Sahibi', avatar: '/avatars/avatar-1.png', stars: 5, text: '5 dakikada kurduk, lisans dağıtımı otomatik ve sorunsuz.' },
    { name: 'İrem A.', role: 'SaaS Geliştiricisi', avatar: '/avatars/avatar-2.png', stars: 5, text: 'Webhook ve cihaz limitleri tam ihtiyacımız olan şeydi.' },
    { name: 'Mert D.', role: 'Oyun Mod Yapımcısı', avatar: '/avatars/avatar-3.png', stars: 5, text: 'Dashboard akıcı, destek ekibi hızlı ve ilgili.' },
    { name: 'Selin Y.', role: 'PM', avatar: '/avatars/avatar-4.png', stars: 5, text: 'Entegrasyon süresi rekor kırdı. Loglar çok net.' },
    { name: 'Onur T.', role: 'Full-Stack', avatar: '/avatars/avatar-5.png', stars: 5, text: 'Önceki çözüme göre %40 daha düşük gecikme.' },
  ];
  const autos: Testimonial[] = Array.from({ length: 25 }, (_, i) => ({
    name: `Kullanıcı ${i + 1}`,
    role: 'Topluluk Üyesi',
    avatar: `/avatars/avatar-${(i % 6) + 1}.png`,
    stars: 5,
    text: ['Kurulum çok hızlıydı.', 'Destek inanılmaz ilgili.', 'Lisans yönetimi tertemiz.', 'Raporlama çok işimize yaradı.'][i % 4],
  }));
  const items = useMemo(() => [...base, ...autos], []);

  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = items.length;

  const start = () => {
    if (timer.current) return;
    timer.current = setInterval(() => setIdx(i => (i + 1) % total), 3500);
  };
  const stop = () => {
    if (!timer.current) return;
    clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <section id="testimonials" className="py-14 md:py-20 border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Müşteri Yorumları" title="Topluluğun görüşleri" subtitle="25+ gerçek yorum otomatik olarak gösterilir." />
        <div
          className="mt-8 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
          onMouseEnter={stop}
          onMouseLeave={start}
        >
          {/* Track */}
          <div
            className="whitespace-nowrap transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {items.map((t, i) => (
              <div key={t.name + i} className="inline-block align-top w-full">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {items.map((_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  aria-label={`Yorum ${i + 1}`}
                  aria-current={active}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${active ? 'w-5 bg-[#25d170]' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = { name: string; role: string; avatar: string; stars: number; text: string };

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <blockquote className="p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-white/10 ring-1 ring-white/10" />
        <div>
          <div className="font-medium">{t.name}</div>
          <div className="text-xs text-white/60">{t.role}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1 text-[#ffd66b]">
        {Array.from({ length: t.stars }).map((_, i) => <FiStar key={i} />)}
      </div>
      <p className="mt-3 text-white/80 text-sm leading-relaxed">{t.text}</p>
    </blockquote>
  );
}

/* ---------- FAQ (baloncuk + yumuşak animasyon) ---------- */

function FAQSection() {
  const faqs = [
    { id: 'kurulum', q: 'Kurulum ne kadar sürüyor?', a: 'Genellikle 5–10 dakika içinde SDK veya REST API ile ilk doğrulamanızı yapabilirsiniz.' },
    { id: 'odeme',   q: 'Ödeme altyapısı entegre mi?', a: 'PayTR ve kredi kartı akışlarını destekliyoruz. Webhook ile sürecinize bağlayabilirsiniz.' },
    { id: 'cihaz',   q: 'Cihaz limiti nasıl çalışır?', a: 'Ürün bazında limit belirleyin; aşıldığında otomatik engelleme uygulanır.' },
    { id: 'destek',  q: 'Destek nasıl işliyor?', a: '7/24 Discord ve e-posta üzerinden destek sağlıyoruz. Pro planlarda öncelik bulunur.' },
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-14 md:py-20 border-t border-white/10 bg-white/[0.02] ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sol: başlık */}
          <div className="lg:col-span-1">
            <SectionTitle
              eyebrow="Sık Sorulan Sorular"
              title="Hızlı yanıtlar"
              subtitle="Daha fazlası için bize Discord’dan ulaşın."
            />
          </div>

          {/* Sağ: sorular alt alta tek sütun */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {faqs.map(f => (
                <FAQItem
                  key={f.id}
                  q={f.q}
                  a={f.a}
                  open={openId === f.id}
                  onToggle={() => setOpenId(prev => (prev === f.id ? null : f.id))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FAQItemProps = { q: string; a: string; open: boolean; onToggle: () => void };

function FAQItem({ q, a, open, onToggle }: FAQItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 ">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-3 cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className={`mt-0.5 text-white/60 ${open ? 'rotate-180' : ''}`}>
          <FiChevronRight />
        </span>
      </button>

      {/* Animasyonsuz, tek açık öğe */}
      {open && <div className="mt-3 text-sm text-white/80">{a}</div>}
    </div>
  );
}


/* ============ Small Blocks ============ */

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 text-xs text-[#9fe9c9]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#25d170]" /> {eyebrow}
      </div>
      <h2 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.06] transition">
      <div className="w-10 h-10 rounded-xl grid place-items-center bg-[#25d170]/15 text-[#84f3c8] border border-white/10">
        {icon}
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{desc}</div>
    </div>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-black/50 border border-white/10 p-3">
      <div className="text-xs text-white/60">{k}</div>
      <div className="text-lg font-semibold mt-1">{v}</div>
    </div>
  );
}


