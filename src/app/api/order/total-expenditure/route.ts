import { getOrders } from "@/src/controllers/order.controller";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { OrderType } from "@/src/models/order.model";
import { getUserByEmail } from "@/src/controllers/user.controller";
import { UserType } from "@/src/models/user.model";
import { currentUser } from "@/src/lib/auth/currentUser";
export async function GET(request: NextRequest) {
    let orders: OrderType[] = await (await getOrders()).json();
    const user = await currentUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    orders = orders.filter(order => order.userId.toString() === user._id.toString());
    if(!orders) return new Response(JSON.stringify(0), { status: 200 });    
    return new Response(JSON.stringify(orders.reduce((total, order) => total + order.price, 0)), { status: 200 });    
}