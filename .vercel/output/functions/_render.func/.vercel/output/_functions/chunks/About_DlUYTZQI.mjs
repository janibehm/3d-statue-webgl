import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro } from './astro/server_BDG8SIhs.mjs';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$About = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <!-- Alternating Sections --> <section class="bg-white h-[70vh] text-black py-24"> <div class="max-w-6xl mx-auto px-4"> <h2 class="text-3xl font-bold mb-8">about</h2> <p class="text-lg leading-relaxed">Your content here...</p> </div> </section> <section class="bg-black text-white py-24"> <div class="max-w-6xl mx-auto px-4"> <h2 class="text-3xl font-bold mb-8">Section Title</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div> <p class="text-lg leading-relaxed">Left column content...</p> </div> <div> <p class="text-lg leading-relaxed">Right column content...</p> </div> </div> </div> </section> <section class="bg-white h-[70vh] text-black py-24"> <div class="max-w-6xl mx-auto px-4"> <h2 class="text-3xl font-bold mb-8">Section Title</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8">  <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">Feature 1</h3> <p>Feature description...</p> </div> <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">Feature 2</h3> <p>Feature description...</p> </div> <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">Feature 3</h3> <p>Feature description...</p> </div> </div> </div> </section> </div>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/About.astro", void 0);

export { $$About as $ };
