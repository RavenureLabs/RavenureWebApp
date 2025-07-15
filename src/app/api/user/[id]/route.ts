import { getUserByEmail, getUserById } from "@/src/controllers/user.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;
    if(id.includes("@")) return getUserByEmail(id);
    return getUserById(id);
}