'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiUser,
  FiBookOpen,
  FiCreditCard,
  FiKey,
  FiHome,
} from 'react-icons/fi';

export default function DashBoardPageComponent() {
  return (
        <main className="flex-1 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-purple-400 mb-6">Lisanslarım</h1>
          <div className="space-y-6 w-full max-w-xl">
            <LicenseCard
              title="asda"
              tags={['MINECRAFT', 'asd']}
              date="15 Ağustos 2021"
              price="150TL"
            />
            <LicenseCard
              title="asdasd"
              tags={['MINEasdCRAFT', 'asd']}
              date="15 Ağustos 2021"
              price="150TL"
            />
            <LicenseCard
              title="asd asdasd Pasdaket"
              tags={['asdasd', 'SCRIPT']}
              date="15 Ağustos 2021"
              price="200TL"
            />
          </div>
        </main>

  );
}





function LicenseCard({
  title,
  tags,
  date,
  price,
}: {
  title: string;
  tags: string[];
  date: string;
  price: string;
}) {
  return (
    <div className="p-4 border border-gray-700 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition w-full bg-[#121212]">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-900 rounded-md border border-gray-700" />
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-purple-800 text-purple-300 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-400 text-center">
        <div>{date}</div>
        <div className="font-semibold text-white">{price}</div>
      </div>
    </div>
  );
}
