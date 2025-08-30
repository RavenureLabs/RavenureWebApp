import { resetPassword } from "@/src/controllers/user.controller";
import { NextRequest } from "next/server";
import {getServerSession} from "next-auth";

export async function POST(request: NextRequest) {
    const { data } = await request.json();
    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    if (session.user?.email !== data.email) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    return resetPassword(data);
}