import { getProductsByCategory } from "@/src/controllers/product.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  return getProductsByCategory(id);
}