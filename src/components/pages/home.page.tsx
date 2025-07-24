'use client';

export default function HomePageComponent() {
  return (
    <div className="relative h-[800px] mb-[500px] text-#ffd500">
      <img
        src="/wall.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* İçerik */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <h1 className="text-white text-4xl font-bold">Yazılım Platformu</h1>
      </div>
    </div>
  );
}
