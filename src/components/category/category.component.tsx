import { useLanguage } from "@/src/hooks/uselanguage.hooks";
import { CategoryComponentType } from "./category.types";

export default function CategoryComponent(category: CategoryComponentType) {
  const { text, language } = useLanguage();
  console.log(language)
  return (
    <a
      onClick={category.clickHandler}
      className="hover:cursor-pointer relative px-6 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300
                 hover:-translate-y-1 hover:scale-105 transform"
    >
      <span className="relative z-10">{
        category.name[language]
        }</span>
      <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transition-all duration-300 rounded-full" />
    </a>
  );
}
