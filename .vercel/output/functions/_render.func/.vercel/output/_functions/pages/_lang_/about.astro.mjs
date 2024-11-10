import { c as createComponent, r as renderTemplate, b as renderComponent } from '../../chunks/astro/server_BDG8SIhs.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BxmlDADk.mjs';
import { $ as $$About } from '../../chunks/About_DlUYTZQI.mjs';
export { renderers } from '../../renderers.mjs';

async function getStaticPaths() {
  return [{ params: { lang: "en" } }, { params: { lang: "fi" } }];
}
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Services", $$About, {})} ` })}`;
}, "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/about/index.astro", void 0);

const $$file = "C:/Users/Jani/Projects/behm-digital/src/pages/[lang]/about/index.astro";
const $$url = "/[lang]/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
