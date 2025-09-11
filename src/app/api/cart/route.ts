import {  updateOrCreate } from "@/src/controllers/cart.controller";
import { currentUser } from "@/src/lib/auth/currentUser";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const user = await currentUser();
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const body = await request.json();

    if (body.userId !== user._id.toString()) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    return updateOrCreate(body.userId, body);
}
