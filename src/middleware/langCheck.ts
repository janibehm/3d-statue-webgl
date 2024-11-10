/* // src/middleware/langCheck.ts

import { defineMiddleware } from "astro/middleware";

export const langCheckMiddleware = defineMiddleware(async (context, next) => {
  // First check cookie
  let lang = context.cookies.get("lang")?.value;

  // If no cookie, check browser language
  if (!lang) {
    const acceptLanguage = context.request.headers.get("accept-language") || "";
    // Check if Finnish is one of the preferred languages
    lang = acceptLanguage.includes("fi") ? "fi" : "en";
    // Optionally set the cookie for future requests
    context.cookies.set("lang", lang);
  }

  // Enforce English for non-Finnish
  if (lang !== "fi") {
    return context.redirect("/en/");
  }

  return next();
});
 */
