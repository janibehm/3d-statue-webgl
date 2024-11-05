import { LanguageText, defaultLang } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in LanguageText) return lang as keyof typeof LanguageText;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof LanguageText) {
  return function t(key: keyof (typeof LanguageText)[typeof defaultLang]) {
    return LanguageText[lang][key] || LanguageText[defaultLang][key];
  };
}
