'use client'
import { api } from "@/src/lib/api";
import { orderService } from "@/src/lib/services";
import { useSession } from "next-auth/react";
import { useEffect } from "react"

export default function WeepayPage() {

    const {data: session, status} = useSession();

    useEffect(() => {
        const fetch = async () => {
            if(!session && status === "unauthenticated") {
                window.location.href = "/login";
                return;
            }
            const orderCount = await orderService.getOrderCount();

            await api.post('/api/payment/weepay/create', {
                OrderId: "order-" + orderCount +1,
                description: "order-" + orderCount+1,
                callBackUrl: "http://localhost:3000/api/payment/weepay/callback",
                customerId: session?.user?.email,
                customerName: session?.user?.name,
                customerSurname: "",
                gsmNumber: (session?.user as any)?.phoneNumber || "",
                email: session?.user?.email as string
            });
        }
        fetch();
    }, [session, status]);
    return (
        <div>
        </div>
    )
}