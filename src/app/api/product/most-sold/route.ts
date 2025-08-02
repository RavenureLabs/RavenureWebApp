import { getMostSoldProducts } from "@/src/controllers/product.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    return getMostSoldProducts();
}