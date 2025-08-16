import { getAllUserLogs } from "@/src/controllers/userLog.controller";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
    const { email } = await params;
    if(!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    if (session.user?.email !== email) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    
    return getAllUserLogs(email);
}