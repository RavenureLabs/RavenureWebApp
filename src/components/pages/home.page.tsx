'use client';

export default function HomePageComponent() {
  return (
    <div className="relative overflow-hidden before:absolute before:top-1/2 before:start-1/2 before:bg-[url('/hyperdrive.svg')] dark:before:bg-[url('/hyperdrive.svg')] before:bg-no-repeat before:bg-center before:w-full before:h-96 before:-z-1 before:transform before:-translate-y-1/2 before:-translate-x-1/2">
      <div className="max-w-3xl mx-auto relative text-center px-4 sm:px-6 lg:px-8 py-10 md:py-24">
        <div className="inline-block bg-gradient-to-tl from-[#25d170] via-transparent to-[#139f8b] p-px rounded-xl mb-3">
          <div className="bg-white rounded-xl py-1.5 px-3 text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:bg-neutral-900">
            <span className="bg-clip-text bg-gradient-to-tl from-[#25d170] to-[#139f8b] text-transparent">
              RAVENURE LABS
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl lg:leading-tight dark:text-white">
          Starter Pages & Examples
        </h1>

        <p className="mt-4 md:text-lg text-gray-600 dark:text-neutral-400">
          Free Tailwind CSS resources as building blocks for websites and web applications. Browse pre-built sections, forms, modals, and more.
        </p>

        {/* Butonlar Ortalanmış */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition">
            Projene Başla
          </button>
          <button className="px-6 py-3 border-2 border-[#139f8b] text-[#139f8b] font-semibold rounded-lg hover:bg-[#139f8b]/10 transition">
            Daha Fazla Bilgi
          </button>
        </div>
      </div>
    </div>
  );
}
