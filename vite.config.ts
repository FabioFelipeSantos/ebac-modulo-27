import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(function ({ command, mode }) {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		mode: command,
		define: {
			"process.env.BROWSER": JSON.stringify(env.BROWSER),
		},
		server: {
			open: true,
		},
		plugins: [vue()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	};
});
