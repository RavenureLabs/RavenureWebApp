import { NextRequest, NextResponse } from 'next/server';
import { getShopier } from '@/src/lib/shopier';
import { cartService, userService } from '@/src/lib/services';
import {getServerSession} from "next-auth/next";

export const runtime = 'nodejs'; 

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const body: Record<string, any> = {};
  for (const [k, v] of form.entries()) body[k] = v;

  const shopier = getShopier();

  const result = shopier.callback(body); 

  if (result && typeof result === 'object' && 'success' in result && result.success) {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ ok: false, message: 'User not authenticated' });
    }
    const cart = await cartService.getCart(session.user.email);
    if (!cart) {
      return NextResponse.json({ ok: false, message: 'Cart not found' });
    }
    const user = await userService.getUser(session.user.email);
    if (!user) {
      return NextResponse.json({ ok: false, message: 'User not found' });
    }
    const productIds = cart.items.map(item => item.productId);
    await userService.addProducts(session.user.email, { productIds });
    await cartService.deleteCart(session.user.email);
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false });
}
