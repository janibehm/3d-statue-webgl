import { c as createComponent, r as renderTemplate, b as renderComponent, a as createAstro, m as maybeRenderHead } from '../chunks/astro/server_BDG8SIhs.mjs';
/* empty css                                 */
import { $ as $$Layout } from '../chunks/Layout_BxmlDADk.mjs';
import { $ as $$ScrollContent } from '../chunks/ScrollContent_CWfdAw97.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return [
    { params: { lang: "fi" } },
    // Finnish at root
    { params: { lang: "en" } }
    // English at /en
  ];
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Behm Digital" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Scene3D", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Jani/Projects/behm-digital/src/scenes/ThreeScene", "client:component-export": "default" })} ${renderComponent($$result2, "ScrollContent", $$ScrollContent, { "lang": lang })} </main> ` })}`;
}, "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/index.astro", void 0);

const $$file = "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
