import { deleteCart, getUserCart } from "@/src/controllers/cart.controller";
import { currentUser } from "@/src/lib/auth/currentUser";
import { getCartForUserEmail } from "@/src/lib/cart/getCart";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await currentUser();
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return Response.json({ error: "Missing ID" }, { status: 400 });
  }

  if (id !== user._id.toString()) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  const cart = await getCartForUserEmail(id);
  if (!cart) {
    return Response.json({ error: "Cart not found" }, { status: 404 });
  }
  return Response.json({ cart }, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return deleteCart(id);
}