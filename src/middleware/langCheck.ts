// src/middleware/langCheck.ts

import { defineMiddleware } from "astro/middleware";

export const langCheckMiddleware = defineMiddleware(async (context, next) => {
  try {
    // Only handle root path
    const url = new URL(context.request.url);
    if (url.pathname === "/") {
      let lang = context.cookies.get("lang")?.value;

      if (!lang) {
        const acceptLanguage = context.request.headers.get("accept-language") || "";
        lang = acceptLanguage.includes("fi") ? "fi" : "en";
        context.cookies.set("lang", lang);
      }

      return context.redirect(`/${lang}/`);
    }

    return next();
  } catch (error) {
    console.error("Middleware error:", error);
    return next(); // Fallback to continue the request
  }
});
