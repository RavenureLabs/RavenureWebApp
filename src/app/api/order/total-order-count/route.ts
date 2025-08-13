import { getOrders } from "@/src/controllers/order.controller";

export async function GET() {
    const orders = await (await getOrders()).json();
    if(!orders) return new Response(JSON.stringify(0), { status: 200 });
    return new Response(JSON.stringify(orders.length), { status: 200 });
}