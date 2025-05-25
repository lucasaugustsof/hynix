export const BANNER_INTRO = `
  ██╗  ██╗██╗   ██╗███╗   ██╗██╗██╗  ██╗
  ██║  ██║╚██╗ ██╔╝████╗  ██║██║╚██╗██╔╝
  ███████║ ╚████╔╝ ██╔██╗ ██║██║ ╚███╔╝
  ██╔══██║  ╚██╔╝  ██║╚██╗██║██║ ██╔██╗
  ██║  ██║   ██║   ██║ ╚████║██║██╔╝ ██╗
  ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
`

export const PROCESS_CWD = process.cwd()
export const MANIFEST_FILE = 'ui.json'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const DEFAULT_CSS_PATH = './src/styles/globals.css'
export const DEFAULT_COMPONENTS_ALIAS = '@/components/ui'
export const DEFAULT_UTILITIES_ALIAS = '@/utilities'

export const FS_ERROR_CODES = {
  PERMISSION_DENIED: 'EACCES',
  OPERATION_NOT_PERMITTED: 'EPERM',
  NO_SUCH_FILE_OR_DIRECTORY: 'ENOENT',
  IS_A_DIRECTORY: 'EISDIR',
}
