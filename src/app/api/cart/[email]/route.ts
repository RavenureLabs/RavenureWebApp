import { getUserCart } from "@/src/controllers/cart.controller";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = await params;
    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    if(!email) return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    if(email !== session.user?.email) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    return getUserCart(email);
}