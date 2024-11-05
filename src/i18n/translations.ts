export const languages = {
  en: "English",
  fi: "Suomi",
};

export const defaultLang = "fi";

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
    "whyUs.title": "Why choose us for your website?",
    "whyUs.brand.title": "Brand Uniqueness",
    "whyUs.brand.description":
      "High-quality websites allow you to present your brand's unique look and message. We can customize the appearance and content of the site to reflect your company's values and goals.",
    "userExperience.title": "User Experience",
    "userExperience.description":
      "Pages can be optimized to provide a user-friendly experience. This means intuitive navigation, fast load times, and responsive design that works well on all devices.",
    "scalability.title": "Scalability",
    "scalability.description":
      "Websites can be designed to grow with your business. You can add new features, pages, or integrations.",
    "competitiveAdvantage.title": "Competitive Advantage",
    "competitiveAdvantage.description":
      "Innovative design and unique content can attract customer interest and encourage them to choose your business.",
    "seo.title": "Search Engine Optimization",
    "seo.description":
      "Well-structured layout and SEO optimization increase your chances of ranking in search results, which can lead to more traffic and a broader customer base.",
    "professionalism.title": "Professionalism",
    "professionalism.description":
      "High-quality websites create a professional image for your business, building trust. Well-designed websites can make a difference in customer decision-making.",
    contact: "Get in touch.",
  },
  fi: {
    "header.slogan": "Verkkoratkaisuja jotka luovat tunnistettavan brändin liiketoiminnallesi.",
    "nav.home": "Etusivu",
    "nav.services": "Palvelut",
    "nav.pricing": "Hinnasto",
    "nav.about": "Tietoa",
    "nav.contact": "Yhteydenotto",
    scrollIndicator: "Selaa alas",
    "footer.rights": "Kaikki oikeudet pidätetään",
    hero: "Rakennetaan sinulle jotain upeaa!",
    "whyUs.title": "Miksi hankkia kotisivut juuri meiltä?",
    "whyUs.brand.title": "Brändin Yksilöllisyys",
    "whyUs.brand.description":
      "Laadukkaat kotisivut mahdollistavat brändisi ainutlaatuisen ilmeen ja viestin esittämisen. Voimme räätälöidä sivuston ulkoasun ja sisällön vastaamaan yrityksesi arvoja ja tavoitteita.",
    "userExperience.title": "Käyttäjäkokemus",
    "userExperience.description":
      "Sivut voidaan optimoida tarjoamaan käyttäjäystävällinen kokemus. Tämä tarkoittaa intuitiivista navigointia, nopeita latausaikoja ja responsiivista designia, joka toimii hyvin kaikilla laitteilla.",

    "scalability.title": "Skaalautuvuus",
    "scalability.description":
      "Kotisivut voidaan suunnitella siten, että ne kasvavat yrityksesi mukana. Voit lisätä uusia toimintoja, sivuja tai integraatioita ilman, että koko sivustoa tarvitsee rakentaa uusiksi.",

    "competitiveAdvantage.title": "Kilpailuetu",
    "competitiveAdvantage.description":
      "Innovatiivinen design ja ainutlaatuinen sisältö voivat herättää asiakkaan mielenkiinnon ja houkutella valitsemaan juuri sinun yrityksesi.",

    "seo.title": "Hakusana optimointi",
    "seo.description":
      "Hyvin suunniteltu rakenne ja SEO optimointi nostavat mahdollisuuksia nousta hakutuloksissa, mikä voi johtaa lisääntyneeseen liikenteeseen ja asiakaskuntaan.",

    "professionalism.title": "Ammattimaisuus",
    "professionalism.description":
      "Laadukkaat kotisivut antavat yrityksestäsi ammattimaisen kuvan, mikä lisää luottamusta. Hyvin suunnitellut websivut voivat tehdä eron asiakkaiden päätöksenteossa.",
    contact: "Ota yhteyttä jo tänään.",
  },
} as const;

// Add this after your LanguageText definition
export type TranslationKey = keyof (typeof LanguageText)["en"];
