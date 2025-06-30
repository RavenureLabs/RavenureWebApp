import { getReferances, createReferance, updateReferance, deleteReferance, getReferanceById } from "@/src/controllers/referances.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const { action, data } = await request.json();
    switch(action){
        case 'getReferances':
            return getReferances(data);
        case 'getReferanceById':
            return getReferanceById(data);
        case 'createReferance':
            const authCreateReferance = await requireAuth(request, ["admin"]);
            if (authCreateReferance instanceof NextResponse) {
                return authCreateReferance;
            }
            const userCreateReferance = authCreateReferance.user;
            if (userCreateReferance.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return createReferance(data);
            case 'updateReferance':
            const authUpdateReferance = await requireAuth(request, ["admin"]);
            if (authUpdateReferance instanceof NextResponse) {
                    return authUpdateReferance;
                }
                const userUpdateReferance = authUpdateReferance.user;
                if (userUpdateReferance.role !== 'admin') {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
                }
                return updateReferance(data);
            case 'deleteReferance':
                const authDeleteReferance = await requireAuth(request, ["admin"]);
                if (authDeleteReferance instanceof NextResponse) {
                    return authDeleteReferance;
                }
                const userDeleteReferance = authDeleteReferance.user;
                if (userDeleteReferance.role !== 'admin') {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
                }
                return deleteReferance(data);
             default:
                return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }    
    }