'use client';

import { useSettings } from "@/src/context/settings/settings.context";
import { cartService, orderService, productService } from "@/src/lib/services";
import { CartType } from "@/src/models/cart.model";
import { OrderType } from "@/src/models/order.model";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function PaymentPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const { data: session, status } = useSession();
    const { settings } = useSettings();
    const [cart, setCart] = useState<CartType | null>(null);
    const [token, setToken] = useState("");
    const [ip, setIp] = useState("");
    const [total, setTotal] = useState<number>(0);
    const [userBasket, setUserBasket] = useState<string | null>();
    const [orderCount, setOrderCount] = useState<number | null>(null);
    useEffect(() => {
        if (!session || !session.user || status !== 'authenticated') return;

        const fetchCart = async () => {
            const cart = await cartService.getCart(session?.user?.email as string);
            setCart(cart);
            const orderCount = await orderService.getOrderCount();
            setOrderCount(orderCount);
            
            let totalPrice = await getTotalPrice(cart);
            const kdv = settings?.kdv as number;
            if (kdv && kdv !== 0) {
                totalPrice += (totalPrice * kdv) / 100;
            }
            const totalInteger = Math.round(totalPrice * 100);
            setTotal(totalInteger);

            const ip = await getClientIp();
            setIp(ip);

            const basket = await Promise.all(
            cart.items.map(async (item) => {
                const product = await productService.getProduct(item.productId);
                return [
                product?.name['tr'] || "Ürün",
                (product?.price || 0).toFixed(2),
                item.quantity.toString()
                ];
            })
            );
            setUserBasket(JSON.stringify(basket));
            const res = await fetch('/api/payment/paytr/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant_id: "527145",
                user_ip: ip,
                merchant_oid: `orders${orderCount! + 1}`,
                email: session?.user?.email,
                payment_amount: totalInteger,
                payment_type: "card",
                installment_count: "0",
                currency: "TL",
                test_mode: "1",
                non_3d: "0"
            })
            });

            const data = await res.json();
            setToken(data.token);

            formRef.current?.submit();
        };

        fetchCart();
        }, [session, status]);

    return (
        <form
            ref={formRef}
            method="POST"
            action="https://www.paytr.com/odeme/guvenli"
        >
            <input type="hidden" name="merchant_id" value={settings?.payment.paytr.merchantId ?? ""} />
            <input type="hidden" name="user_ip" value={ip ?? ""} />
            <input type="hidden" name="merchant_oid" value={`order${orderCount! + 1}`} />
            <input type="hidden" name="email" value={session?.user?.email ?? ""} />
            <input type="hidden" datatype="number" name="payment_amount" value={total || 0} />
            <input type="hidden" name="user_name" value={session?.user?.name ?? ""} />
            <input type="hidden" name="user_address" value={"This user hansn't address"} />
            <input type="hidden" name="user_phone" value={(session?.user as any)?.phoneNumber ?? "05437177400"} />
            <input type="hidden" name="user_basket" value={userBasket!} />
            <input type="hidden" name="merchant_ok_url" value="http://localhost:3000/payment/success" />
            <input type="hidden" name="merchant_fail_url" value="http://localhost:3000/payment/fail" />
            <input type="hidden" name="no_installment" value="0" />
            <input type="hidden" name="max_installment" value="0" />
            <input type="hidden" name="currency" value="TL" />
            <input type="hidden" name="timeout_limit" value="30" />
            <input type="hidden" name="test_mode" value="1" />
            <input type="hidden" name="debug_on" value="1" />
            <input type="hidden" name="lang" value="tr" />
            <input type="hidden" name="callback_url" value="http://localhost:3000/api/payment/paytr/callback" />
            <input type="hidden" name="paytr_token" value={token} />
        </form>
    );
}

const getTotalPrice = async (cart: CartType) => {
  let total = 0;

  if (cart?.items && cart.items.length > 0) {
    const prices = await Promise.all(
      cart.items.map(async (item) => {
        const product = await productService.getProduct(item.productId);

        const price =
          typeof product.discountPrice === 'number' && product.discountPrice > 0
            ? product.discountPrice
            : product.price ?? 0;

        const quantity = typeof item.quantity === 'number' ? item.quantity : 1;

        return price * quantity;
      })
    );

    total = prices.reduce((acc, price) => acc + price, 0);
  }

  return total;
};


const getClientIp = async (): Promise<string> => {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
};
