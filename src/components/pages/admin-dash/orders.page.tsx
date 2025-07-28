'use client';

import { orderService, productService, userService } from "@/src/lib/services";
import { useEffect, useState } from "react";

export default function AdminOrdersPageComponent() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() =>{
    const fetchOrders = async () => {
      const orders: any[] = await orderService.getOrders();
      for (const order of orders) {
        order.createdAt = new Date(order.createdAt);
        order.userId = await userService.getUser(order.userId);
        order.product = (await productService.getProduct(order.productId)).name['tr'];
      }
      setOrders(orders);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Siparişler</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sipariş No</th>
              <th className="py-2 px-4 border">Urun</th>
              <th className="py-2 px-4 border">Müşteri</th>
              <th className="py-2 px-4 border">Tarih</th>
              <th className="py-2 px-4 border">Toplam</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="py-2 px-4 border">{order._id}</td>
                <td className="py-2 px-4 border">{order.product}</td>
                <td className="py-2 px-4 border">{order.userId.name}</td>
                <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border">{order.price} TL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}