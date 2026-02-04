import type { lilconfig } from 'lilconfig'

type LilConfigSearchOptions = Parameters<typeof lilconfig>[1]

export const CWD = process.cwd()
export const MANIFEST_FILE_NAME = 'hynix.json'

export const LIL_CONFIG_SEARCH_OPTIONS: LilConfigSearchOptions = {
  cache: false,
  searchPlaces: [MANIFEST_FILE_NAME],
  ignoreEmptySearchPlaces: false,
}

export const PEER_DEPENDENCIES = ['react', 'react-dom', 'tailwindcss']
