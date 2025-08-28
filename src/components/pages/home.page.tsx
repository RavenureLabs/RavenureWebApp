'use client';

import React, { useState } from 'react';
import { 
  FiZap, 
  FiShield, 
  FiServer, 
  FiCode, 
  FiClock, 
  FiSmile 
} from 'react-icons/fi';

/* ===================== SAYFA ===================== */

export default function HomePageComponent() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(60%_80%_at_20%_0%,#0e1115_0%,#090a0b_40%,#08090a_100%)] text-white">
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-white
        before:content-[''] before:absolute before:inset-0
        before:bg-[url('/hyperdrive.svg')] before:bg-no-repeat before:bg-center before:bg-contain
        sm:before:bg-[length:2100px_480px]
        before:opacity-40 before:brightness-10 before:contrast-150 before:z-0"
      >
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
            Free Tailwind CSS resources as building blocks for websites and web applications. Browse pre-built sections,
            forms, modals, and more.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#features"
              className="px-6 py-3 bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Projene Başla
            </a>
            <a
              href="#features"
              className="px-6 py-3 border-2 border-[#139f8b] text-[#139f8b] font-semibold rounded-lg hover:bg-[#139f8b]/10 transition"
            >
              Daha Fazla Bilgi
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <FeaturesSection />

      {/* WHY */}
      <WhySection />

      {/* TESTIMONIALS */}
      <TestimonialsRotatingColors />

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}

/* ===================== FEATURES ===================== */

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
/* ===================== WHY ===================== */

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
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[#25d170]">•</span>
              <span>Tek panelden ürün-anahtar yönetimi</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[#25d170]">•</span>
              <span>Risk azaltan akıllı doğrulamalar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-[#25d170]">•</span>
              <span>Esnek fiyatlandırma ve kampanya kurguları</span>
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#25d170]/15 to-transparent blur-2xl rounded-3xl pointer-events-none" />
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-white/70 mb-2">Örnek Yanıt</div>
            <pre className="rounded-2xl bg-black/60 border border-white/10 p-4 overflow-auto text-xs leading-relaxed">{`POST /api/v1/licenses/verify
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
}`}</pre>
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

/* ===================== TESTIMONIALS – 6 KART + BAŞLIK ===================== */

function TestimonialsRotatingColors() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* ---- Başlık Bloğu ---- */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Ravenure'yi müşterilerinin ağzından dinleyin
          </h2>
          <div className="h-0.5 w-16 md:w-20 bg-[#25d1b0] mx-auto rounded-full mt-3" />
          <p className="mt-4 text-white/70">
            Müşterilerimizin Ravenure hakkındaki düşünceleri.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 ">
          {/* ÜST SATIR */}
          <NeutralCard
            avatar="/avatars/avatar-1.png"
            handle="@Baso"
            sub="Youtube.com/@Baso"
            text="I worked with Aenux for my server, BasoNetwork. Everything you're looking for is in this guy!"
            size="large"
            colors={['#7d97fc', '#d07dfc', '#7d97fc']}
          />
          <NeutralCard
            avatar="/avatars/avatar-2.png"
            handle="@You"
            sub="Lucky Person"
            text="Ready to be the next lucky one? Place your order now and experience the difference in quality!"
            size="normal"
            colors={['#ffcc70', '#ff6f61', '#ffcc70']}
          />
          <NeutralCard
            avatar="/avatars/avatar-3.png"
            handle="@Adal"
            sub="Youtube.com/@DogukanAdalLive"
            text="I worked with Aenux for my server, Adalances. Thanks to the announcement designs, my server became even more pleasant!"
            size="large"
            colors={['#7dfccf', '#25d170', '#7dfccf']}
          />

          {/* ALT SATIR */}
          <NeutralCard
            avatar="/avatars/avatar-4.png"
            handle="@Raven"
            sub="Github.com/ravenure"
            text="Another testimonial in left bottom."
            size="large"
            colors={['#ff8efc', '#b87dff', '#ff8efc']}
          />
          <NeutralCard
            avatar="/avatars/avatar-5.png"
            handle="@Maya"
            sub="Discord Partner"
            text="This is the middle bottom card, closer to the top middle oneasdasdasdadadadadada dadssadasdadsads asdadsasddasdadsasddasdadsasdd."
            size="normal"
            className="-mt-6"
            colors={['#7dfcff', '#7dcefc', '#7dfcff']}
          />
          <NeutralCard
            avatar="/avatars/avatar-6.png"
            handle="@Zen"
            sub="Freelancer"
            text="Another testimonial in right bottom."
            size="large"
            colors={['#fc7d7d', '#fcbd7d', '#fc7d7d']}
          />
        </div>
      </div>
    </section>
  );
}

/* ==== TEK KART ==== */

type CardProps = {
  avatar: string;
  handle: string;
  sub?: string;
  text: string;
  size?: 'normal' | 'large';
  className?: string;
  colors?: [string, string, string];
};

function NeutralCard({ avatar, handle, sub, text, size = 'normal', className = '', colors }: CardProps) {
  return (
    <div className={`relative ${size === 'large' ? 'h-60' : 'h-52'} ${className}`}>
      <blockquote
        className="relative rounded-3xl border border-white/10
                   bg-[linear-gradient(180deg,rgba(12,14,16,0.86),rgba(9,11,13,0.86))]
                   backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.45)]
                   p-6 md:p-7 text-white h-full flex flex-col"
      >
        <div className="flex items-center gap-3">
          <img src={avatar} alt={handle} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" />
          <div className="min-w-0">
            <AnimatedHandle text={handle} c1={colors?.[0]} c2={colors?.[1]} c3={colors?.[2]} />
            {sub && <div className="mt-1 text-xs text-white/70 truncate">{sub}</div>}
          </div>
        </div>

        <p className="mt-4 text-[13.5px] leading-6 text-white/90 line-clamp-3">{text}</p>
      </blockquote>
    </div>
  );
}

/* ==== HANDLE ==== */

function AnimatedHandle({
  text,
  c1 = '#ffffff',
  c2 = '#ff2a2a',
  c3 = '#ffffff',
  speed = '2s',
  period = 120,
}: {
  text: string;
  c1?: string;
  c2?: string;
  c3?: string;
  speed?: string;
  period?: number;
}) {
  const styleVars = {
    ['--c1' as any]: c1,
    ['--c2' as any]: c2,
    ['--c3' as any]: c3,
    ['--speed' as any]: speed,
    ['--period' as any]: `${period}px`,
  } as React.CSSProperties;

  return (
    <span className="handle-flow font-semibold leading-none " style={styleVars}>
      {text}
    </span>
  );
}

/* ===================== FAQ ===================== */

function FAQSection() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="faq" className="py-14 md:py-20 border-t border-white/10 bg-white/[0.02] ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SectionTitle eyebrow="Sık Sorulan Sorular" title="Hızlı yanıtlar" subtitle="Daha fazlası için bize Discord’dan ulaşın." />
          </div>
          <div className="lg:col-span-2 space-y-3">
            <FAQItem q="Kurulum ne kadar sürüyor?" a="Genellikle 5–10 dakika içinde SDK veya REST API ile ilk doğrulamanızı yapabilirsiniz." open={open==='1'} onToggle={()=>setOpen(open==='1'?null:'1')} />
            <FAQItem q="Ödeme altyapısı entegre mi?" a="PayTR ve kredi kartı akışlarını destekliyoruz. Webhook ile sürecinize bağlayabilirsiniz." open={open==='2'} onToggle={()=>setOpen(open==='2'?null:'2')} />
            <FAQItem q="Cihaz limiti nasıl çalışır?" a="Ürün bazında limit belirleyin; aşıldığında otomatik engelleme uygulanır." open={open==='3'} onToggle={()=>setOpen(open==='3'?null:'3')} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: ()=>void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-3 cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-medium">{q}</span>
        <span className={`mt-0.5 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`}>›</span>
      </button>
      {open && <div className="mt-3 text-sm text-white/80">{a}</div>}
    </div>
  );
}

/* ===================== SMALL BLOCKS ===================== */


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

/* ===================== EXTRA STYLES ===================== */

const extraCSS = `
@keyframes handle-scroll-x {
  0%   { background-position: 0 0; }
  100% { background-position: var(--period) 0; }
}
.handle-flow {
  background-image: repeating-linear-gradient(
    90deg,
      var(--c1) 0px,
      var(--c1) calc(var(--period) * 0.20),
      var(--c2) calc(var(--period) * 0.50),
      var(--c3) calc(var(--period) * 0.80),
      var(--c3) var(--period)
  );
  background-size: var(--period) 100%;
  background-repeat: repeat;
  background-position: 0 0;

  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  animation: handle-scroll-x var(--speed) linear infinite;

  filter:
    drop-shadow(0 0 4px rgba(255,255,255,0.18))
    drop-shadow(0 0 8px rgba(255, 42, 42, 0.18));
}
.line-clamp-3{
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
`;

if (typeof document !== 'undefined') {
  const tagId = 'extra-handle-flow-styles';
  if (!document.getElementById(tagId)) {
    const styleTag = document.createElement('style');
    styleTag.id = tagId;
    styleTag.innerHTML = extraCSS;
    document.head.appendChild(styleTag);
  }
}
