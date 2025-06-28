import { useLanguage } from "@/src/hooks/uselanguage.hooks";
import { ProductType } from "@/src/models/product.model";
import Image from "next/image";
import { text } from "stream/consumers";

export default function ProductComponent(product: ProductType) {
  const {text} = useLanguage(); 
  return(
      <div className="bg-white rounded-xl border border-gray-200 transition-all overflow-hidden flex flex-col items-center max-w-[400px] mx-auto w-full">
        <div className="relative w-full overflow-hidden rounded-t-xl">
          <Image
            src={product.imageUrl || "https://placehold.co/600x400/EEE/31343C"}
            alt={product.name}
            width={400}
            height={200}
            className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
            />
          <div className="absolute bottom-2 right-2 bg-white/90 px-3 py-1 rounded-xl shadow text-sm font-semibold text-[#25d170] flex items-center gap-2">
            ₺{product.discountPrice || product.price}
            <span className="text-gray-400 line-through text-xs">₺{product.price}</span>
          </div>
        </div>
        <div className="flex-1 p-3 flex flex-col justify-between w-full">
          <h3 className="text-lg font-bold text-[#25d170] mb-1">
            <a href="/product-detail/1" className="hover:underline transition">{product.name}</a>
          </h3>
          <span className="inline-flex items-center gap-1 bg-gray-100 text-xs px-2 py-1 rounded mb-2">
            <span className="bg-gradient-to-l from-[#25d170] to-[#139f8b] bg-clip-text text-transparent font-semibold">{product.author}</span>
            <span className="text-gray-600">• {product.category.name}</span>
          </span>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description || text('product.no_description')}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1 text-blue-500">
              <svg className="w-4 h-4 fill-current text-teal-400" viewBox="0 0 24 24"><path d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03z"/></svg>
              <span className="text-gray-700">{product.reviews.rating}</span>
              <span className="text-gray-400">({product.reviews.count} {text('review_count')})</span>
            </div>
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
              </svg>
              <span>{product.salesCount} {text('sales_count')}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="/store/product1" className="w-1/2 text-center px-3 py-2 bg-[#25d170] text-white text-sm font-medium rounded-xl hover:bg-[#139f8b] transition">
              {text('buy')}
            </a>
            <a href="/product-detail/1" className="w-1/2 text-center px-3 py-2 border border-[#25d170] text-[#25d170] text-sm font-medium rounded-xl hover:bg-[#25d170]/10 transition">
              {text('preview')}
            </a>
          </div>
        </div>
      </div>
    )
}