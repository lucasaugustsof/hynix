import type { lilconfig } from 'lilconfig'

import type { HynixManifest } from './manifest'

type LilConfigSearchOptions = Parameters<typeof lilconfig>[1]

export const CWD = process.cwd()
export const MANIFEST_FILE_NAME = 'hynix.json'

export const LIL_CONFIG_SEARCH_OPTIONS: LilConfigSearchOptions = {
  cache: false,
  searchPlaces: [MANIFEST_FILE_NAME],
  ignoreEmptySearchPlaces: false,
}

export const PEER_DEPENDENCIES = ['react', 'react-dom', 'tailwindcss'] as const
export const CORE_DEPENDENCIES = [
  '@ark-ui/react',
  '@remixicon/react',
  'clsx',
  'tailwind-merge',
  'tailwind-variants',
  'tw-animate-css',
] as const

export const DEFAULT_MANIFEST: HynixManifest = {
  aliases: {
    components: '@/components',
    styles: '@/styles',
    utils: '@/utils',
  },
  rsc: false,
}
