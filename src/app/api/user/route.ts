import {
    createUser,
    deleteUser,
    getAllUsers,
    updateUser
} from "@/src/controllers/user.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

function ensureAdmin(user: any) {
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return null;
}

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) return auth;

    const check = ensureAdmin(auth.user);
    if (check) return check;

    return getAllUsers();
}

export async function PUT(request: NextRequest) {
    const data = await request.json();
    const auth = await requireAuth(request, ['user', 'admin']);
    if (auth instanceof NextResponse) return auth;

    const user = auth.user;
    const isAdmin = user.role === 'admin';
    const isSelf = user.email === data.email;

    if (!isAdmin && !isSelf) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return updateUser(data);
}

export async function DELETE(request: NextRequest) {
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) return auth;

    const check = ensureAdmin(auth.user);
    if (check) return check;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    return deleteUser(id);
}

export async function POST(request: NextRequest) {
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) return auth;

    const check = ensureAdmin(auth.user);
    if (check) return check;

    const data = await request.json();
    return createUser(data);
}
