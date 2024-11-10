// src/middleware/langCheck.ts

import { defineMiddleware } from "astro/middleware";

export const langCheckMiddleware = defineMiddleware(async (context, next) => {
  // Only handle root path
  const url = new URL(context.request.url);
  if (url.pathname === "/") {
    let lang = context.cookies.get("lang")?.value;

    // If no cookie, check browser language
    if (!lang) {
      const acceptLanguage = context.request.headers.get("accept-language") || "";
      lang = acceptLanguage.includes("fi") ? "fi" : "en";
      context.cookies.set("lang", lang);
    }

    // Redirect to appropriate language path
    return context.redirect(`/${lang}/`);
  }

  return next();
});
