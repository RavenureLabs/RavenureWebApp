'use client'; // start this component on the client side
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/public/locales/en/common.json";
import translationTR from "@/public/locales/tr/common.json";

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      tr: {
        translation: translationTR,
      },
    },
    lng: "tr",
    fallbackLng: "tr",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18next;