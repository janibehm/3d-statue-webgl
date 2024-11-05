import { NavLang, defaultLang } from "./navTranslations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in NavLang) return lang as keyof typeof NavLang;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof NavLang) {
  return function t(key: keyof (typeof NavLang)[typeof defaultLang]) {
    return NavLang[lang][key] || NavLang[defaultLang][key];
  };
}
