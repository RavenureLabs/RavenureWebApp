import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { insertUserLog } from "@/src/controllers/userLog.controller";
export async function POST(request: NextRequest) {
    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const data = await request.json();
    const {userId} = data;
    if(!userId) return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    if((session.user as any)?._id.toString() !== userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    
    return insertUserLog(data);
}