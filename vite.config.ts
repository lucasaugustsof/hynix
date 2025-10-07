import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { type AliasOptions, defineConfig } from 'vite'

function getAliases(): AliasOptions {
  const paths = {
    '@': 'packages/react/src',
  }

  return Object.entries(paths).map(([key, pathValue]) => ({
    find: key,
    replacement: path.resolve(import.meta.dirname, pathValue),
  }))
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: getAliases(),
    },
  }
})
