import * as universal from '../entries/pages/about/_page.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/+page.ts";
export const imports = ["_app/immutable/nodes/3.DYXn8Rcf.js","_app/immutable/chunks/index.R8ovVqwX.js","_app/immutable/chunks/scheduler.C0FFGZse.js","_app/immutable/chunks/index.CKuX_8to.js"];
export const stylesheets = [];
export const fonts = [];
