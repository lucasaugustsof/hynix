import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const ROOT_DIR = path.join(__dirname, '../..')
export const COMPONENTS_DIR = path.join(ROOT_DIR, 'packages/react/src/components')
export const OUTPUT_DIR = path.join(ROOT_DIR, '.storybook/public/r')

export const IGNORED_PACKAGES = ['react', 'react-dom', 'tailwind-merge', 'clsx', '@ark-ui/react']

export const ALIAS_MAPPINGS = {
  '@/utils/': '<%= it.aliases.utils %>/',
  '@/lib/': '<%= it.aliases.lib %>/',
  '@/hooks/': '<%= it.aliases.hooks %>/',
  '@/components/': '<%= it.aliases.components %>/',
  '@/types/': '<%= it.aliases.types %>/',
  '@/styles/': '<%= it.aliases.styles %>/',
}
