// app/api/payment/shopier/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getShopier } from "@/src/lib/shopier";
import { userService, cartService } from "@/src/lib/services";
import Order, { OrderType } from "@/src/models/order.model";
import User, { UserType } from "@/src/models/user.model";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

function toObjectFromUrlEncoded(raw: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams(raw).entries());
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, string>;

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const raw = await req.text();   
      data = toObjectFromUrlEncoded(raw);
    } else if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      data = Object.fromEntries(form.entries()) as Record<string, string>;
    } else {
      const raw = await req.text();
      data = toObjectFromUrlEncoded(raw);
    }

    const shopier = getShopier();
    const result = shopier.callback(data);

    if (!result || (typeof result.order_id !== "undefined" && !result.order_id)) {
      return new NextResponse("FAILED", { status: 400 });
    }

    const orderId =
      (result.order_id as string) ||
      data["platform_order_id"] ||
      data["order_id"] ||
      data["merchant_oid"];

    if (!orderId) {
      return new NextResponse("FAILED", { status: 400 });
    }

    const payment = await Order.findById(orderId);
    if (!payment) {
      return new NextResponse("FAILED", { status: 404 });
    }

    if (["paid", "closed", "completed"].includes(payment.status)) {
      return new NextResponse("OK"); 
    }

    const user: UserType | null = await User.findById(payment.userId);
    if (!user) {
      return new NextResponse("FAILED", { status: 404 });
    }

    await userService.addProducts(user.email, { productIds: payment.productIds });
    await cartService.deleteCart(user.email);

    await payment.updateOne({ status: "paid" });
const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Yönlendiriliyor…</title>
    <meta http-equiv="refresh" content="0;url=/dash" />
    <script>window.location.replace('/dash');</script>
    <noscript><a href="/dash">Devam etmek için tıklayın</a></noscript>
  </head>
  <body>OK</body>
</html>
`;
return new NextResponse(html, {
  status: 200,
  headers: { "content-type": "text/html; charset=utf-8" }
});
  } catch (e) {
    console.error("Shopier callback error:", e);
    return new NextResponse("FAILED", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.redirect(new URL("/dash", req.url), 302);
}
