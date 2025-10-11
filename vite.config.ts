import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const ALIAS = {
	"@": path.resolve(import.meta.dirname, "packages/react/src"),
};

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: Object.entries(ALIAS).map(([key, value]) => ({
			find: key,
			replacement: value,
		})),
	},
});
