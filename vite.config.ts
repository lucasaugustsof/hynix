/// <reference types="vitest" />
import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@/registry',
        replacement: path.resolve(__dirname, 'packages/react/src'),
      },
    ],
  },
  test: {
    include: ['./src/**/*.spec.{ts,tsx}'],
    setupFiles: [path.resolve('../..', 'vitest.setup.ts')],
    globals: true,
    coverage: {
      enabled: true,
      reporter: 'html',
      cleanOnRerun: true,
      provider: 'v8',
      reportsDirectory: path.resolve(__dirname, 'coverage'),
      exclude: ['./__stories__/*'],
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
