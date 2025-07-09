import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById } from "@/src/controllers/category.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    return getCategories();
}

export async function PUT(request: NextRequest){
    const{ data } = await request.json();
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return updateCategory(data);
}
export async function DELETE(request: NextRequest){
    const { data } = await request.json();
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return deleteCategory(data);
}
export async function POST(request: NextRequest){
    const { data } = await request.json();
    const auth = await requireAuth(request, ["admin"]);
    if (auth instanceof NextResponse) {
        return auth;
    }
    const user = auth.user;
    if (user.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    return createCategory(data);
}

/**
 * @deprecated
 * This method is deprecated and will be removed in the future.
 */
/*export async function POST(request: NextRequest) {
    const { action, data } = await request.json();
    switch(action){
        case 'getCategories':
            return getCategories(data);
        case 'createCategory':
            const authCreateCategory = await requireAuth(request, ["admin"]);
            if (authCreateCategory instanceof NextResponse) {
                return authCreateCategory;
            }
            const userCreateCategory = authCreateCategory.user;
            if (userCreateCategory.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return createCategory(data);
        case 'updateCategory':
            const authUpdateCategory = await requireAuth(request, ["admin"]);
            if (authUpdateCategory instanceof NextResponse) {
                return authUpdateCategory;
            }
            const userUpdateCategory = authUpdateCategory.user;
            if (userUpdateCategory.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return updateCategory(data);
        case 'deleteCategory':
                const authDeleteCategory = await requireAuth(request, ["admin"]);
                if (authDeleteCategory instanceof NextResponse) {
                    return authDeleteCategory;
                }
                const userDeleteCategory = authDeleteCategory.user;
                if (userDeleteCategory.role !== 'admin') {
                    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
                }
                return deleteCategory(data);
        default:
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
}*/