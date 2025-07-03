import { useLanguage } from "@/src/hooks/uselanguage.hooks";
import { CategoryComponentType } from "./category.types";

export default function CategoryComponent(category: CategoryComponentType) {
    const { text } = useLanguage();
    return(
          <a href={category.href} className="relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300">
              <span className="relative z-10">{category.name}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full" />
          </a>
    )
}