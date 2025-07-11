import { register } from "@/src/controllers/user.controller";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { data } = await request.json();
    return register(data);
}