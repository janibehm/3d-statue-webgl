import { Languages, defaultLang } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in Languages) return lang as keyof typeof Languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof Languages) {
  return function t(key: keyof (typeof Languages)[typeof defaultLang]) {
    return Languages[lang][key] || Languages[defaultLang][key];
  };
}
