import { createOrder, deleteOrder, getOrders } from "@/src/controllers/order.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return getOrders();
}
export async function POST(request: NextRequest) {
    const body = await request.json();
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return createOrder(body);
}
export async function PUT(request: NextRequest) {
    const data = await request.json();
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return createOrder(data);
}
export async function DELETE(request: NextRequest) {
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return deleteOrder(id);
}