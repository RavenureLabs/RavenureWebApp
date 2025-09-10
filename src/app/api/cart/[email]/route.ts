import { deleteCart, getUserCart } from "@/src/controllers/cart.controller";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;

  const session = await getServerSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!email) {
    return Response.json({ error: "Missing ID" }, { status: 400 });
  }

  if (email !== session.user?.email) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return getUserCart(email);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const { email } = await params;
  return deleteCart(email);
}