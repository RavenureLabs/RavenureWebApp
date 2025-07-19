import sendEmail from "@/src/lib/smtp/base.smtp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { from, to, subject } = await request.json();
    sendEmail({
        from: from,
        to: to,
        subject: subject
    });
    return NextResponse.json({ message: "Email sent successfully" });
}