import { NextRequest } from 'next/server';
import { getShopier } from '@/src/lib/shopier';
import  Order from '@/src/models/order.model';

export async function POST(req: NextRequest) {
    const {
        userId,
        amount,
        buyerName,
        buyerSurname,
        productIds,
        buyerEmail,
        buyerPhone,
    } = await req.json() as {
        userId: string;
        amount: number;
        productName: string;
        buyerName: string;
        buyerSurname: string;
        productIds: string[];
        buyerEmail: string;
        buyerPhone: string;
    };
  const shopier = getShopier();
  try {
    const order = await Order.create({
      userId,
      productIds,
      price: amount,
      quantity: 1,
      status: 'pending',
  })
  shopier.setBuyer({
    buyer_id_nr: userId,
    platform_order_id: order._id.toString(),
    product_name: "Ravenure Bakiye Yükleme",
    buyer_name: buyerName,
    buyer_surname: buyerSurname,
    buyer_email: buyerEmail,
    buyer_phone: buyerPhone,
  });
  
  }catch (error) {
    console.error("Error creating order:", error);
    return new Response("Error creating order", { status: 500 });
  }
  const html = shopier.generatePaymentHTML(amount);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
