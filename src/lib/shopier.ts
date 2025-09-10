import {Shopier} from 'shopier-api';

export function getShopier() {
  return new Shopier(
    process.env.SHOPIER_API_KEY!,
    process.env.SHOPIER_API_SECRET!
  );
}
