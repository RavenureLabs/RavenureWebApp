import { resetPassword } from "@/src/controllers/user.controller";
import { NextRequest } from "next/server";
import {getServerSession} from "next-auth";
import { currentUser } from "@/src/lib/auth/currentUser";

export async function POST(request: NextRequest) {
    const { data } = await request.json();
    const user = await currentUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    if (user.email !== data.email) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    return resetPassword(data);
}