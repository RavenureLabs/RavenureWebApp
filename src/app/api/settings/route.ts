import { getSettings, updateSettings } from "@/src/controllers/settings.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { ensureAdmin } from "@/src/utils/request.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) {
        return getSettings(0); // guest
    };
    if(auth.user.role === 'admin'){
        return getSettings(2); // admin
    }else {
        return getSettings(1); // user
    }
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const auth = await requireAuth(request, ['admin']);
    if (auth instanceof NextResponse) return auth;

    const check = ensureAdmin(auth.user);
    if (check) return check;

    return updateSettings(data);
}