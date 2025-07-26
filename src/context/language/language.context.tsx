
"use client";
import { createContext, useState, useEffect } from "react";
import en from "@/src/config/locales/en.json";
import tr from "@/src/config/locales/tr.json";

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
      return en;
    default:
      return tr;
  }
}

export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  translations: getTranslations(defaultLanguage),
});

export function LanguageProvider({ children, lang }: { children: React.ReactNode, lang: string }) {
  const [language, setLanguageState] = useState(lang);
  const [translations, setTranslations] = useState<Translations>(getTranslations(lang));

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLanguageState(storedLang);
      setTranslations(getTranslations(storedLang));
    }
  }, []);

  const setLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    setLanguageState(lang);
    setTranslations(getTranslations(lang));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}
