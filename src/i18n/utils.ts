import { LanguageText, DefaultLang } from "./translations";

type TranslationKey = keyof (typeof LanguageText)[typeof DefaultLang];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in LanguageText) return lang as keyof typeof LanguageText;
  return DefaultLang;
}

export function useTranslations(lang: keyof typeof LanguageText) {
  return function t(key: TranslationKey): string {
    return LanguageText[lang]?.[key] || LanguageText[DefaultLang]?.[key] || key;
  };
}
