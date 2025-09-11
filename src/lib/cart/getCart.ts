// lib/cart/getCart.ts (server-only)
import  Cart  from "@/src/models/cart.model";
import { ProductType } from "@/src/models/product.model";

export type CartItemDTO = {
  product: ProductType;
  quantity: number;
};

export type CartDTO = {
  items: CartItemDTO[];
  total: number;
};

export async function getCartForUserEmail(dbId: string): Promise<CartDTO> {
  const cart: any = await Cart.findOne({ userId: dbId })
    .populate('items.productId')
    .lean();
  if (!cart) {
    return { items: [], total: 0 };
  }
  const items = cart.items.map((item: any) => ({
    product: item.productId,
    quantity: item.quantity,
  }));
  let total = 0;
  for (const item of items) {
    const price = item.product.discountPrice || item.product.price;
    total += price * item.quantity;
  }
  return { items, total };
}
