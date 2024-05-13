import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// Configure the server to serve files from the public directory
		fs: {
			allow: ['public']
		}
	}

});
