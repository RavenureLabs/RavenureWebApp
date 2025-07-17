import { getCategoryById } from "@/src/controllers/category.controller";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params as { id: string };
  return getCategoryById(id);
}