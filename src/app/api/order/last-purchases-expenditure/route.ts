import { getOrders } from "@/src/controllers/order.controller";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { OrderType } from "@/src/models/order.model";
import { getUserByEmail } from "@/src/controllers/user.controller";
import { UserType } from "@/src/models/user.model";
export async function GET(request: NextRequest) {
    let orders: OrderType[] = await (await getOrders()).json();
    const session = await getServerSession();
    const user: UserType = (await (await getUserByEmail((session?.user as any).email)).json()).user;
    orders = orders.filter(order => order.userId.toString() === user._id.toString());
    // again filter last 30 days
    orders = orders.filter(order => new Date(order.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    if(!orders) return new Response(JSON.stringify(0), { status: 200 });    
    return new Response(JSON.stringify(orders.reduce((total, order) => total + order.price, 0)), { status: 200 });    
}