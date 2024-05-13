import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.BbtvnZre.js","_app/immutable/chunks/scheduler.C0FFGZse.js","_app/immutable/chunks/index.CKuX_8to.js","_app/immutable/chunks/each.2P9_2KxJ.js","_app/immutable/chunks/index.SwE9B5Ev.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/index.BcTZRQbh.js"];
export const stylesheets = ["_app/immutable/assets/2.C7X2bgY3.css"];
export const fonts = [];
