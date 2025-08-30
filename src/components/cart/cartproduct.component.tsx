'use client';

import { productService } from "@/src/lib/services";
import { ProductType } from "@/src/models/product.model";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function CardProductComponent({ productId, quantity, handleDelete }: { productId: ProductType, quantity: number, handleDelete: () => void }) {
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
      const fetchProduct = async () => {
        const product: ProductType = productId;
        setProduct(product!);
      };
      fetchProduct();
    }, [productId]);

    return(
       <div className="pt-0 flex items-center gap-4 group ml-3">
              <img
                src={product?.imageUrl}
                alt="Throwback Hip Bag"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 flex flex-col ml-2">
                <h4 className="text-sm font-medium mb-2">{product?.name["tr"]}</h4>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-white">₺{product?.price}</p>
                  {product?.discountPrice || product?.discountPrice !== 0 && <p className="text-xs line-through text-red-400/70">₺{product?.discountPrice}</p>}
                </div>
              </div>
              <button className="transition cursor-pointer" onClick={handleDelete}>
                <FiTrash2 className="text-gray-400 hover:text-red-600 w-5 h-5 hover:scale-110 transition-all duration-200 mr-3" />
              </button>
        </div>
    )
}