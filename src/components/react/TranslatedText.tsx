import { useTranslations } from "../../i18n/utils";
import { LanguageText } from "../../i18n/translations";

type TranslationKey = keyof (typeof LanguageText)["en"] & keyof (typeof LanguageText)["fi"];

interface TranslatedTextProps {
  translationKey: TranslationKey;
  lang: "en" | "fi";
}

export function TranslatedText({ translationKey, lang }: TranslatedTextProps) {
  const t = useTranslations(lang);
  return <span>{t(translationKey)}</span>;
}
