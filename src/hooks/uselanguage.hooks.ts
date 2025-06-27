// src/hooks/useLanguage.ts
"use client";
import { useContext } from "react";
import { LanguageContext } from "@/src/context/language/language.context";

function getNestedValue(obj: any, key: string): string {
  const result = key.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, obj);

  return typeof result === "string" ? result : key;
}

export function useLanguage() {
  const { language, setLanguage, translations } = useContext(LanguageContext);

  const text = (key: string): string => getNestedValue(translations, key);

  return { language, setLanguage, text };
}
