import { languages } from "../../i18n/translations";

interface LanguagePickerProps {
  currentLang: string;
}

const LanguagePicker = ({ currentLang }: LanguagePickerProps) => {
  return (
    <div className="flex gap-4">
      {Object.entries(languages).map(([lang, label]) => (
        <a key={lang} href={`/${lang}${currentLang}`} className="p-2">
          {label}
        </a>
      ))}
    </div>
  );
};

export default LanguagePicker;
