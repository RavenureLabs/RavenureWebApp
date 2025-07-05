"use client";

import { CommentType } from "@/src/models/comment.model";

export default function CommentComponent({ author, text }: CommentType) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-gray-400 italic max-w-xl mx-auto mb-4">
        “{text}”
      </p>
      <span className="text-[#25d170] font-semibold">— {author}</span>
    </div>
  );
}
