// Create a global state to track if we've checked the language
export const languageState = {
  currentLang: "fi" as "fi" | "en",
};

// Function to initialize language state
export function getCurrentLanguage() {
  if (typeof window === "undefined") return "fi";
  const urlLang = window.location.pathname.split("/")[1];
  return urlLang === "en" || urlLang === "fi" ? urlLang : "fi";
}
