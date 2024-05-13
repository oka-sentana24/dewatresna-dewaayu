import { c as create_ssr_component } from "../../chunks/ssr.js";
import "../../chunks/client.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="app"> <main><div>${`<div class="text-center h-screen w-full items-center justify-center flex fixed top-0 left-0 bg-[#fffde7]" data-svelte-h="svelte-1w3x5q8"><div class="absolute"><h1>Please Wait ...</h1></div></div>`}</div></main>  </div>`;
});
export {
  Layout as default
};
