import * as server from '../entries/pages/sverdle/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.Bcxa5Dcm.js","_app/immutable/chunks/scheduler.C0FFGZse.js","_app/immutable/chunks/each.2P9_2KxJ.js","_app/immutable/chunks/index.CKuX_8to.js","_app/immutable/chunks/entry.CCZsLkYK.js","_app/immutable/chunks/index.BcTZRQbh.js"];
export const stylesheets = ["_app/immutable/assets/4.DOkkq0IA.css"];
export const fonts = [];
