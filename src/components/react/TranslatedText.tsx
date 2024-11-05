import { useEffect, useState } from "react";
import { useTranslations } from "../../i18n/utils";
import { LanguageText } from "../../i18n/translations";

type TranslationKey = keyof (typeof LanguageText)["en"];

interface TranslatedTextProps {
  translationKey: TranslationKey;
}

export function TranslatedText({ translationKey }: TranslatedTextProps) {
  const [currentLang, setCurrentLang] = useState<"en" | "fi">("fi");

  const t = useTranslations(currentLang);

  useEffect(() => {
    const savedLang = (localStorage.getItem("preferredLanguage") as "en" | "fi") || "fi";
    setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    // Set up language change listener
    const handleLanguageChange = (e: CustomEvent<{ lang: string }>) => {
      const { lang } = e.detail;
      if (lang in LanguageText) {
        setCurrentLang(lang as "en" | "fi");
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <>
      <span className="translation" data-key={translationKey}></span>
      <span data-translation-key={translationKey} className="translated-text">
        {t(translationKey)}
      </span>
    </>
  );
}

// Type declarations for the custom event
declare global {
  interface WindowEventMap {
    languageChange: CustomEvent<{ lang: string }>;
  }
}
