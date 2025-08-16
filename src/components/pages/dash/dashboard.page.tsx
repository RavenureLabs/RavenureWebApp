'use client';

import { orderService, productService, userLogService, userService } from '@/src/lib/services';
import { OrderType } from '@/src/models/order.model';
import { UserLoginLogType } from '@/src/models/userLog.model';
import { signOut, useSession } from 'next-auth/react';
import React, { JSX, useEffect, useMemo, useState } from 'react';
import {
  FiHome, FiKey, FiCreditCard, FiClock, FiShield, FiSettings, FiBell, FiChevronRight, FiLogOut,
  FiCopy, FiSearch, FiAlertTriangle, FiEye, FiEyeOff, FiDownload
} from 'react-icons/fi';

/* ---------------- PAGE ---------------- */

export default function DashboardPageComponent() { 
  const { data: session, status } = useSession();
  const [active, setActive] = useState<'overview'|'licenses'|'purchases'|'logins'|'admin'|'settings'>('overview');

  const capitalizeWords = (str?: string | null) => {
    if (!str) return '';
    return str
      .toLocaleLowerCase('tr-TR')
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1))
      .join(' ');
  };

  const displayName = capitalizeWords(session?.user?.name) || 'Kullanıcı';
  const avatarUrl = session?.user?.image || '/default-avatar.png';

  const licenses = ['Minecraft Market Eklentisi', 'Discord Destek Botu', 'Web Lisans Sistemi'];

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && null;
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    if (!session && status === 'unauthenticated') {
      window.location.href = '/login';
      return;
    }
    
  }, [session, status]);

  const userKey = session?.user?.email || 'Unknown';


  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(60%_80%_at_20%_0%,#1e1b4b_0%,#0a0a0b_40%,#09080a_100%)] text-white">
      {/* --- SIDEBAR --- */}
      <aside className="hidden md:block fixed left-0 top-0 h-full z-40 w-[84px] border-r border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="h-16 px-3 flex items-center justify-center border-b border-white/10">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="/Ravenure-Logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <nav className="mt-2 space-y-1">
          <RailItem title="Genel Bakış"    icon={<FiHome />}        active={active==='overview'}  onClick={() => setActive('overview')}
                    iconColor="#94a3b8"    activeIconColor="#8b5cf6" />
          <RailItem title="Lisanslarım"    icon={<FiKey />}         active={active==='licenses'}  onClick={() => setActive('licenses')}
                    iconColor="#94a3b8"    activeIconColor="#f97316" />
          <RailItem title="Satın Alımlar"  icon={<FiCreditCard />}  active={active==='purchases'} onClick={() => setActive('purchases')}
                    iconColor="#94a3b8"    activeIconColor="#0ea5e9" />
          <RailItem title="Giriş Kayıtları" icon={<FiClock />}      active={active==='logins'}    onClick={() => setActive('logins')}
                    iconColor="#94a3b8"    activeIconColor="#d946ef" />
          <div className="my-2 border-t border-white/10" />
          {
            (session?.user as any)?.role === 'admin' && (
                <RailItem title="Yönetim"        icon={<FiShield />}      active={active==='admin'}     onClick={() => window.location.href = '/admin-dashboard'}
                    iconColor="#94a3b8"    activeIconColor="#16a34a" />
            )
          }
          <RailItem title="Ayarlar"        icon={<FiSettings />}    active={active==='settings'}  onClick={() => setActive('settings')}
                    iconColor="#94a3b8"    activeIconColor="#F6D703" />
          <div className="mt-6"></div>
          <RailItem title="Çıkış Yap"      icon={<FiLogOut />}      danger onClick={() => signOut()}
                    iconColor="#D0234A"    activeIconColor="#dc2626" />
        </nav>
      </aside>

      {/* --- MOBILE TOP --- */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="h-full px-3 flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <img src="/Ravenure-Logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-1.5">
            <RailItem title="Genel Bakış"   icon={<FiHome />}        active={active==='overview'}  onClick={() => setActive('overview')}
                      iconColor="#94a3b8"   activeIconColor="#8b5cf6" />
            <RailItem title="Lisanslarım"   icon={<FiKey />}         active={active==='licenses'}  onClick={() => setActive('licenses')}
                      iconColor="#94a3b8"   activeIconColor="#f97316" />
            <RailItem title="Satın Alımlar" icon={<FiCreditCard />}  active={active==='purchases'} onClick={() => setActive('purchases')}
                      iconColor="#94a3b8"   activeIconColor="#0ea5e9" />
            <RailItem title="Girişler"      icon={<FiClock />}       active={active==='logins'}    onClick={() => setActive('logins')}
                      iconColor="#94a3b8"   activeIconColor="#d946ef" />
          </div>
        </div>
      </nav>

      {/* --- TOP BAR --- */}
      <header className="sticky top-16 md:top-0 z-30 md:pl-[84px]">
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="mx-auto max-w-7xl w-full px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm text-white/70 shrink-0">Kontrol Paneli</span>
              <FiChevronRight className="opacity-40 shrink-0" />
              <span className="text-sm font-medium truncate">
                {active==='overview'  && 'Genel Bakış'}
                {active==='licenses'  && 'Lisanslarım'}
                {active==='purchases' && 'Satın Alımlar'}
                {active==='logins'    && 'Giriş Kayıtları'}
                {active==='admin'     && 'Yönetim'}
                {active==='settings'  && 'Ayarlar'}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="relative p-2 rounded-xl border border-white/10 hover:bg-white/5">
                <FiBell />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              </button>
              <div className="hidden xs:block text-right min-w-0">
                <div className="text-xs text-white/60 leading-4">Hoş geldin</div>
                <div className="text-sm font-medium leading-4 truncate max-w-[140px] sm:max-w-[200px]">{displayName}</div>
              </div>
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="pt-16 md:pt-0 md:pl-[84px]">
        <div className="mx-auto max-w-7xl w-full px-3 sm:px-4 lg:px-6 py-6 sm:py-8 grid gap-6 sm:gap-8">

          {active === 'overview' && (
            <Overview
              displayName={displayName}
              avatarUrl={avatarUrl}
              licenses={licenses}
              email={userKey}
            />
          )}

          {active === 'licenses' && <LicensesSection />}

          {active === 'purchases' && <PurchasesSection />}

          {/* ✅ Gerçek loglar API’dan geliyor; e-posta yoksa name/anon ile listeler */}
          {active === 'logins' && <LoginsSection userKey={userKey} />}

          {active === 'settings' && (
            <SettingsSection
              name={displayName}
              email={session?.user?.email || '—'}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------------- SMALL SECTIONS ---------------- */

function Overview({ displayName, avatarUrl, licenses, email }:{
  displayName:string; avatarUrl:string; licenses:string[]; email:string;
}) {
  const { data: session } = useSession();
  const [totalExpenditure, setTotalExpenditure] = useState('');
  const [lastPurchasesExpenditure, setLastPurchasesExpenditure] = useState('');
  const [loginLog, setLoginLog] = useState<UserLoginLogType[]>([]);
  const [lastPurchases, setLastPurchases] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const totalExpenditure = await orderService.getTotalExpenditure();
      setTotalExpenditure(totalExpenditure.toString());

      const lastPurchasesExpenditure = await orderService.getLastPurchasesExpenditure();
      setLastPurchasesExpenditure(lastPurchasesExpenditure.toString());

      const loginLog = await userLogService.getAllUserLogs(session?.user?.email || '');
      setLoginLog(loginLog);

      const lastPurchases = await orderService.getOrders();
      setLastPurchases(lastPurchases.slice(0, 4));
      setLoading(false);
    }
    fetch();
  }, [session]);

  if (loading) 
    return (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <StatCard title="Lisanslar" value={`${licenses.length}`} hint="Bugün +1" />
        <StatCard title="Toplam Harcama" value={totalExpenditure} hint={`30 günde ₺${lastPurchasesExpenditure}`} />
        <StatCard title="Destek Talepleri" value="5" hint="2 açık" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid gap-6">
          <GlassCard title="Son Satın Alımlar">
            <div className="overflow-x-auto -mx-1 sm:mx-0">
              <table className="min-w-[640px] md:min-w-full text-sm">
                <thead>
                  <tr className="text-left text-white/60">
                    <th className="py-3 pr-3 font-medium whitespace-nowrap">Tarih</th>
                    <th className="py-3 pr-3 font-medium">Ürün</th>
                    <th className="py-3 pr-3 font-medium whitespace-nowrap">Ödeme</th>
                    <th className="py-3 pr-3 font-medium whitespace-nowrap">Tutar</th>
                    <th className="py-3 pr-3 font-medium whitespace-nowrap">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                 {
                  lastPurchases.map(purchase => (
                    purchase.productId.map(p => (
                      <tr key={p.toString()}>
                       <td className="py-3 pr-3 whitespace-nowrap">{new Date(purchase.createdAt).toLocaleDateString('tr-TR')}</td>
                        <td className="py-3 pr-3 min-w-0"><span className="block truncate max-w-[220px] sm:max-w-none">{p.toString()}</span></td>
                        <td className="py-3 pr-3 whitespace-nowrap">"PayWee"</td>
                        <td className="py-3 pr-3 whitespace-nowrap">{purchase.price}</td>
                       <td className="py-3 pr-3 whitespace-nowrap"><Badge cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" text="Başarılı" /></td>
                      </tr>
                    ))
                  ))
                 }
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard title="Giriş Kayıtları">
            <ul className="text-sm divide-y divide-white/10">
            {
              loginLog.map((l, i) => {
                return <LogItem key={i} dot={(l.status === 'failed' ? 'bg-rose-500' : 'bg-emerald-500')} text={`${new Date(l.loginTime).toLocaleString()} • ${l.city} • ${l.ipAddress} • ${l.device}`} right={l.status  === 'Invalid password' ? 'Hatalı Şifre' : 'Başarılı'} />
              })
            }
            </ul>
          </GlassCard>
        </div>

        <div className="grid gap-6">
          <GlassCard title="Profil">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{displayName}</div>
                <div className="text-xs text-white/60 truncate">{email || '—'}</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Lisanslarım">
            <div className="text-xs text-white/60 mb-3">Toplam {licenses.length} lisans</div>
            <ul className="grid gap-2">
              {licenses.map((name) => (<LicenseItem key={name} name={name} />))}
            </ul>
          </GlassCard>
        </div>
      </section>
    </>
  );
}

/* ---------------- LİSANSLARIM ---------------- */

function WarnTooltip({ message, accent = '#f97316' }:{ message:string; accent?:string }) {
  return (
    <span className="relative group inline-flex items-center">
      <FiAlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" aria-hidden />
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100">
        <span className="relative px-3 py-1.5 rounded-2xl bg-black/70 backdrop-blur-xl text-[11px] text-white ring-1 ring-white/10 whitespace-nowrap">
          {message}
          <span className="absolute left-1/2 top-full -translate-x-1/2 w-3 h-3 rotate-45 bg-black/70 ring-1 ring-white/10" />
          <span className="pointer-events-none absolute -z-10 inset-0 blur-xl opacity-80" style={{ background: `radial-gradient(16px 16px at 50% 100%, ${accent}, transparent 60%)` }} />
        </span>
      </span>
    </span>
  );
}

function LicensesSection() {
  type Row = { id:string; product:string; key:string; status:"Aktif"; created:string; devices:number; maxDevices:number; };

  const rows: Row[] = [
    { id:'L-001', product:'Minecraft Market Eklentisi', key:'MCME-1A2B-3C4D-5E6F', status:'Aktif', created:'10.01.2025', devices:4, maxDevices:3 },
    { id:'L-002', product:'Discord Destek Botu',        key:'DDBO-AAAA-BBBB-CCCC', status:'Aktif', created:'22.07.2025', devices:0, maxDevices:2 },
    { id:'L-003', product:'Web Lisans Sistemi',         key:'WLSY-ZZZZ-YYYY-XXXX', status:'Aktif', created:'05.06.2024', devices:0, maxDevices:1 },
  ];

  const [q, setQ] = useState('');
  const [copied, setCopied] = useState<string|null>(null);

  const filtered = useMemo(() => rows.filter(r => (r.product + ' ' + r.key).toLowerCase().includes(q.toLowerCase())), [q]);

  const copy = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); } finally { setCopied(id); setTimeout(() => setCopied(null), 1200); }
  };

  const maskKey = (key: string) => key.replace(/.(?=.{4})/g, '•');
  const StatusBadge = () => (<Badge text="Aktif" cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" />);

  return (
    <section className="grid gap-6">
      <GlassCard title="Lisanslarım">
        {/* Arama */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10 w-full sm:w-96">
            <FiSearch className="text-white/60 shrink-0" />
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Lisans veya anahtar ara…" className="bg-transparent outline-none text-sm placeholder:text-white/50 w-full" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-2 rounded-lg border bg-white/[0.08] border-white/20">Tümü</span>
          </div>
        </div>

        {/* Masaüstü tablo */}
        <div className="hidden md:block overflow-x-auto -mx-1 md:mx-0">
          <table className="min-w-[820px] w-full text-sm">
            <thead>
              <tr className="text-left text-white/60">
                <th className="py-3 pr-3 font-medium">Ürün</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Lisans Anahtarı</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Cihazlar</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Oluşturulma</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Durum</th>
                <th className="py-3 pr-3 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map(r => {
                const overLimit = r.devices > r.maxDevices;
                const critical43 = r.devices === 4 && r.maxDevices === 3;
                const showWarn = overLimit || critical43;
                const warnMsg = critical43
                  ? 'Cihaz sayısı 4/3 olduğu için lisansınız çalışmayacaktır.'
                  : 'Cihaz sayısı limitini aştığınız için lisansınız çalışmayacaktır.';

                return (
                  <tr key={r.id}>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl grid place-items-center bg-white/[0.06] border border-white/10">
                          <FiKey className="w-4 h-4 text-white/70" />
                        </span>
                        <span className="font-medium text-white/90">{r.product}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap"><span className="font-mono tracking-wider">{maskKey(r.key)}</span></td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={showWarn ? 'text-rose-400 font-medium' : undefined}>{r.devices}/{r.maxDevices}</span>
                        {showWarn && <WarnTooltip message={warnMsg} />}
                      </div>
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">{r.created}</td>
                    <td className="py-3 pr-3 whitespace-nowrap"><StatusBadge /></td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => copy(r.key, r.id)}
                          className="h-9 px-3 rounded-lg border border-white/10 hover:bg-white/[0.06] inline-flex items-center gap-2"
                          title="Anahtarı kopyala"
                        >
                          <FiCopy className="opacity-80" />
                          <span className="hidden lg:inline text-xs">{copied===r.id ? 'Kopyalandı' : 'Kopyala'}</span>
                        </button>

                        <button
                      type="button"
                      className="h-9 px-3 rounded-lg border border-white/10 hover:bg-white/[0.06] inline-flex items-center gap-2 cursor-pointer"
                    >
                      <FiDownload className="opacity-80" />
                      <span className="text-xs">İndir</span>
                    </button>

                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-8 text-center text-white/60">Sonuç bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobil kartlar */}
        <div className="md:hidden grid gap-3">
          {filtered.map(r => {
            const overLimit = r.devices > r.maxDevices;
            const critical43 = r.devices === 4 && r.maxDevices === 3;
            const showWarn = overLimit || critical43;
            const warnMsg = critical43
              ? 'Cihaz sayısı 4/3 olduğu için lisansınız çalışmayacaktır.'
              : 'Cihaz sayısı limitini aştığınız için lisansınız çalışmayacaktır.';

            return (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl grid place-items-center bg-white/[0.06] border border-white/10">
                        <FiKey className="w-4 h-4 text-white/70" />
                      </span>
                      <div className="font-medium">{r.product}</div>
                    </div>
                    <div className="mt-2 text-xs text-white/60">Anahtar</div>
                    <div className="font-mono text-sm">{maskKey(r.key)}</div>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/70 items-center">
                      <div>Oluşturulma: <span className="text-white/90">{r.created}</span></div>
                      <div className="flex items-center gap-1.5">
                        Cihazlar: <span className={`text-white/90 ${showWarn ? 'text-rose-400 font-medium' : ''}`}>{r.devices}/{r.maxDevices}</span>
                        {showWarn && <WarnTooltip message={warnMsg} />}
                      </div>
                    </div>
                  </div>
                  <Badge text="Aktif" cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(r.key)}
                    className="h-9 px-3 rounded-lg border border-white/10 hover:bg-white/[0.06] inline-flex items-center gap-2"
                  >
                    <FiCopy className="opacity-80" />
                    <span className="text-xs">Kopyala</span>
                  </button>
 
                  <button
                    className="h-9 px-3 rounded-lg border border-white/10 inline-flex items-center gap-2 opacity-50 cursor-pointer"
                  >
                    <FiDownload className="opacity-80" />
                    <span className="text-xs">İndir</span>
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60">Sonuç bulunamadı.</div>
          )}
        </div>
      </GlassCard>
    </section>
  );
}

/* ---------------- SATIN ALIMLAR (Sadece görüntüleme) ---------------- */

function PurchasesSection(): JSX.Element {    
  type Row = {
  id: string;
  date: string;
  product: string[];
  pay: 'PayTR' | 'Kredi Kartı' | 'Havale/EFT';
  amount: number;
  status: 'Başarılı';
};

const [rows, setRows] = useState<Row[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const orders = await orderService.getOrders();

      const rows: Row[] = await Promise.all(
        orders.map(async (order) => {
          const products = await Promise.all(
            order.productId.map((pid) =>
              productService.getProduct(pid.toString())
            )
          );

          return {
            id: order._id.toString(),
            date: new Date(order.createdAt).toLocaleDateString(),
            product: products.map((p) => p.name['tr']),
            pay: 'Kredi Kartı',
            amount: order.price,
            status: 'Başarılı',
          };
        })
      );

      setRows(rows);
    } catch (err) {
      console.error('Siparişler alınırken hata oluştu:', err);
    } finally {
      setLoading(false); 
    }
  };

  fetchOrders();
}, []); 

const [q, setQ] = useState('');
const filtered = useMemo(() => {
  const t = q.toLowerCase();
  return rows.filter((r) =>
    (r.product.join(' ') +
      ' ' +
      r.pay +
      ' ' +
      r.date +
      ' ' +
      r.amount +
      ' ' +
      r.id)
      .toLowerCase()
      .includes(t)
  );
}, [q, rows]);

  const statusBadge = () => <Badge text="Başarılı" cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" />;

  return (
    <section className="grid gap-6">
      <GlassCard title="Satın Alımlar">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10 w-full sm:w-96">
            <FiSearch className="text-white/60 shrink-0" />
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ürün, ödeme, tarih, tutar ara…" className="bg-transparent outline-none text-sm placeholder:text-white/50 w-full" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-2 rounded-lg border bg-white/[0.08] border-white/20">Tümü</span>
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto -mx-1 md:mx-0">
          <table className="min-w-[820px] w-full text-sm">
            <thead>
              <tr className="text-left text-white/60">
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Tarih</th>
                <th className="py-3 pr-3 font-medium">Ürün</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Ödeme</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Tutar</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Durum</th>
              </tr>
            </thead>
            {
              loading && 
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td colSpan={5} className="py-3 pr-3 whitespace-nowrap text-center ">Siparişler yüklüyor...</td>
                </tr>
              </tbody>
            }
            <tbody className="divide-y divide-white/10">
              {filtered.map(r => (
                <tr key={r.id}>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.date}</td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl grid place-items-center bg-white/[0.06] border border-white/10">
                        <FiCreditCard className="w-4 h-4 text-white/70" />
                      </span>
                      <span className="font-medium text-white/90">{r.product}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.pay}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.amount}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{statusBadge()}</td>
                </tr>
              ))}
              {filtered.length === 0 && !loading && (
                <tr><td colSpan={5} className="py-8 text-center text-white/60">Sonuç bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:hidden grid gap-3">
          {filtered.map(r => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl grid place-items-center bg-white/[0.06] border border-white/10">
                      <FiCreditCard className="w-4 h-4 text-white/70" />
                    </span>
                    <div className="font-medium">{r.product}</div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-white/70">
                    <div>Tarih: <span className="text-white/90">{r.date}</span></div>
                    <div>Ödeme: <span className="text-white/90">{r.pay}</span></div>
                    <div>Tutar: <span className="text-white/90">{r.amount}</span></div>
                    <div className="flex items-center gap-1.5">Durum: {statusBadge()}</div>
                  </div>
                </div>
                {statusBadge()}
              </div>
            </div>
          ))}
          {filtered.length === 0 && !loading && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60">Sonuç bulunamadı.</div>
          )}
        </div>
      </GlassCard>
    </section>
  );
}

/* ---------------- GİRİŞ KAYITLARI (API’dan) ---------------- */

function LoginsSection({ userKey }:{ userKey: string }) {
  type Row = { id:string; ts:string; city:string; region?:string; country?:string; ip:string; ua:string; result:'Başarılı' };
  const [rows, setRows] = useState<Row[]|null>(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!userKey) return;
    const fetch = async () => {
      
    const logs: UserLoginLogType[] = await userLogService.getAllUserLogs(userKey);

      setRows(logs.map(l => ({
        id: l._id ? l._id.toString() : '',
        ts: new Date(l.loginTime).toLocaleString(),
        city: l.city,
        ip: l.ipAddress,
        ua: l.device,
        result: "Başarılı",
      })))
    };
    fetch();
  }, [userKey]);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (rows ?? []).filter(r =>
      (`${r.ts} ${r.city} ${r.region ?? ''} ${r.country ?? ''} ${r.ip} ${r.ua}`).toLowerCase().includes(t)
    );
  }, [rows, q]);

  return (
    <section className="grid gap-6">
      <GlassCard title="Giriş Kayıtları">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10 w-full sm:w-[420px]">
            <FiSearch className="text-white/60 shrink-0" />
            <input
              value={q} onChange={(e)=>setQ(e.target.value)}
              placeholder="Tarih, şehir, IP veya cihaz ara…"
              className="bg-transparent outline-none text-sm placeholder:text-white/50 w-full"
            />
          </div>
        </div>

        {/* Masaüstü */}
        <div className="hidden md:block overflow-x-auto -mx-1 md:mx-0">
          <table className="min-w-[820px] w-full text-sm">
            <thead>
              <tr className="text-left text-white/60">
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Zaman</th>
                <th className="py-3 pr-3 font-medium">Konum</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">IP</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Cihaz</th>
                <th className="py-3 pr-3 font-medium whitespace-nowrap">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows === null && (<tr><td colSpan={5} className="py-8 text-center text-white/60">Yükleniyor…</td></tr>)}
              {rows !== null && filtered.map(r => (
                <tr key={r.id}>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.ts}</td>
                  <td className="py-3 pr-3">{[r.city, r.region, r.country].filter(Boolean).join(', ')}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.ip}</td>
                  <td className="py-3 pr-3 whitespace-nowrap">{r.ua}</td>
                  <td className="py-3 pr-3 whitespace-nowrap"><Badge text="Başarılı" cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" /></td>
                </tr>
              ))}
              {rows !== null && filtered.length === 0 && (<tr><td colSpan={5} className="py-8 text-center text-white/60">Kayıt bulunamadı.</td></tr>)}
            </tbody>
          </table>
        </div>

        {/* Mobil */}
        <div className="md:hidden grid gap-3">
          {rows === null && (<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60">Yükleniyor…</div>)}
          {rows !== null && filtered.map(r => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium">{r.ts}</div>
                  <div className="mt-1 text-xs text-white/70">
                    Konum: <span className="text-white/90">{[r.city, r.region, r.country].filter(Boolean).join(', ')}</span>
                  </div>
                  <div className="text-xs text-white/70">IP: <span className="text-white/90">{r.ip}</span></div>
                  <div className="text-xs text-white/70">Cihaz: <span className="text-white/90">{r.ua}</span></div>
                </div>
                <Badge text="Başarılı" cls="bg-emerald-500/15 text-emerald-300 border-emerald-600/20" />
              </div>
            </div>
          ))}
          {rows !== null && filtered.length === 0 && (<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-white/60">Kayıt bulunamadı.</div>)}
        </div>
      </GlassCard>
    </section>
  );
}

/* ---------------- YÖNETİM (şifre) ---------------- */

function SettingsSection({ name, email }:{ name:string; email:string }) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew2, setShowNew2] = useState(false);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPass2, setNewPass2] = useState('');
  const [msg, setMsg] = useState<{type:'ok'|'err'; text:string} | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    
  }, [session]);
  const submit = async  (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (!oldPass || !newPass || !newPass2) return setMsg({ type:'err', text:'Lütfen tüm alanları doldurun.' });
    if (newPass.length < 8 || !/[A-ZÇĞİÖŞÜ]/.test(newPass) || !/[a-zçğıöşü]/.test(newPass) || !/[0-9]/.test(newPass))
      return setMsg({ type:'err', text:'Yeni şifre en az 8 karakter olmalı ve büyük/küçük harf ile rakam içermelidir.' });
    if (newPass !== newPass2) return setMsg({ type:'err', text:'Yeni şifreler birbiriyle eşleşmiyor.' });

    setOldPass(''); setNewPass(''); setNewPass2('');
    setShowOld(false); setShowNew(false); setShowNew2(false);
    setTimeout(() => setMsg(null), 3000);
    try {
      const res = await userService.resetPassword({
        email: email,
        newPassword: newPass
      })
  
      if(res.status === 200){
        setMsg({ type:'ok', text:'Şifre başarıyla değiştirildi.' });
      }
    }catch(e){
      setMsg({ type:'err', text:'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' });
    }
  };

  const readonlyInput = "bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10 w-full text-sm text-white/80 cursor-not-allowed";

  return (
    <section className="grid gap-6">
      <GlassCard title="Hesap Bilgileri">
        <div className="grid sm:grid-cols-2 gap-3">
          <div><div className="text-xs text-white/60 mb-1">Ad Soyad</div><input value={name} disabled className={readonlyInput} /></div>
          <div><div className="text-xs text-white/60 mb-1">E-posta</div><input value={email || '—'} disabled className={readonlyInput} /></div>
        </div>
        <div className="mt-3 text-xs text-white/50">Diğer bilgiler bu panelden değiştirilemez.</div>
      </GlassCard>

      {
        (session?.user as any)?.accountType !== "discord" && (
        <GlassCard title="Şifre Değiştir">
        <form onSubmit={submit} className="grid gap-3 max-w-xl">
          <div>
            <div className="text-xs text-white/60 mb-1">Mevcut Şifre</div>
            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10">
              <input type={showOld ? 'text' : 'password'} value={oldPass} onChange={(e)=>setOldPass(e.target.value)}
                     className="bg-transparent outline-none text-sm w-full" placeholder="Mevcut şifreniz" />
              <button type="button" onClick={()=>setShowOld(v=>!v)} className="ml-2 opacity-80 hover:opacity-100">
                {showOld ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs text-white/60 mb-1">Yeni Şifre</div>
            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10">
              <input type={showNew ? 'text' : 'password'} value={newPass} onChange={(e)=>setNewPass(e.target.value)}
                     className="bg-transparent outline-none text-sm w-full" placeholder="En az 8 karakter, büyük/küçük harf ve rakam" />
              <button type="button" onClick={()=>setShowNew(v=>!v)} className="ml-2 opacity-80 hover:opacity-100">
                {showNew ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <div className="text-xs text-white/60 mb-1">Yeni Şifre (Tekrar)</div>
            <div className="flex items-center bg-white/[0.04] border border-white/10 rounded-xl px-3 h-10">
              <input type={showNew2 ? 'text' : 'password'} value={newPass2} onChange={(e)=>setNewPass2(e.target.value)}
                     className="bg-transparent outline-none text-sm w-full" placeholder="Yeni şifrenizi tekrar girin" />
              <button type="button" onClick={()=>setShowNew2(v=>!v)} className="ml-2 opacity-80 hover:opacity-100">
                {showNew2 ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <PasswordStrength value={newPass} />
          {msg && <div className={`mt-1 text-sm inline-flex items-center gap-2 ${msg.type==='ok' ? 'text-emerald-300' : 'text-rose-300'}`}>{msg.text}</div>}
          <div className="pt-2">
            <button type="submit" className="h-10 px-4 rounded-xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.10]">Şifreyi Güncelle</button>
          </div>
        </form>
      </GlassCard>
        )
      }
    </section>
  );
}

/* ---------------- SHARED UI ---------------- */

function RailItem({ title, icon, active, danger, onClick, iconColor, activeIconColor }:{
  title:string; icon:React.ReactNode; active?:boolean; danger?:boolean; onClick?:()=>void; iconColor?:string; activeIconColor?:string;
}) {
  const accent = activeIconColor ?? '#8b5cf6';
  const currentIconColor = active ? accent : (iconColor ?? (danger ? '#ef4444' : '#9ca3af'));

  return (
    <button aria-label={title} onClick={onClick}
      className={`group relative w-12 sm:w-14 md:w-full h-12 sm:h-16 rounded-2xl grid place-items-center cursor-pointer overflow-visible transition-all duration-300 ease-out
                  ${active ? 'bg-transparent border border-transparent' : 'border border-transparent hover:bg-white/5'}
                  ${danger ? 'hover:opacity-90' : ''}`} style={{ ['--accent' as any]: accent }}>
      <span className={`hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-[12px] rounded-xl transform-gpu transition-all duration-300 ease-out origin-center
                        ${active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} style={{ backgroundColor: accent }} />
      <span className={`md:hidden absolute -top-3 left-1/2 -translate-x-1/2 h-[8px] w-[24px] rounded-xl transform-gpu transition-all duration-300 ease-out origin-center
                        ${active ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ backgroundColor: accent }} />
      <span className="w-5 h-5 grid place-items-center transition-colors duration-300 ease-out" style={{ color: currentIconColor }}>{icon}</span>
      {/* tooltip */}
      <div className={`pointer-events-none hidden md:block absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 scale-95 -rotate-2
                       group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 transition-all duration-200 ease-out`}>
        <div className="relative p-[1px] rounded-2xl" style={{ background:'radial-gradient(140px 90px at 0% 50%, var(--accent), rgba(255,255,255,0.08) 70%)' }}>
          <div className="relative px-3 py-1.5 rounded-2xl bg-black/70 backdrop-blur-xl text-xs font-medium whitespace-nowrap ring-1 ring-white/10">
            {title}
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-black/70 ring-1 ring-white/10" />
            <span className="pointer-events-none absolute -z-10 inset-0 blur-xl opacity-80"
                  style={{ background:'radial-gradient(16px 16px at 0% 50%, var(--accent), transparent 60%)' }} />
          </div>
        </div>
      </div>
    </button>
  );
}

function StatCard({ title, value, hint }:{ title: string; value: string; hint: string }) {
  return (
    <div className="rounded-3xl p-4 sm:p-5 md:p-6 border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      <div className="text-sm text-white/70">{title}</div>
      <div className="mt-1.5 sm:mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-white/60">{hint}</div>
    </div>
  );
}

function GlassCard({ title, children }:{ title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:py-5 sm:px-5">
      <h2 className="texPıt-base font-semibold mb-2 sm:mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Badge({ text, cls }:{ text:string; cls:string }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-[11px] ${cls}`}>{text}</span>;
}

function LogItem({ dot, text, right }:{ dot:string; text:string; right:string }) {
  return (
    <li className="py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-white/80 truncate">{text}</span>
      </div>
      <span className="text-xs text-white/60 shrink-0 ml-3">{right}</span>
    </li>
  );
}

function LicenseItem({ name }:{ name:string }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 hover:bg-white/[0.06] transition-all duration-200">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-8 h-8 rounded-xl grid place-items-center bg-white/[0.06] border border-white/10 shrink-0">
          <FiKey className="w-4 h-4 text-white/70" />
        </span>
        <span className="text-sm truncate">{name}</span>
      </div>
      <button className="text-xs px-2.5 py-1 rounded-lg border border-white/10 hover:bg-white/5">Detay</button>
    </li>
  );
}

function PasswordStrength({ value }:{ value:string }) {
  const score = (!value ? 0 : 1) + (value.length >= 8 ? 1 : 0) + (/[A-ZÇĞİÖŞÜ]/.test(value) ? 1 : 0) + (/[a-zçğıöşü]/.test(value) ? 1 : 0) + (/[0-9]/.test(value) ? 1 : 0);
  const steps = Math.min(score, 4);
  const labels = ['Zayıf','Orta','İyi','Güçlü'];
  return (
    <div className="mt-1">
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full transition-all duration-300 bg-emerald-400" style={{ width: `${(steps/4)*100}%`, opacity: steps ? 1 : 0.3 }} />
      </div>
      <div className="text-xs text-white/60 mt-1">{steps ? labels[steps-1] : 'Şifre gücü'}</div>
    </div>
  );
}