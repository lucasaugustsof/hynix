export const HYNIX_LOGO = String.raw`
 _                 _
| |__  _   _ _ __ (_)_  __
| '_ \| | | | '_ \| \ \/ /
| | | | |_| | | | | |>  <
|_| |_|\__, |_| |_|_/_/\_\
       |___/
`

export const CWD = process.cwd()
export const CONFIG_FILE_NAME = 'hynix.json'

export const PEER_DEPENDENCIES = ['react', 'react-dom'] as const
export const CORE_DEPENDENCIES = [
  '@ark-ui/react',
  '@remixicon/react',
  'clsx',
  'tailwind-merge',
  'tailwind-variants',
  'tw-animate-css',
] as const
