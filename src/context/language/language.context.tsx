
"use client";
import { createContext, useState, useEffect } from "react";
import en from "@/public/locales/en.json";
import tr from "@/public/locales/tr.json";

type Translations = typeof en;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
}

const defaultLanguage = "tr"; 

function getTranslations(lang: string): Translations {
  switch (lang) {
    case "tr":
      return tr;
    case "en":
    default:
      return en;
  }
}

export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  translations: getTranslations(defaultLanguage),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>(
    getTranslations(defaultLanguage)
  );

  useEffect(() => {
    setTranslations(getTranslations(language));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
