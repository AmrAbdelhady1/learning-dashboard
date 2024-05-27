import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import ar from "./locales/ar";

const detectBrowserLanguage = () => {
  const localLang = localStorage.getItem("i18nextLng");
  if(localLang) {
    return localLang;
  }
  const userLanguage = navigator.language
  const languageCode = userLanguage.split('-')[0] === "ar" ? "ar" : "en"; 
  return languageCode;
}

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: detectBrowserLanguage(),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
