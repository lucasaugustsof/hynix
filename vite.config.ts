import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ALIAS_PACKAGES = {
  '@': 'ui',
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: Object.entries(ALIAS_PACKAGES).map(([key, pathValue]) => ({
      find: key,
      replacement: path.resolve(
        import.meta.dirname,
        `packages/${pathValue}/src`,
      ),
    })),
  },
})
