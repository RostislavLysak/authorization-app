import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ua from "./locales/ua.json";

const resources = {
  en,
  uk: ua,
};

export const DEFAULT_LOCALE = "en";
export const LOCALES = {
  en: "en",
  uk: "uk",
};

const locale = (localStorage.getItem("lang") || navigator.language) as string;

i18n.use(initReactI18next).init({
  resources,
  lng: !(locale in LOCALES) ? DEFAULT_LOCALE : locale,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
