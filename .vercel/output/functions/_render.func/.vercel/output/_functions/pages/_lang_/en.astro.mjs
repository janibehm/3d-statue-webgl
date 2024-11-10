import { c as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from '../../chunks/astro/server_BDG8SIhs.mjs';
/* empty css                                    */
import { $ as $$Layout } from '../../chunks/Layout_BxmlDADk.mjs';
import { $ as $$ScrollContent } from '../../chunks/ScrollContent_CWfdAw97.mjs';
export { renderers } from '../../renderers.mjs';

async function getStaticPaths() {
  return [{ params: { lang: "en", slug: "en" } }, { params: { lang: "fi", slug: "fi" } }];
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Behm Digital" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "Scene3D", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "C:/Users/Jani/Projects/behm-digital/src/scenes/ThreeScene", "client:component-export": "default" })} ${renderComponent($$result2, "ScrollContent", $$ScrollContent, {})} </main> ` })}`;
}, "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/en/index.astro", void 0);

const $$file = "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/en/index.astro";
const $$url = "/[lang]/en";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
