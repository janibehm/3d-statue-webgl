export const Languages = {
  en: "English",
  fi: "Suomi",
};

export const DefaultLang = "fi";

export const LanguageText = {
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
    //Introduction
    "about.introduction.title": "Welcome to a creative agency",
    "about.introduction.subtitle":
      "In our projects, design meets modern technology to shape the future of online presence.",
    "about.introduction.description":
      "We specialize in creating unique brand identities and custom web solutions that resonate with your target audience. Harnessing Finnish innovation and advanced technology, we bring your vision to life with stylish solutions that set your brand apart.",
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
    "footer.bottomBar.cookies": "Cookies",
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
    //Introduction
    "about.introduction.title": "Visio",
    "about.introduction.subtitle":
      "Projekteissamme design kohtaa modernin teknologian muovaten verkkonäkyvyyden tulevaisuutta.",
    "about.introduction.description":
      "Olemme erikoistuneet luomaan ainutlaatuisia brändi-identiteettejä ja kustomoituja verkkoratkaisuja, jotka puhuttelevat kohdeyleisöäsi. Suomalaista innovaatiota, sekä huipputeknologiaa hyödyntäen tuomme visiosi eloon tyylikkäillä ratkaisuilla, jotka erottavat brändisi muista.",
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
    "footer.bottomBar.cookies": "Evästeet",
  },
} as const;

// Add this after your LanguageText definition
export type TranslationKey = keyof (typeof LanguageText)["en"];
