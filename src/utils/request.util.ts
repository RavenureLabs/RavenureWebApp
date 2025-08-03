import { NextResponse } from "next/server";

export const ensureAdmin = (user: any) => {
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return null;
}

export const isLoggedIn = (user: any) => user !== null;