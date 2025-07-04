import { connectToDatabase } from "@/src/lib/database";
import commentModel from "@/src/models/comment.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectToDatabase();
    try{
        const comments = await commentModel.find();
        return new Response(JSON.stringify(comments), { status: 200 });
    }catch (error) {
        console.error("Error fetching comments:", error);
        return new Response(JSON.stringify({ message: "Error fetching comments", error }), { status: 500 });
    }
}