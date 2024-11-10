import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro } from './astro/server_BDG8SIhs.mjs';
import 'clsx';
import { g as getLangFromUrl, u as useTranslations } from './Layout_BxmlDADk.mjs';

const $$Astro = createAstro();
const $$ScrollContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ScrollContent;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`---
${maybeRenderHead()}<div> <main class="absolute text-white z-[1] grid grid-cols-12 pointer-events-auto top-[70vh]
          w-[100%]
          md:w-[35%] md:top-[400px] md:left-[2%]"> <blockquote class="col-span-12 mb-spacing
            sm:col-span-10 sm:col-start-2
            md:col-start-1"> <h1 class="text-white bg-transparent lg:text-3xl md:text-3xl pl-4 text-5xl relative w-full max-w-[800px]"> <span id="animated-text" class="block w-full leading-none whitespace-nowrap text-sm sm:text-base md:text-lg"> ${t("hero")} </span> </h1> <div class="h-[50vh] col-span-12"></div>  <section class="col-span-full w-screen bg-dark-bg text-base leading-relaxed mb-spacing
              sm:col-span-10 sm:col-start-2 sm:w-full sm:px-8
              md:text-xl pt-8 pb-8"> <h2 class="font-['exo'] font-bold py-4 lg:text-2xl md:text-2xl text-2xl px-4 sm:px-0"> ${t("whyUs.title")} </h2> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("whyUs.brand.title")} </h3> <p class="mb-6"> ${t("whyUs.brand.description")} </p> </div> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("userExperience.title")} </h3> <p class="mb-6"> ${t("userExperience.description")} </p> </div> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("scalability.title")} </h3> <p class="mb-6"> ${t("scalability.description")} </p> </div> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("competitiveAdvantage.title")} </h3> <p class="mb-6"> ${t("competitiveAdvantage.description")} </p> </div> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("seo.title")} </h3> <p class="mb-6"> ${t("seo.description")} </p> </div> <div class="feature w-full px-4 sm:px-0 sm:max-w-[95%] sm:mx-auto"> <h3 class="font-['exo'] font-bold py-4 text-xl"> ${t("professionalism.title")} </h3> <p class="mb-6"> ${t("professionalism.description")} </p> </div> </section> <section class="col-span-full w-screen text-base leading-relaxed mb-spacing
              sm:col-span-10 sm:col-start-2 sm:w-full sm:px-8
              md:text-xl"> <h2 class="font-['Exo'] font-bold py-4 text-1xl px-4 sm:px-0"> ${t("contact")} </h2> </section>  <div class="h-[50vh] col-span-12"></div> </blockquote> </main> </div>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/ScrollContent.astro", void 0);

export { $$ScrollContent as $ };
