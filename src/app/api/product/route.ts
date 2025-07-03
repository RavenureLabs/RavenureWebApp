import { getProducts, createProduct, updateProduct, deleteProduct, getProductsByCategory, getProductById } from "@/src/controllers/product.controller";
import { requireAuth } from "@/src/lib/middleware/auth";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const { action, data } = await request.json();
    switch(action){
        case 'getProducts':
            return getProducts(data);
        case 'getProductById':
            return getProductById(data);
        case "getProducstByCategory":
            return getProductsByCategory(data);
        case 'createProduct':
            const authCreateProduct = await requireAuth(request, ["admin"]);
            if (authCreateProduct instanceof NextResponse) {
                return authCreateProduct;
            }
            const userCreateProduct = authCreateProduct.user;
            if (userCreateProduct.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return createProduct(data);
        case 'updateProduct':
            const authUpdateProduct = await requireAuth(request, ["admin"]);
            if (authUpdateProduct instanceof NextResponse) {
                return authUpdateProduct;
            }
            const userUpdateProduct = authUpdateProduct.user;
            if (userUpdateProduct.role !== 'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return updateProduct(data);
        case 'deleteProduct':
            const authDeleteProduct = await requireAuth(request, ["admin"]);
            if (authDeleteProduct instanceof NextResponse) {
                return authDeleteProduct;
            }
            const userDeleteProduct = authDeleteProduct.user;
            if (userDeleteProduct.role !==
                'admin') {
                return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
            return deleteProduct(data);
        default:
            return new Response('Invalid action', { status: 400 });
    }
}