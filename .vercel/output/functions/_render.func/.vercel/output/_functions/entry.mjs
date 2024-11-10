import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DnU75l_b.mjs';
import { manifest } from './manifest_P8rbynj7.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_lang_/about.astro.mjs');
const _page2 = () => import('./pages/_lang_/contact.astro.mjs');
const _page3 = () => import('./pages/_lang_/en.astro.mjs');
const _page4 = () => import('./pages/_lang_/palvelut.astro.mjs');
const _page5 = () => import('./pages/_lang_/services.astro.mjs');
const _page6 = () => import('./pages/_lang_/tietoa.astro.mjs');
const _page7 = () => import('./pages/_lang_/yhteydenotto.astro.mjs');
const _page8 = () => import('./pages/_lang_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.10_rollup@4.25.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/[lang]/about/index.astro", _page1],
    ["src/pages/[lang]/contact/index.astro", _page2],
    ["src/pages/[lang]/en/index.astro", _page3],
    ["src/pages/[lang]/palvelut/index.astro", _page4],
    ["src/pages/[lang]/services/index.astro", _page5],
    ["src/pages/[lang]/tietoa/index.astro", _page6],
    ["src/pages/[lang]/yhteydenotto/index.astro", _page7],
    ["src/pages/[lang]/index.astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a6a8069d-ade5-4ad8-9369-20e9d09d45c7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
