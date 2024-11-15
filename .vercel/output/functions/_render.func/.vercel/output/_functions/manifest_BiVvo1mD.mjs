import { e as decodeKey } from './chunks/astro/server_C-c8yy3O.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_2OX7k7vy.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Jani/Projects/behm-digital/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"en/about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/about","isIndex":true,"type":"page","pattern":"^\\/en\\/about\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/about/index.astro","pathname":"/en/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/contact","isIndex":true,"type":"page","pattern":"^\\/en\\/contact\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/contact/index.astro","pathname":"/en/contact","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/services/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/services","isIndex":true,"type":"page","pattern":"^\\/en\\/services\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/services/index.astro","pathname":"/en/services","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"palvelut/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/palvelut","isIndex":true,"type":"page","pattern":"^\\/palvelut\\/?$","segments":[[{"content":"palvelut","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/palvelut/index.astro","pathname":"/palvelut","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"tietoa/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tietoa","isIndex":true,"type":"page","pattern":"^\\/tietoa\\/?$","segments":[[{"content":"tietoa","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tietoa/index.astro","pathname":"/tietoa","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"yhteydenotto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/yhteydenotto","isIndex":true,"type":"page","pattern":"^\\/yhteydenotto\\/?$","segments":[[{"content":"yhteydenotto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/yhteydenotto/index.astro","pathname":"/yhteydenotto","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.16.10_rollup@4.25.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Jani/Projects/behm-digital/src/pages/en/contact/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/en/services/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/palvelut/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/tietoa/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Jani/Projects/behm-digital/src/pages/yhteydenotto/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/en/about/index@_@astro":"pages/en/about.astro.mjs","\u0000@astro-page:src/pages/en/contact/index@_@astro":"pages/en/contact.astro.mjs","\u0000@astro-page:src/pages/en/services/index@_@astro":"pages/en/services.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/palvelut/index@_@astro":"pages/palvelut.astro.mjs","\u0000@astro-page:src/pages/tietoa/index@_@astro":"pages/tietoa.astro.mjs","\u0000@astro-page:src/pages/yhteydenotto/index@_@astro":"pages/yhteydenotto.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.16.10_rollup@4.25.0_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/Jani/Projects/behm-digital/node_modules/.pnpm/astro@4.16.10_rollup@4.25.0_typescript@5.6.3/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/form/en.json":"chunks/en_Dxrv5o2T.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/hero/en.json":"chunks/en_CoDUuPyI.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/services/en.json":"chunks/en_Dm-ocVf5.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/services/fi.json":"chunks/fi_lwsZ1zwV.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/hero/fi.json":"chunks/fi_CFDhjs6F.mjs","C:/Users/Jani/Projects/behm-digital/src/i18n/form/fi.json":"chunks/fi_D5q9zr4x.mjs","C:/Users/Jani/Projects/behm-digital/node_modules/.pnpm/@astrojs+react@3.6.2_@types+react-dom@18.3.1_@types+react@18.3.12_react-dom@18.3.1_react@18.3_f4pelyb3aaafrdc4st5b52asue/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","\u0000@astrojs-manifest":"manifest_BiVvo1mD.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BAGc4B9j.js","@astrojs/react/client.js":"_astro/client.OmarFtJ-.js","C:/Users/Jani/Projects/behm-digital/src/scenes/ThreeScene":"_astro/ThreeScene.BTbONwGc.js","/astro/hoisted.js?q=1":"_astro/hoisted.B1x0TAUY.js","/astro/hoisted.js?q=2":"_astro/hoisted.DyawRkwD.js","C:/Users/Jani/Projects/behm-digital/src/components/react/ContactForm":"_astro/ContactForm.CSWCMKMX.js","C:/Users/Jani/Projects/behm-digital/src/components/react/ContactForm.tsx":"_astro/ContactForm.0SZCM5SU.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.BAKCfk6Q.css","/800px-Op_under_Fjeldet_toner_en_Lur.jpg","/favicon.svg","/models/earth.glb","/models/Lucy-transformed.glb","/models/Lucy.glb","/models/Lucy100k.bin","/models/Lucy100k.gltf","/textures/painted-worn-asphalt_albedo.jpg","/textures/painted-worn-asphalt_normal-ogl.jpg","/_astro/client.DPbFRP4-.js","/_astro/client.OmarFtJ-.js","/_astro/ContactForm.0SZCM5SU.js","/_astro/ContactForm.CSWCMKMX.js","/_astro/hoisted.B1x0TAUY.js","/_astro/hoisted.BAGc4B9j.js","/_astro/hoisted.DyawRkwD.js","/_astro/index.DhYZZe0J.js","/_astro/jsx-runtime.C0Vhfwdg.js","/_astro/ThreeScene.BTbONwGc.js","/en/about/index.html","/en/contact/index.html","/en/services/index.html","/en/index.html","/palvelut/index.html","/tietoa/index.html","/yhteydenotto/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"K7nCsB33al/51UUqwvOUmK6M81G/u6gaEhs6GCu1aCM=","experimentalEnvGetSecretEnabled":false});

export { manifest };
