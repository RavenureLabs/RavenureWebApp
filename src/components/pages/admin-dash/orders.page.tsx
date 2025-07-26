'use client';

import { useState } from "react";

export default function AdminOrdersPageComponent() {
  const [orders, setOrders] = useState<any[]>([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Siparişler</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sipariş No</th>
              <th className="py-2 px-4 border">Müşteri</th>
              <th className="py-2 px-4 border">Tarih</th>
              <th className="py-2 px-4 border">Toplam</th>
              <th className="py-2 px-4 border">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{order.customerName}</td>
                <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{order.total} TL</td>
                <td className="py-2 px-4 border">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}