// app/store/page.tsx
import ShopPageComponent from "@/src/components/pages/store.page";
import { currentUser } from "@/src/lib/auth/currentUser";
import { productService, categoryService } from "@/src/lib/services";

export const metadata = {
  title: "Ravenure - Mağaza",
  description: "Ravenure Mağaza",
};

export default async function StorePage() {
  // Giriş kontrolü
  const user = await currentUser();
  const isLoggedIn = !!user;

  // SSR data fetch
  const [products, categories] = await Promise.all([
    productService.getProducts(),
    categoryService.getCategories(),
  ]);

  return (
    <ShopPageComponent
      products={products || []}
      categories={categories || []}
      isLoggedIn={isLoggedIn}
    />
  );
}
