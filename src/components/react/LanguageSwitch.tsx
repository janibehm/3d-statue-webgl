import { useState } from "react";
import { Languages } from "../../i18n/translations";

interface Props {
  initialLang: "en" | "fi";
}

export default function LanguageSwitch({ initialLang }: Props) {
  const [currentLang, setCurrentLang] = useState(initialLang);

  const switchLanguage = (lang: keyof typeof Languages) => {
    // Get current path without language prefix
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.split("/").slice(2).join("/");

    // Construct new URL
    const newPath = `/${lang}/${pathWithoutLang}`;

    // Update URL without refresh
    window.history.pushState({}, "", newPath);

    // Update state and notify components
    setCurrentLang(lang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));
  };

  return (
    <div className="fixed bottom-4 right-4 flex gap-4 bg-black p-[0.2rem] rounded shadow-md z-[1000]">
      {Object.entries(Languages).map(([lang, label]) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang as keyof typeof Languages)}
          className={`p-2 text-white hover:underline ${currentLang === lang ? "font-bold" : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
