import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as createAstro } from './astro/server_BDG8SIhs.mjs';
import 'clsx';

const $$Astro = createAstro();
const $$Services = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  const {
    translations = {
      sections: {
        hero: { title: "", subtitle: "" },
        planning: { title: "", subtitle: "" },
        technical: { title: "", subtitle: "" },
        final: { title: "", subtitle: "" }
      },
      process: {
        initial_meeting: { title: "", description: "", content: [] },
        customer_analysis: { title: "", description: "", content: [] },
        design: { title: "", description: "", content: [] },
        seo: {
          title: "",
          description: "",
          areas: {
            images_and_media: { title: "", description: "" },
            responsiveness: { title: "", description: "" },
            structure: { title: "", description: "" },
            meta_data: { title: "", description: "" }
          }
        },
        development_and_technologies: { description: "", content: [] },
        accessibility: { title: "", description: "", content: [] },
        testing: { title: "", description: "", additional_info: [] },
        launch: { title: "", description: "", additional_info: [] },
        maintenance: { title: "", description: "", content: [] }
      }
    }
  } = Astro2.props;
  const { sections, process } = translations;
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <!-- Hero Section --> <section class="bg-white text-black py-32"> <div class="max-w-6xl mx-auto px-4 text-center"> <h1 class="text-4xl md:text-5xl font-bold mb-4">${sections?.hero?.title}</h1> <p class="text-xl text-gray-600">${sections?.hero?.subtitle}</p> </div> </section> <!-- Planning Phase --> <section class="bg-white text-black py-24"> <div class="max-w-6xl mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold mb-4">${sections?.planning?.title}</h2> <p class="text-xl text-gray-600">${sections?.planning?.subtitle}</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-12"> <!-- Initial Meeting & Customer Analysis --> <div class="space-y-8"> <div> <h3 class="text-xl font-bold mb-4">${process?.initial_meeting?.title}</h3> <p class="text-lg mb-4">${process?.initial_meeting?.description}</p> <ul class="list-disc pl-5 space-y-2"> ${process?.initial_meeting?.content?.map((item) => renderTemplate`<li>${item}</li>`)} </ul> </div> <div> <h3 class="text-xl font-bold mb-4">${process?.customer_analysis?.title}</h3> <p class="text-lg">${process?.customer_analysis?.description}</p> </div> </div> <!-- Design & Development --> <div class="space-y-8"> <div> <h3 class="text-xl font-bold mb-4">${process?.design?.title}</h3> <p class="text-lg mb-4">${process?.design?.description}</p> <ul class="list-disc pl-5 space-y-2"> ${process?.design?.content?.map((item) => renderTemplate`<li>${item}</li>`)} </ul> </div> </div> </div> </div> </section> <!-- Technical Excellence --> <section class="bg-black text-white py-24"> <div class="max-w-6xl mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold mb-4">${sections?.technical?.title}</h2> <p class="text-xl text-gray-600">${sections?.technical?.subtitle}</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-12"> <!-- SEO --> <div> <h3 class="text-2xl font-bold mb-8">${process?.seo?.title}</h3> <p class="text-lg mb-6">${process?.seo?.description}</p> <div class="space-y-4"> ${Object.entries(process?.seo?.areas || {}).map(([key, value]) => renderTemplate`<div class="p-4 bg-gray-900 rounded-lg"> <h4 class="font-bold mb-2 capitalize">${value.title}</h4> <p>${value.description}</p> </div>`)} </div> </div> <!-- Accessibility --> <div> <h3 class="text-2xl font-bold mb-8">${process?.accessibility?.title}</h3> <p class="text-lg mb-6">${process?.accessibility?.description}</p> <ul class="space-y-3"> ${process?.accessibility?.content?.map((item) => renderTemplate`<li class="flex items-center"> <span class="mr-2">•</span> ${item} </li>`)} </ul> </div> </div> </div> </section> <!-- Launch & Beyond --> <section class="bg-white text-black py-24"> <div class="max-w-6xl mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl font-bold mb-4">${sections?.final?.title}</h2> <p class="text-xl text-gray-600">${sections?.final?.subtitle}</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <!-- Testing --> <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">${process?.testing?.title}</h3> <p class="mb-4">${process?.testing?.description}</p> ${process?.testing?.additional_info?.map((info) => renderTemplate`<p class="text-gray-600">${info}</p>`)} </div> <!-- Launch --> <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">${process?.launch?.title}</h3> <p class="mb-4">${process?.launch?.description}</p> <ul class="text-gray-600 space-y-2"> ${process?.launch?.additional_info?.map((info) => renderTemplate`<li>${info}</li>`)} </ul> </div> <!-- Maintenance --> <div class="p-6 bg-gray-100 rounded-lg"> <h3 class="text-xl font-bold mb-4">${process?.maintenance?.title}</h3> <p class="mb-4">${process?.maintenance?.description}</p> <ul class="text-gray-600"> ${process?.maintenance?.content?.map((item) => renderTemplate`<li>${item}</li>`)} </ul> </div> </div> </div> </section> </div>`;
}, "C:/Users/Jani/Projects/behm-digital/src/components/astro/Services.astro", void 0);

export { $$Services as $ };
