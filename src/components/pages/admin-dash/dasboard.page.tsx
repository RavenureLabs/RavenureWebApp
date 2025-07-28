'use client';

import { orderService, productService, userService } from '@/src/lib/services';
import { useEffect, useState } from 'react';

type DashboardStats = {
  totalUsers: number;
  totalProducts: number;
  totalSales: number;
};

export default function AdminDashBoardPageComponent() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
        const users = await userService.getUsers();
        const products = await productService.getProducts();
        const orders = await orderService.getOrders();

        const data = {
            totalUsers: users.length,
            totalProducts: products.length,
            totalSales: orders.length
        }
        setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Toplam Kullanıcı" value={stats.totalUsers} />
        <DashboardCard title="Toplam Ürün" value={stats.totalProducts} />
        <DashboardCard title="Toplam Satış" value={stats.totalSales} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
