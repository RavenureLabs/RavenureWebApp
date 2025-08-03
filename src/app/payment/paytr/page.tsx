'use client';

import { useSettings } from "@/src/context/settings/settings.context";
import { cartService, productService } from "@/src/lib/services";
import { CartType } from "@/src/models/cart.model";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function PaymentPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const { data: session, status } = useSession();
    const { settings } = useSettings();
    const [cart, setCart] = useState<CartType | null>(null);
    const [token, setToken] = useState("");
    const [ip, setIp] = useState("");
    const [total, setTotal] = useState(0);
    useEffect(() => {
        if (!session || !session.user || status !== 'authenticated') return;

        const fetchCart = async () => {
            const cart = await cartService.getCart(session?.user?.email as string);
            setCart(cart);
            
            const totalPrice = await getTotalPrice(cart);
            setTotal(totalPrice);

            const ip = await getClientIp();
            setIp(ip);

            const basket = await Promise.all(
            cart.items.map(async (item) => {
                const product = await productService.getProduct(item.productId);
                return {
                name: product?.name || "",
                price: product?.price || 0,
                quantity: item.quantity
                };
            })
            );

            const res = await fetch('/api/payment/paytr/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merchant_id: settings?.payment.paytr.merchantId,
                user_ip: ip,
                merchant_oid: `orders_${new Date().getTime()}`,
                email: session?.user?.email,
                payment_amount: totalPrice,
                user_basket: JSON.stringify(basket),
                no_installment: "0",
                max_installment: "0",
                currency: "TL",
                test_mode: "1",
                merchant_salt: ""
            })
            });

            const data = await res.json();
            setToken(data.paytr_token);

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
            <input type="hidden" name="merchant_oid" value={`orders_${new Date().getTime()}`} />
            <input type="hidden" name="email" value={session?.user?.email ?? ""} />
            <input type="hidden" name="payment_amount" value={total || 0} />
            <input type="hidden" name="user_name" value={session?.user?.name ?? ""} />
            <input type="hidden" name="user_address" value={"This user hansn't address"} />
            <input type="hidden" name="user_phone" value={(session?.user as any)?.phone ?? ""} />

            <input type="hidden" name="merchant_ok_url" value="http://localhost:3000/payment/success" />
            <input type="hidden" name="merchant_fail_url" value="http://localhost:3000/payment/fail" />
            <input type="hidden" name="no_installment" value="0" />
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
                return (product?.price || 0) * item.quantity;
            })
        );
        total = prices.reduce((acc, price) => acc + price, 0);
    }
    return total;
}

const getClientIp = async (): Promise<string> => {
  const res = await fetch('https://api.ipify.org?format=json');
  const data = await res.json();
  return data.ip;
};
