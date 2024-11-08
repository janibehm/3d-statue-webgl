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
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations(currentLang);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage") as keyof typeof LanguageText;
    if (savedLang) {
      setCurrentLang(savedLang);
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent<{ lang: string }>) => {
      const { lang } = e.detail;
      if (lang in LanguageText) {
        setCurrentLang(lang as keyof typeof LanguageText);
        setKey((prev) => prev + 1);
        setIsVisible(true);
      }
    };

    window.addEventListener("languageChange", handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <span
      key={key}
      className={`inline-block ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
      style={{
        animation: isVisible ? "fadeIn 0.8s ease-in-out forwards" : undefined,
      }}
    >
      {t(translationKey)}
    </span>
  );
}

// Add this to your global CSS file (e.g., globals.css)
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fadeIn {
    opacity: 0;
  }
`;

// Insert styles into document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Type declarations for the custom event
declare global {
  interface WindowEventMap {
    languageChange: CustomEvent<{ lang: string }>;
  }
}
