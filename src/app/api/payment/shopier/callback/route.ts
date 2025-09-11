// app/api/payment/shopier/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getShopier } from "@/src/lib/shopier";
import {  userService, cartService } from "@/src/lib/services";
import  Order  from "@/src/models/order.model";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const shopier = getShopier();
  const result = shopier.callback(body); 
  if (!result) {
    return new NextResponse("FAILED", { status: 400 });
  }

  const orderId = result.order_id;
  if (!orderId) return NextResponse.json({ ok: false, message: "Missing orderId" }, { status: 400 });

  const payment = await Order.findById(orderId);
  if (!payment) return NextResponse.json({ ok: false, message: "Order not found" }, { status: 404 });

  if (payment.status === "paid") return new NextResponse("OK");
    await userService.addProducts(payment.userEmail, { productIds: payment.productIds });
    await cartService.deleteCart(payment.userEmail);
    await payment.updateOne({ status: "closed" });

  return new NextResponse("OK");
}

export async function GET(req: NextRequest) {
  return NextResponse.redirect('/dash', 302);
}
