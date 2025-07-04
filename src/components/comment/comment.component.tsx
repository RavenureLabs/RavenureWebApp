"use client";

import { CommentComponentType } from "./comment.types";

export default function CommentComponent({ author, text }: CommentComponentType) {
    return(
        <>
            <p className="text-gray-400 italic max-w-xl mx-auto mb-4">
              “Ravenure botları sayesinde sunucumuzu bambaşka bir seviyeye taşıdık. Destek ekibi harika ve ürünler çok kaliteli!”
            </p>
            <span className="text-[#25d170] font-semibold">— Discord Sunucu Sahibi</span>
        </>
    )
}