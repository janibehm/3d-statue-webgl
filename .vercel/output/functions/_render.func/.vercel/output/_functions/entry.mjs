import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DnU75l_b.mjs';
import { manifest } from './manifest_goBmaRL5.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/en/about.astro.mjs');
const _page2 = () => import('./pages/en/contact.astro.mjs');
const _page3 = () => import('./pages/en/services.astro.mjs');
const _page4 = () => import('./pages/en.astro.mjs');
const _page5 = () => import('./pages/palvelut.astro.mjs');
const _page6 = () => import('./pages/tietoa.astro.mjs');
const _page7 = () => import('./pages/yhteydenotto.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');


const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.16.10_rollup@4.25.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/en/about/index.astro", _page1],
    ["src/pages/en/contact/index.astro", _page2],
    ["src/pages/en/services/index.astro", _page3],
    ["src/pages/en/index.astro", _page4],
    ["src/pages/palvelut/index.astro", _page5],
    ["src/pages/tietoa/index.astro", _page6],
    ["src/pages/yhteydenotto/index.astro", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "3007e488-b6e8-4b6a-9ac6-fc6b7973fc65",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
