// Create a global state to track if we've checked the language
export const languageState = {
  isChecked: false,
  currentLang: "fi" as "fi" | "en",
};

// Function to initialize language state
export function initLanguageState() {
  if (typeof window === "undefined") return;

  const savedLang = localStorage.getItem("preferredLanguage") as "fi" | "en";
  if (savedLang) {
    languageState.currentLang = savedLang;
  }
  languageState.isChecked = true;
}
