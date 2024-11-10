export type Language = "fi" | "en";

export function getLangFromUrl(pathname: string): Language {
  const lang = pathname.split("/")[1];
  return lang === "en" ? "en" : "fi";
}
