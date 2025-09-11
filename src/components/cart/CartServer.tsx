// components/cart/CartServer.tsx
import CartClient from "./CartClient";
import { currentUser } from "@/src/lib/auth/currentUser";
import { CartDTO, getCartForUserEmail } from "@/src/lib/cart/getCart";

export default async function CartServer() {
  const user = await currentUser();
  const email = user?.email;
  const isLoggedIn = !!email;

  let cart: CartDTO = { items: [], total: 0 };
  if (isLoggedIn) {
    cart = await getCartForUserEmail(email);
  }

  return <CartClient user={user!} isLoggedIn={isLoggedIn} initialCart={cart} />;
}
