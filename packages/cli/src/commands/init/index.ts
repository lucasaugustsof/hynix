import { Command } from 'commander'
import { z } from 'zod'

import prompt from '@/lib/prompts'
import { DEFAULT_CONFIG } from '@/schemas/config'
import { hynixConfig } from '@/utils/config-file'
import { logger } from '@/utils/logger'
import { runPreflight } from '@/utils/run-preflight'

import { checkDependencies } from './checks/dependencies'
import { checkNotInitialized, PREFLIGHT_CHECK_NOT_INITIALIZED } from './checks/not-initialized'
import { checkTailwindVersion } from './checks/tailwind-version'
import { checkValidProject } from './checks/valid-project'
import { cleanExistingConfig } from './functions/clean-existing-config'
import { collectProjectConfig } from './functions/collect-project-config'
import { installCoreDependencies } from './functions/install-core-dependencies'
import { scaffoldProjectStructure } from './functions/scaffold-project-structure'

const initCommandOptionsSchema = z.object({
  yes: z.coerce.boolean().default(false).describe('Skip prompts and use default values'),
  force: z.coerce.boolean().default(false).describe('Force overwrite existing files'),
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

    let forceOverwrite = opts.force

    if (forceOverwrite) {
      await cleanExistingConfig()
    } else if (skippedChecks.has(PREFLIGHT_CHECK_NOT_INITIALIZED)) {
      logger.break()

      const { initOverwrite } = await prompt({
        type: 'confirm',
        name: 'initOverwrite',
        message:
          'Project is already initialized. Do you want to overwrite the existing configuration?',
        initial: false,
      })

      if (!initOverwrite) {
        logger.info('Initialization cancelled. Your existing configuration has been preserved.')
        return
      }

      await cleanExistingConfig()
      forceOverwrite = true
    }

    logger.break()
    logger.dim('Initializing Hynix...')
    logger.break()

    const config = opts.yes ? DEFAULT_CONFIG : await collectProjectConfig()

    try {
      await installCoreDependencies()
    } catch (error) {
      logger.error(error instanceof Error ? error.message : 'An error occurred during installation')
      return
    }

    logger.break()
    logger.info('Saving configuration...')
    logger.break()

    const configPath = await hynixConfig.write(config)

    await scaffoldProjectStructure(config, {
      force: forceOverwrite,
    })

    logger.break()
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

export const init = new Command()
  .name('init')
  .description('set up Hynix for your project')
  .option('-y, --yes', 'automatically answer yes to all prompts')
  .option('-f, --force', 'force overwrite existing files')
  .allowUnknownOption(false)
  .showHelpAfterError(true)
  .action(runInitCommand)
