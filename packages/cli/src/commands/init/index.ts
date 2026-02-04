import ora from 'ora'
import prompt from 'prompts'

import { PEER_DEPENDENCIES } from '@/common/const'
import { exec } from '@/common/exec'
import { logger } from '@/common/logger'
import { resolvePMCommand } from '@/common/resolve-pm-command'
import { BaseCommand } from '@/core/base-command'

import { checkDependencies } from './checks/dependencies'
import { checkNotInitialized } from './checks/not-initialized'
import { checkTailwindVersion } from './checks/tailwind-version'
import { checkValidProject } from './checks/valid-project'
import { InitPreflightWarning } from './enums'
import { resetInitialization } from './functions/reset-initialization'

class InitCommand extends BaseCommand {
  constructor() {
    super('init')
    this.description('command to initialize a new project')
  }

  protected async run() {
    try {
      const { warnings, errors } = await this.runPreflightChecks([
        checkValidProject(),
        checkNotInitialized(),
        checkDependencies(),
        checkTailwindVersion(),
      ])

      if (errors.size > 0) {
        logger.break()
        logger.error('Preflight checks failed. Please fix the errors above and try again.', {
          exitOnError: true,
        })
      }

      if (warnings.has(InitPreflightWarning.ALREADY_INITIALIZED)) {
        logger.break()
        const { overwrite: isOverwrite } = await prompt({
          type: 'confirm',
          name: 'overwrite',
          message: 'Project already initialized. Do you want to overwrite it?',
          initial: false,
        })

        if (isOverwrite) {
          await resetInitialization()
        }
      }

      if (warnings.has(InitPreflightWarning.MISSING_PEER_DEPENDENCIES)) {
        logger.break()
        const { install: isAcceptInstall } = await prompt({
          type: 'confirm',
          name: 'install',
          message: 'Some peer dependencies are missing. Install them now?',
          initial: true,
        })

        if (isAcceptInstall) {
          const installSpinner = ora('Installing peer dependencies...').start()

          try {
            const { full: command } = await resolvePMCommand('add', PEER_DEPENDENCIES)
            await exec(command)
            installSpinner.succeed('Peer dependencies installed')
          } catch {
            installSpinner.fail('Failed to install peer dependencies')
          }
        }
      }

      if (warnings.has(InitPreflightWarning.INCOMPATIBLE_TAILWIND_VERSION)) {
        logger.break()
        const { upgrade: isAcceptUpgrade } = await prompt({
          type: 'confirm',
          name: 'upgrade',
          message: 'Tailwind CSS v3 detected. Upgrade to v4 for full compatibility?',
          initial: true,
        })

        if (isAcceptUpgrade) {
          // TODO: fazer upgrade do Tailwind
        }
      }

      logger.break()
    } catch (error) {
      logger.break()
      logger.error(error instanceof Error ? error.message : 'An unexpected error occurred', {
        exitOnError: true,
      })
    }
  }
}

export const init = new InitCommand()
