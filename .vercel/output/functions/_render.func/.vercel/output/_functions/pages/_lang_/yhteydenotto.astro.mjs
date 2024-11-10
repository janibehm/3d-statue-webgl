import { _ as __variableDynamicImportRuntimeHelper } from '../../chunks/dynamic-import-helper_uMTE3ehW.mjs';
import { c as createComponent, r as renderTemplate, b as renderComponent, a as createAstro } from '../../chunks/astro/server_BDG8SIhs.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BxmlDADk.mjs';
import { C as ContactForm } from '../../chunks/ContactForm_z0bGNep7.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    { params: { lang: "en", slug: "contact" } },
    { params: { lang: "fi", slug: "yhteydenotto" } }
  ];
}
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  if (!["en", "fi"].includes(lang)) {
    return new Response(null, {
      status: 404,
      statusText: "Not found"
    });
  }
  const translations = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"../../../i18n/form/en.json": () => import('../../chunks/en_CxBujKZc.mjs'),"../../../i18n/form/fi.json": () => import('../../chunks/fi_lNdAmkYX.mjs')})), `../../../i18n/form/${lang}.json`, 6);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": lang }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "initialLang": lang, "translations": translations.default, "client:component-hydration": "load", "client:component-path": "@/components/react/ContactForm", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/yhteydenotto/index.astro", void 0);

const $$file = "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/yhteydenotto/index.astro";
const $$url = "/[lang]/yhteydenotto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
