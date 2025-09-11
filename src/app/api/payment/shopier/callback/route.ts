// app/api/payment/shopier/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getShopier } from "@/src/lib/shopier";
import {  userService, cartService } from "@/src/lib/services";
import  Order  from "@/src/models/order.model";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const shopier = getShopier();
  const result = shopier.callback(await req.json()); 
  const data = await req.json();
  console.log("Shopier Callback Result:", result);
  console.log("Full Request Body:",  data);
  if (result === false) {
    return new NextResponse(JSON.stringify({result, data })), { status: 200 };
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
