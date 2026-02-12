import prompt from '@/lib/prompts'
import { logger } from '@/utils/logger'

export async function collectProjectConfig() {
  const answers = await prompt([
    {
      type: 'confirm',
      name: 'tsx',
      message: 'Are you using TypeScript?',
      initial: true,
    },
    {
      type: 'confirm',
      name: 'rsc',
      message: 'Are you using React Server Components?',
      initial: false,
    },
  ])

  if (answers.tsx === undefined) {
    logger.warning('Configuration cancelled')
    process.exit(0)
  }

  logger.break()
  logger.info('Configure import aliases (press Enter to use defaults)')
  logger.break()

  const aliases = await prompt([
    {
      type: 'text',
      name: 'components',
      message: 'Where are your components located?',
      initial: '@/components/ui',
      validate: value => (value.length > 0 ? true : 'Alias path cannot be empty'),
    },
    {
      type: 'text',
      name: 'utils',
      message: 'Where are your utility functions located?',
      initial: '@/utils',
      validate: value => (value.length > 0 ? true : 'Alias path cannot be empty'),
    },
    {
      type: 'text',
      name: 'hooks',
      message: 'Where are your custom hooks located?',
      initial: '@/hooks',
      validate: value => (value.length > 0 ? true : 'Alias path cannot be empty'),
    },
    {
      type: 'text',
      name: 'styles',
      message: 'Where are your styles located?',
      initial: '@/styles',
      validate: value => (value.length > 0 ? true : 'Alias path cannot be empty'),
    },
  ])

  if (aliases.components === undefined) {
    logger.warning('Configuration cancelled')
    process.exit(0)
  }

  logger.break()
  logger.info('Configure Tailwind CSS')
  logger.break()

  const tailwind = await prompt({
    type: 'text',
    name: 'css',
    message: 'Path to your global CSS file:',
    initial: './styles/globals.css',
  })

  return {
    rsc: answers.rsc,
    tsx: answers.tsx,
    aliases: {
      components: aliases.components,
      utils: aliases.utils,
      hooks: aliases.hooks,
      styles: aliases.styles,
    },
    ...(tailwind.css && {
      tailwind: {
        css: tailwind.css,
      },
    }),
  }
}
