'use client';

export default function HomePageComponent() {
  return (
    <div className="relative h-[800px] mb-[500px] text-#ffd500">
      {/* Arka Plan Görseli */}
      <img
        src="/wall.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* Blur'lu Koyu Gölge Katmanı */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black via-black/90  z-10 pointer-events-none " />

      {/* İçerik */}
      <div className="relative z-20 flex items-center justify-center w-full h-full">
        <h1 className="text-white text-4xl font-bold">Yazılım Platformu</h1>
      </div>
    </div>
  );
}
