import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/registry',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  test: {
    include: ['./src/**/*.spec.{ts,tsx}'],
    setupFiles: ['./__tests__/setup.ts'],
    globals: true,
    coverage: {
      enabled: true,
      reporter: 'html',
      cleanOnRerun: true,
      provider: 'v8',
    },
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        {
          browser: 'chromium',
        },
      ],
      headless: false,
    },
  },
})
