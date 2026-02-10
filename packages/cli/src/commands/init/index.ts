import { Command } from 'commander'
import ora from 'ora'
import pc from 'picocolors'
import { z } from 'zod'

import prompt from '@/lib/prompts'
import { DEFAULT_CONFIG } from '@/schemas/config'
import { hynixConfig } from '@/utils/config-file'
import { CORE_DEPENDENCIES } from '@/utils/const'
import { exec } from '@/utils/exec'
import { logger } from '@/utils/logger'
import { resolvePMCommand } from '@/utils/resolve-pm-command'
import { runPreflight } from '@/utils/run-preflight'

import { checkDependencies } from './checks/dependencies'
import { checkNotInitialized, PREFLIGHT_CHECK_NOT_INITIALIZED } from './checks/not-initialized'
import { checkTailwindVersion } from './checks/tailwind-version'
import { checkValidProject } from './checks/valid-project'

const initCommandOptionsSchema = z.object({
  yes: z.coerce.boolean().default(false).describe('Skip prompts and use default values'),
})

async function runInitCommand(options: unknown) {
  try {
    const opts = initCommandOptionsSchema.parse(options)

    logger.intro()

    if (opts.yes) {
      logger.info('Using default configuration (--yes flag detected)')
    }

    const { skippedChecks } = await runPreflight([
      checkValidProject,
      checkDependencies,
      checkTailwindVersion,
      checkNotInitialized,
    ])

    if (skippedChecks.has(PREFLIGHT_CHECK_NOT_INITIALIZED)) {
      logger.break()
      const { initOverwrite: isInitOverwrite } = await prompt({
        type: 'confirm',
        name: 'initOverwrite',
        message:
          'Project is already initialized. Do you want to overwrite the existing configuration?',
        initial: false,
      })

      if (!isInitOverwrite) {
        logger.info('Initialization cancelled. Your existing configuration has been preserved.')
        return
      }

      const existingConfig = await hynixConfig.find()

      if (existingConfig) {
        await hynixConfig.delete()
        logger.success(`Removed existing configuration from ${pc.cyan(existingConfig.filepath)}`)
      }
    }

    logger.break()
    logger.dim('Initializing Hynix...')
    logger.break()

    const config = opts.yes ? DEFAULT_CONFIG : await promptForConfiguration()

    logger.break()
    logger.info('Installing core dependencies')
    logger.dim(`Dependencies: ${CORE_DEPENDENCIES.join(', ')}`)
    logger.break()

    const { full: installCommand } = await resolvePMCommand('add', [...CORE_DEPENDENCIES])
    const installDependenciesSpinner = ora('Installing dependencies...').start()

    try {
      await exec(installCommand)
      installDependenciesSpinner.succeed('Core dependencies installed successfully')
    } catch (error) {
      installDependenciesSpinner.fail('Failed to install dependencies')
      logger.error(error instanceof Error ? error.message : 'An error occurred during installation')
      return
    }

    logger.break()
    logger.info('Saving configuration...')

    const configPath = await hynixConfig.write(config)

    logger.success(`Configuration saved to ${configPath}`)

    logger.success('Hynix has been initialized successfully!', {
      withoutSymbol: true,
    })
    logger.break()
  } catch (error) {
    if (error instanceof Error) {
      logger.break()
      logger.error(error.message, {
        exitOnError: true,
      })
    }
  }
}

async function promptForConfiguration() {
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

  const aliases = await prompt([
    {
      type: 'text',
      name: 'components',
      message: 'Where are your components located?',
      initial: '@/components',
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

export const init = new Command()
  .name('init')
  .description('set up Hynix for your project')
  .option('-y, --yes', 'automatically answer yes to all prompts')
  .allowUnknownOption(false)
  .showHelpAfterError(true)
  .action(runInitCommand)
