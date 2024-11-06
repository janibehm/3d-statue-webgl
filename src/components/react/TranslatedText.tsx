import { useEffect, useState } from "react";
import { useTranslations } from "../../i18n/utils";
import { LanguageText } from "../../i18n/translations";

// Make sure the key exists in both language versions
type TranslationKey = keyof (typeof LanguageText)["en"] & keyof (typeof LanguageText)["fi"];

interface TranslatedTextProps {
  translationKey: TranslationKey;
}

export function TranslatedText({ translationKey }: TranslatedTextProps) {
  const [currentLang, setCurrentLang] = useState<keyof typeof LanguageText>("fi");
  const t = useTranslations(currentLang);

  useEffect(() => {
    const savedLang =
      (localStorage.getItem("preferredLanguage") as keyof typeof LanguageText) || "fi";
    setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent<{ lang: string }>) => {
      const { lang } = e.detail;
      if (lang in LanguageText) {
        setCurrentLang(lang as keyof typeof LanguageText);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  // Type assertion to ensure TypeScript knows the key exists
  return <>{t(translationKey as keyof (typeof LanguageText)[typeof currentLang])}</>;
}

// Type declarations for the custom event
declare global {
  interface WindowEventMap {
    languageChange: CustomEvent<{ lang: string }>;
  }
}
