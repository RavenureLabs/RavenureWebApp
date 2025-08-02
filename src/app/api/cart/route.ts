import { getUserCart, updateOrCreate } from "@/src/controllers/cart.controller";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();

    if (!session.user || body.email !== session.user.email) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    return updateOrCreate(body.email, body);
}