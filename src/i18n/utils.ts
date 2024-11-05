import { LanguageText, DefaultLang } from "./translations";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in LanguageText) return lang as keyof typeof LanguageText;
  return DefaultLang;
}

export function useTranslations(lang: keyof typeof LanguageText) {
  return function t(key: keyof (typeof LanguageText)[typeof DefaultLang]) {
    return LanguageText[lang][key] || LanguageText[DefaultLang][key];
  };
}
