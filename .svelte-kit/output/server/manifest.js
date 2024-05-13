export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","asset/.DS_Store","asset/dewa-tresna/CHE08455.jpg","asset/dewa-tresna/CHE08467.jpg","asset/dewa-tresna/CHE08476.jpg","asset/dewa-tresna/CHE08480.jpg","asset/dewa-tresna/CHE08483.jpg","asset/dewa-tresna/CHE08496.jpg","asset/dewa-tresna/CHE08501.jpg","asset/dewa-tresna/CHE08512.jpg","favicon.png","musik/Sezairi-It-s-You.mp3","robots.txt","svelte-welcome.png"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".mp3":"audio/mpeg",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.D7XoC-NE.js","app":"_app/immutable/entry/app.DxgXp9aY.js","imports":["_app/immutable/entry/start.D7XoC-NE.js","_app/immutable/chunks/entry.CCZsLkYK.js","_app/immutable/chunks/scheduler.C0FFGZse.js","_app/immutable/chunks/index.BcTZRQbh.js","_app/immutable/entry/app.DxgXp9aY.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js","_app/immutable/chunks/scheduler.C0FFGZse.js","_app/immutable/chunks/index.CKuX_8to.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/sverdle",
				pattern: /^\/sverdle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
