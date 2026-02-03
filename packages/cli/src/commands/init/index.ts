import prompt from 'prompts'

import { BaseCommand } from '@/abstracts/base-command'
import { CliError } from '@/common/errors'
import { logger } from '@/common/logger'

import { resetInitialization } from './functions/reset-initialization'
import { ensureDependencies } from './validations/ensure-dependencies'
import { ensureNotInitialized } from './validations/ensure-not-initialized'
import { ensureValidProject } from './validations/ensure-valid-project'
import { InitErrorCode } from './validations/errors'

class InitCommand extends BaseCommand {
  constructor() {
    super('init')
    this.description('command to initialize a new project')
  }

  protected async run() {
    // Command implementation
  }

  protected async runPreflightChecks() {
    logger.highlight('magenta', 'Preflight checks...')
    logger.break()

    try {
      const { message } = await ensureValidProject()
      logger.success(message)
    } catch (error) {
      if (error instanceof CliError) {
        logger.error(error.message, true)
      }
    }

    const queueChecks = await Promise.allSettled([ensureNotInitialized(), ensureDependencies()])

    for (const result of queueChecks) {
      if (result.status === 'rejected' && result.reason instanceof CliError) {
        const { code } = result.reason.props

        switch (code) {
          case InitErrorCode.ALREADY_INITIALIZED: {
            const { overwrite } = await prompt({
              name: 'overwrite',
              type: 'confirm',
              message: 'Project already initialized. Do you want to overwrite it?',
              initial: false,
            })

            if (!overwrite) {
              logger.warning('Initialization cancelled. Existing configuration was preserved.')
              logger.break()
              process.exit(0)
            }

            await resetInitialization()

            break
          }

          case InitErrorCode.MISSING_DEPENDENCIES:
          case InitErrorCode.INCOMPATIBLE_TAILWIND_VERSION:
            logger.error(result.reason.message, true)
            break

          default:
            logger.error(result.reason.message)
        }
      }

      if (result.status === 'fulfilled') {
        logger.success(result.value.message)
      }
    }

    logger.break()
  }
}

export const init = new InitCommand()
