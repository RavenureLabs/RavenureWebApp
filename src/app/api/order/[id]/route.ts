import { getOrderById } from "@/src/controllers/order.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const auth = await requireAuth(request, ["admin", "user"]);
    if (auth instanceof NextResponse) return auth;
    if (!id) {
        return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }   
    if (auth.user.role !== "admin" && auth.user.id !== id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return getOrderById(id);
}