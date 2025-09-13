import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/code.ts'],
  format: ['cjs'],
  minify: true,
})
