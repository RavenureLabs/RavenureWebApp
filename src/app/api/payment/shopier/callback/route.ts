// app/api/payment/shopier/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getShopier } from "@/src/lib/shopier";
import { userService, cartService } from "@/src/lib/services";
import Order from "@/src/models/order.model";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const data = Object.fromEntries(form.entries()) as Record<string, string>;

    const shopier = getShopier();
    const result = shopier.callback(data);

    if (!result || !result.order_id) {
      return NextResponse.json({ ok: false, message: "Invalid callback data" }, { status: 400 });
    }

    const orderId =
      (result.order_id as string) ||
      data["platform_order_id"] ||
      data["order_id"] ||
      data["merchant_oid"];

    if (!orderId) {
      return NextResponse.json({ ok: false, message: "Missing orderId" }, { status: 400 });
    }

    const payment = await Order.findById(orderId);
    if (!payment) {
      return NextResponse.json({ ok: false, message: "Order not found" }, { status: 404 });
    }

    if (payment.status === "paid" || payment.status === "closed" || payment.status === "completed") {
      return new NextResponse("OK");
    }

    await userService.addProducts(payment.userEmail, { productIds: payment.productIds });
    await cartService.deleteCart(payment.userEmail);

    await payment.updateOne({ status: "paid" });

    return new NextResponse("OK");
  } catch (err) {
    console.error("Shopier callback error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/dash", req.url), 302);
}
