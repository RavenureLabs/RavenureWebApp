import { NextRequest } from 'next/server';
import { getShopier } from '@/src/lib/shopier';

export async function POST(req: NextRequest) {

    const {
        userId,
        amount,
        buyerName,
        buyerSurname,
        buyerEmail,
        buyerPhone,
    } = await req.json() as {
        userId: string;
        amount: number;
        productName: string;
        buyerName: string;
        buyerSurname: string;
        buyerEmail: string;
        buyerPhone: string;
    };
  const shopier = getShopier();

  shopier.setBuyer({
    buyer_id_nr: userId,
    product_name: "Ravenure Bakiye Yükleme",
    buyer_name: buyerName,
    buyer_surname: buyerSurname,
    buyer_email: buyerEmail,
    buyer_phone: buyerPhone,
  });

  const html = shopier.generatePaymentHTML(amount);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
