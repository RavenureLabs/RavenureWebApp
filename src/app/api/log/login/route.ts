import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { insertUserLog } from "@/src/controllers/userLog.controller";
import { currentUser } from "@/src/lib/auth/currentUser";
import { use } from "react";
export async function POST(request: NextRequest) {
    const user = await currentUser();
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    const data = await request.json();
    const {userId} = data;
    if(!userId) return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    if(user._id.toString() !== userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    
    return insertUserLog(data);
}