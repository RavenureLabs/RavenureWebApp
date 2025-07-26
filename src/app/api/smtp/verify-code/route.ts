import { verifyEmailCode } from "@/src/lib/smtp/base.smtp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, code } = await request.json();
    if (!email || !code) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const isValid = await verifyEmailCode(email, code);
    if (isValid) {
        return NextResponse.json({ message: "Email verification successful" }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid email or code" }, { status: 400 });
}