export const languages = {
  en: "English",
  fi: "Suomi",
  // Add more languages as needed
};

export const defaultLang = "fi";

export const NavLang = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "footer.rights": "All rights reserved",
    // Add more translations
  },
  fi: {
    "nav.home": "Etusivu",
    "nav.services": "Palvelut",
    "nav.pricing": "Hinnasto",
    "nav.about": "Tietoa",
    "nav.contact": "Yhteydenotto",
    "footer.rights": "Kaikki oikeudet pidätetään",
    // Add more translations
  },
} as const;
