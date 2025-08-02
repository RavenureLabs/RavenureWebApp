'use client';

import { useEffect, useRef } from "react";

export default function PaymentPage() {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        formRef.current?.submit();
    }, []);

    return (
        <form
            ref={formRef}
            method="POST"
            action="https://www.paytr.com/odeme/guvenli"
        >
            <input type="hidden" name="merchant_id" value="PAYTR_MERCHANT_ID" />
            <input type="hidden" name="user_ip" value="127.0.0.1" />
            <input type="hidden" name="merchant_oid" value="SIPARIS_123456" />
            <input type="hidden" name="email" value="test@example.com" />
            <input type="hidden" name="payment_amount" value="1000" />
            <input type="hidden" name="user_name" value="Test Kullanıcı" />
            <input type="hidden" name="user_address" value="Adres buraya" />
            <input type="hidden" name="user_phone" value="5555555555" />
            <input type="hidden" name="merchant_ok_url" value="http://localhost:3000/payment/success" />
            <input type="hidden" name="merchant_fail_url" value="http://localhost:3000/payment/fail" />
            <input type="hidden" name="no_installment" value="0" />
            <input type="hidden" name="currency" value="TL" />
            <input type="hidden" name="timeout_limit" value="30" />
            <input type="hidden" name="test_mode" value="1" />
            <input type="hidden" name="debug_on" value="1" />
            <input type="hidden" name="lang" value="tr" />
            <input type="hidden" name="callback_url" value="http://localhost:3000/api/payment/paytr/callback" />
            <input type="hidden" name="paytr_token" value="PAYTR_TOKEN" />
        </form>
    );
}
