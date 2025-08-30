'use client';

import { cartService, productService } from "@/src/lib/services";
import { ProductType } from "@/src/models/product.model";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

export default function ForYouComponent({product, refresh}: {product: ProductType, refresh: () => void}) {

    const {data: session} = useSession();

    const handleAddToCart = async () => {
        const oldItems = await cartService.getCart(session?.user?.email as string);
        const data = {
            email: session?.user?.email,
            items: [
                {
                    productId: product._id.toString(),
                    quantity: 1
                }
            ]
        }
        const response = await cartService.saveCart({...oldItems, ...data});
        if(response){
            refresh();
        }
    }

    return (
        <div className="w-[140px] bg-transparent p-2 rounded-lg cursor-default transition flex flex-col items-center"> {/* Küçülttüm */}
                <div className="w-full aspect-square overflow-hidden rounded-md mb-2 group">
                  <img
                    src={product.imageUrl}
                    alt="Ravenure Ticket Bot"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <p className="text-white text-sm font-medium text-center mb-1 truncate">
                  {product.name["tr"]}
                </p>
                <div className="flex items-center space-x-0.5 text-xs mb-1">
                {[...Array(product.reviews?.rating || 0)].map((_, i) => (
                    <svg key={`filled-${i}`} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
                    </svg>
                ))}

                {[...Array(5 - (product.reviews?.rating || 0))].map((_, i) => (
                    <svg key={`empty-${i}`} className="w-3 h-3 fill-gray-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
                    </svg>
            ))}
                </div>
                <div className="flex items-baseline justify-end w-full px-1 mb-2">
                  {product.discountPrice && <p className="text-xs text-gray-400 line-through mr-1">₺{product.discountPrice}</p>}
                  <p className="text-white font-semibold text-sm">₺{product?.price}</p>
                </div>
                <button onClick={handleAddToCart} className="w-full bg-gradient-to-r from-[#25d170] to-[#139f8b] text-white text-sm py-1.5 rounded-full hover:opacity-90 transition cursor-pointer">
                  Hızlı Ekle
                </button>
              </div>
    )
}