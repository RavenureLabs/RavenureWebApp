import { getUserByEmail } from "@/src/controllers/user.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = await params;
    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), { status: 404 });
    }
    try {
        const user = await getUserByEmail(email);
        if (user.status === 200) {
            return new Response(JSON.stringify({ registeryStatus: true }), { status: 202 });
        }
        return new Response(JSON.stringify({registeryStatus: false}), { status: 202 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
}