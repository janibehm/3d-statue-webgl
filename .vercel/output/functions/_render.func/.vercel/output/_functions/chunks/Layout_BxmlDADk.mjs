import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro, e as addAttribute, f as renderHead, b as renderComponent, g as renderSlot } from './astro/server_BDG8SIhs.mjs';
/* empty css                         */
import 'clsx';
/* empty css                         */

const DefaultLang = "fi";
const LanguageText = {
  en: {
    "header.slogan": "Web solutions that create a recognizable brand for your business.",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    scrollIndicator: "Scroll down",
    "footer.rights": "All rights reserved",
    hero: "Let's build something magnificent!",
    "whyUs.title": "Why choose us for your website?",
    "whyUs.brand.title": "Brand Uniqueness",
    "whyUs.brand.description": "High-quality websites allow you to present your brand's unique look and message. We can customize the appearance and content of the site to reflect your company's values and goals.",
    "userExperience.title": "User Experience",
    "userExperience.description": "Pages can be optimized to provide a user-friendly experience. This means intuitive navigation, fast load times, and responsive design that works well on all devices.",
    "scalability.title": "Scalability",
    "scalability.description": "Websites can be designed to grow with your business. You can add new features, pages, or integrations.",
    "competitiveAdvantage.title": "Competitive Advantage",
    "competitiveAdvantage.description": "Innovative design and unique content can attract customer interest and encourage them to choose your business.",
    "seo.title": "Search Engine Optimization",
    "seo.description": "Well-structured layout and SEO optimization increase your chances of ranking in search results, which can lead to more traffic and a broader customer base.",
    "professionalism.title": "Professionalism",
    "professionalism.description": "High-quality websites create a professional image for your business, building trust. Well-designed websites can make a difference in customer decision-making.",
    contact: "Get in touch.",
    "footer.company.title": "Company",
    "footer.company.aboutUs": "About Us",
    "footer.company.pricing": "Pricing",
    "footer.company.services": "Services",
    "footer.legal.title": "Terms & Policies",
    "footer.legal.termsOfService": "Terms of Service",
    "footer.legal.privacyPolicy": "Privacy Policy",
    "footer.legal.agreementTerms": "Agreement Terms",
    "footer.legal.cookies": "Cookies",
    "footer.locations.title": "Service Areas",
    "footer.locations.espoo": "Websites Espoo",
    "footer.locations.helsinki": "Websites Helsinki",
    "footer.locations.hameenlinna": "Websites Hämeenlinna",
    "footer.locations.joensuu": "Websites Joensuu",
    "footer.locations.jyvaskyla": "Websites Jyväskylä",
    "footer.locations.kirkkonummi": "Websites Kirkkonummi",
    "footer.locations.kuopio": "Websites Kuopio",
    "footer.locations.lahti": "Websites Lahti",
    "footer.locations.lappeenranta": "Websites Lappeenranta",
    "footer.locations.mikkeli": "Websites Mikkeli",
    "footer.locations.oulu": "Websites Oulu",
    "footer.locations.rovaniemi": "Websites Rovaniemi",
    "footer.locations.savonlinna": "Websites Savonlinna",
    "footer.locations.seinajoki": "Websites Seinäjoki",
    "footer.locations.tampere": "Websites Tampere",
    "footer.locations.turku": "Websites Turku",
    "footer.locations.vaasa": "Websites Vaasa",
    "footer.locations.vantaa": "Websites Vantaa",
    "footer.bottomBar.copyright": "© 2024 Behm Digital. All rights reserved.",
    "footer.bottomBar.privacyPolicy": "Privacy Policy",
    "footer.bottomBar.agreementTerms": "Agreement Terms",
    "footer.bottomBar.cookies": "Cookies"
  },
  fi: {
    "header.slogan": "Verkkoratkaisuja jotka luovat tunnistettavan brändin liiketoiminnallesi.",
    //Nav
    "nav.home": "Etusivu",
    "nav.services": "Palvelut",
    "nav.pricing": "Hinnasto",
    "nav.about": "Tietoa",
    "nav.contact": "Ota Yhteyttä",
    //Scroll Indicator
    scrollIndicator: "Selaa alas",
    //Hero
    hero: "Rakennetaan sinulle jotain upeaa!",
    //Why Us
    "whyUs.title": "Miksi hankkia kotisivut juuri meiltä?",
    "whyUs.brand.title": "Brändin Yksilöllisyys",
    "whyUs.brand.description": "Laadukkaat kotisivut mahdollistavat brändisi ainutlaatuisen ilmeen ja viestin esittämisen. Voimme räätälöidä sivuston ulkoasun ja sisällön vastaamaan yrityksesi arvoja ja tavoitteita.",
    //User Experience
    "userExperience.title": "Käyttäjäkokemus",
    "userExperience.description": "Sivut voidaan optimoida tarjoamaan käyttäjäystävällinen kokemus. Tämä tarkoittaa intuitiivista navigointia, nopeita latausaikoja ja responsiivista designia, joka toimii hyvin kaikilla laitteilla.",
    //Scalability
    "scalability.title": "Skaalautuvuus",
    "scalability.description": "Kotisivut voidaan suunnitella siten, että ne kasvavat yrityksesi mukana. Voit lisätä uusia toimintoja, sivuja tai integraatioita ilman, että koko sivustoa tarvitsee rakentaa uusiksi.",
    //Competitive Advantage
    "competitiveAdvantage.title": "Kilpailuetu",
    "competitiveAdvantage.description": "Innovatiivinen design ja ainutlaatuinen sisältö voivat herättää asiakkaan mielenkiinnon ja houkutella valitsemaan juuri sinun yrityksesi.",
    //SEO
    "seo.title": "Hakusana optimointi",
    "seo.description": "Hyvin suunniteltu rakenne ja SEO optimointi nostavat mahdollisuuksia nousta hakutuloksissa, mikä voi johtaa lisääntyneeseen liikenteeseen ja asiakaskuntaan.",
    //Professionalism
    "professionalism.title": "Ammattimaisuus",
    "professionalism.description": "Laadukkaat kotisivut antavat yrityksestäsi ammattimaisen kuvan, mikä lisää luottamusta. Hyvin suunnitellut websivut voivat tehdä eron asiakkaiden päätöksenteossa.",
    contact: "Ota yhteyttä jo tänään.",
    //Footer
    "footer.company.title": "Yritys",
    "footer.company.aboutUs": "Tietoa meistä",
    "footer.company.pricing": "Hinnasto",
    "footer.company.services": "Palvelut",
    "footer.legal.title": "Ehdot & Käytänteet",
    "footer.legal.termsOfService": "Käyttöehdot",
    "footer.legal.privacyPolicy": "Tietosuojaseloste",
    "footer.legal.agreementTerms": "Sopimusehdot",
    "footer.legal.cookies": "Evästeet",
    "footer.locations.title": "Palvelualueita",
    "footer.locations.espoo": "Kotisivut Espoo",
    "footer.locations.helsinki": "Kotisivut Helsinki",
    "footer.locations.hameenlinna": "Kotisivut Hämeenlinna",
    "footer.locations.joensuu": "Kotisivut Joensuu",
    "footer.locations.jyvaskyla": "Kotisivut Jyväskylä",
    "footer.locations.kirkkonummi": "Kotisivut Kirkkonummi",
    "footer.locations.kuopio": "Kotisivut Kuopio",
    "footer.locations.lahti": "Kotisivut Lahti",
    "footer.locations.lappeenranta": "Kotisivut Lappeenranta",
    "footer.locations.mikkeli": "Kotisivut Mikkeli",
    "footer.locations.oulu": "Kotisivut Oulu",
    "footer.locations.rovaniemi": "Kotisivut Rovaniemi",
    "footer.locations.savonlinna": "Kotisivut Savonlinna",
    "footer.locations.seinajoki": "Kotisivut Seinäjoki",
    "footer.locations.tampere": "Kotisivut Tampere",
    "footer.locations.turku": "Kotisivut Turku",
    "footer.locations.vaasa": "Kotisivut Vaasa",
    "footer.locations.vantaa": "Kotisivut Vantaa",
    "footer.bottomBar.copyright": "© 2024 Behm Digital. Kaikki oikeudet pidätetään.",
    "footer.bottomBar.privacyPolicy": "Tietosuojaseloste",
    "footer.bottomBar.agreementTerms": "Sopimusehdot",
    "footer.bottomBar.cookies": "Evästeet"
  }
};

function getLangFromUrl$1(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in LanguageText) return lang;
  return DefaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return LanguageText[lang]?.[key] || LanguageText[DefaultLang]?.[key] || key;
  };
}

const $$Astro$4 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Footer;
  const lang = getLangFromUrl$1(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<footer class="w-full min-h-[260px] text-white bg-dark-bg"> <div class="container mx-auto px-4 py-8"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8">  <div> <h3 class="text-lg font-bold mb-4"> ${t("footer.company.title")} </h3> <ul class="space-y-2"> <li> <a href="/about" class="hover:text-gray-300">${t("footer.company.aboutUs")}</a> </li> <li> <a href="/pricing" class="hover:text-gray-300">${t("footer.company.pricing")}</a> </li> <li> <a href="/services" class="hover:text-gray-300">${t("footer.company.services")}</a> </li> </ul> </div>  <div> <h3 class="text-lg font-bold mb-4"> ${t("footer.legal.title")} </h3> <ul class="space-y-2"> <li> <a href="/kayttoehdot" class="hover:text-gray-300">${t("footer.legal.termsOfService")}</a> </li> <li> <a href="/tietosuoja" class="hover:text-gray-300">${t("footer.legal.privacyPolicy")}</a> </li> <li> <a href="/sopimusehdot" class="hover:text-gray-300">${t("footer.legal.agreementTerms")}</a> </li> <li> <a href="/evasteet" class="hover:text-gray-300">${t("footer.legal.cookies")}</a> </li> </ul> </div>  <div> <h3 class="text-lg font-bold mb-4"> ${t("footer.locations.title")} </h3> <ul class="space-y-2"> <li> <a href="/kotisivut-espoo" class="hover:text-gray-300">${t("footer.locations.espoo")}</a> </li> <li> <a href="/kotisivut-helsinki" class="hover:text-gray-300">${t("footer.locations.helsinki")}</a> </li> <li> <a href="/kotisivut-hameenlinna" class="hover:text-gray-300">${t("footer.locations.hameenlinna")}</a> </li> <li> <a href="/kotisivut-joensuu" class="hover:text-gray-300">${t("footer.locations.joensuu")}</a> </li> <li> <a href="/kotisivut-jyvaskyla" class="hover:text-gray-300">${t("footer.locations.jyvaskyla")}</a> </li> <li> <a href="/kotisivut-kirkkonummi" class="hover:text-gray-300">${t("footer.locations.kirkkonummi")}</a> </li> <li> <a href="/kotisivut-kuopio" class="hover:text-gray-300">${t("footer.locations.kuopio")}</a> </li> <li> <a href="/kotisivut-lahti" class="hover:text-gray-300">${t("footer.locations.lahti")}</a> </li> <li> <a href="/kotisivut-lappeenranta" class="hover:text-gray-300">${t("footer.locations.lappeenranta")}</a> </li> </ul> </div>  <div class="mt-0 md:mt-[52px]"> <ul class="space-y-2"> <li> <a href="/kotisivut-mikkeli" class="hover:text-gray-300">${t("footer.locations.mikkeli")}</a> </li> <li> <a href="/kotisivut-oulu" class="hover:text-gray-300">${t("footer.locations.oulu")}</a> </li> <li> <a href="/kotisivut-rovaniemi" class="hover:text-gray-300">${t("footer.locations.rovaniemi")}</a> </li> <li> <a href="/kotisivut-savonlinna" class="hover:text-gray-300">${t("footer.locations.savonlinna")}</a> </li> <li> <a href="/kotisivut-seinajoki" class="hover:text-gray-300">${t("footer.locations.seinajoki")}</a> </li> <li> <a href="/kotisivut-tampere" class="hover:text-gray-300">${t("footer.locations.tampere")}</a> </li> <li> <a href="/kotisivut-turku" class="hover:text-gray-300">${t("footer.locations.turku")}</a> </li> <li> <a href="/kotisivut-vaasa" class="hover:text-gray-300">${t("footer.locations.vaasa")}</a> </li> <li> <a href="/kotisivut-vantaa" class="hover:text-gray-300">${t("footer.locations.vantaa")}</a> </li> </ul> </div> </div>  <div class="border-t border-gray-700 mt-8 pt-8"> <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"> <p class="text-sm text-gray-400"> ${t("footer.bottomBar.copyright")} </p> <div class="flex space-x-6"> <a href="/tietosuoja" class="text-sm text-gray-400 hover:text-white">${t("footer.bottomBar.privacyPolicy")}</a> <a href="/sopimusehdot" class="text-sm text-gray-400 hover:text-white">${t("footer.bottomBar.agreementTerms")}</a> <a href="/evasteet" class="text-sm text-gray-400 hover:text-white">${t("footer.bottomBar.cookies")}</a> </div> </div> </div> </div> </footer>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/Footer.astro", void 0);

const $$Astro$3 = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { lang } = Astro2.props;
  const t = useTranslations(lang);
  const navItems = [
    { key: "nav.home", path: `/${lang}` },
    { key: "nav.services", path: `/${lang}/services` },
    { key: "nav.about", path: `/${lang}/about` },
    { key: "nav.contact", path: `/${lang}/contact` }
  ];
  const isHomePage = Astro2.url.pathname === `/${lang}` || Astro2.url.pathname === "/";
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(`side-nav ${isHomePage ? "is-homepage" : ""}`, "class")} id="navigation" data-astro-cid-wvqsyshd> <div class="hamburger" data-astro-cid-wvqsyshd> <span data-astro-cid-wvqsyshd></span> <span data-astro-cid-wvqsyshd></span> <span data-astro-cid-wvqsyshd></span> </div> <ul data-astro-cid-wvqsyshd> ${navItems.map((item) => renderTemplate`<li data-astro-cid-wvqsyshd> <a${addAttribute(item.path, "href")} class="nav-link" data-astro-cid-wvqsyshd> ${t(item.key)} </a> </li>`)} </ul> </nav>  `;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/Navigation.astro", void 0);

const $$Astro$2 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const { pathname } = Astro2.url;
  const isHome = pathname === "/" || pathname === "";
  const lang = getLangFromUrl$1(Astro2.url);
  const t = useTranslations(lang);
  const positionClass = isHome ? "absolute top-0 left-0 right-0" : "relative top-0";
  return renderTemplate`${maybeRenderHead()}<header${addAttribute([
    positionClass,
    "z-50 w-full lg:min-h-[245px] min-h-[240px] flex flex-col justify-center text-white z-[3] bg-dark-bg"
  ], "class:list")}> <div class="px-4 max-w-[90%] mx-auto sm:px-8 md:ml-[60px] md:max-w-none"> <h1 class="text-3xl sm:text-4xl">BEHM Digital</h1> <p class="text-lg leading-relaxed mt-4 sm:text-xl"> ${t("header.slogan")} </p> </div> </header>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/Header.astro", void 0);

const $$Astro$1 = createAstro();
const $$LangButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LangButton;
  const LanguageOptions = ["fi", "en"];
  const { pathname } = Astro2.url;
  const currentLang = pathname.split("/")[1] || "en";
  if (Astro2.cookies.get("lang")?.value !== currentLang) {
    Astro2.cookies.set("lang", currentLang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365
      // 1 year
    });
  }
  return renderTemplate`${maybeRenderHead()}<div id="langButtons" class="fixed bottom-4 right-4 flex gap-4 bg-black p-[0.2rem] rounded shadow-md z-[1000]"> ${LanguageOptions.map((lang) => renderTemplate`<a${addAttribute(`/${lang}${pathname.replace(/^\/(fi|en)/, "")}`, "href")}${addAttribute(`p-2 text-white hover:underline active:underline cursor-pointer
          ${currentLang === lang ? "font-bold underline" : ""}`, "class")}> ${lang.toUpperCase()} </a>`)} </div>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/LangButton.astro", void 0);

function getLangFromUrl(pathname) {
  const lang = pathname.split("/")[1];
  return lang === "en" ? "en" : "fi";
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const lang = getLangFromUrl(Astro2.url.pathname);
  console.log("Current pathname:", Astro2.url.pathname);
  const isHomePage = ["", "/", "/en", "/en/", "/fi", "/fi/"].includes(Astro2.url.pathname);
  const bodyStyle = isHomePage ? {} : { backgroundColor: "hsl(0 0% 100%)" };
  const { title } = Astro2.props;
  const pathname = Astro2.url.pathname;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Websivut yritykselle"><title>${title}</title>${renderHead()}</head> <body${addAttribute(bodyStyle, "style")}> <div style="position: fixed; top: 0; right: 0; background: black; color: white; padding: 10px; z-index: 9999;">
Current path: ${pathname} </div> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "Navigation", $$Navigation, { "lang": lang })} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "LangButton", $$LangButton, {})} ${!isHomePage && renderTemplate`${renderComponent($$result, "Footer", $$Footer, {})}`} </body></html>`;
}, "C:/Users/Jani/Projects/behm-digital/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getLangFromUrl$1 as g, useTranslations as u };
