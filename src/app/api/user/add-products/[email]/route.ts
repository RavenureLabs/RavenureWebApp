import User from "@/src/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    try {
        const { email } = await params;
        const data = await req.json();
        if(req.headers.get("x-secret") !== process.env.API_SECRET_KEY) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        if (!email || !data || !data.productIds || !Array.isArray(data.productIds)) {
            return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        user.products = user.products.concat(data.productIds);
        await user.save();
        return new Response(JSON.stringify( { success: true }), { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 }); 
    }
}