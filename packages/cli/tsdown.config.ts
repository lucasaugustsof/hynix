import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'bin',
  dts: true,
  format: ['esm', 'cjs'],
  platform: 'node',
})
