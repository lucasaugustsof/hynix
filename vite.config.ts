import path from 'node:path'

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindCSS from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindCSS()],
  resolve: {
    alias: [
      {
        find: 'registry',
        replacement: path.resolve(__dirname, 'packages/react/src'),
      },
    ],
  },
})
