import ora from 'ora'

import { CORE_DEPENDENCIES, DEFAULT_MANIFEST, PEER_DEPENDENCIES } from '@/common/const'
import { exec } from '@/common/exec'
import { logger } from '@/common/logger'
import { manifest } from '@/common/manifest'
import { prompt } from '@/common/prompt'
import { resolvePMCommand } from '@/common/resolve-pm-command'
import { BaseCommand } from '@/core/base-command'

import { checkDependencies } from './checks/dependencies'
import { checkNotInitialized } from './checks/not-initialized'
import { checkTailwindVersion } from './checks/tailwind-version'
import { checkValidProject } from './checks/valid-project'
import { InitPreflightWarning } from './enums'

type InitOptions = {
  yes?: boolean
}

class InitCommand extends BaseCommand<InitOptions> {
  constructor() {
    super('init')

    this.description('configure your project to use Hynix')
    this.option('-y, --yes', 'skip prompts and accept defaults')
  }

  protected async run(options: InitOptions) {
    const skipPrompts = options.yes ?? false

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
        const { overwrite } = await prompt({
          type: 'confirm',
          name: 'overwrite',
          message: 'Project already initialized. Overwrite existing configuration?',
          initial: false,
        })

        if (!overwrite) {
          logger.info('No changes made. Your existing configuration is preserved.', {
            exit: true,
          })
        }

        await manifest.delete()
      }

      if (warnings.has(InitPreflightWarning.MISSING_PEER_DEPENDENCIES)) {
        logger.break()
        const { install: isAcceptInstallPeerDependencies } = await prompt({
          type: 'confirm',
          name: 'install',
          message: 'Some peer dependencies are missing. Install them now?',
          initial: true,
        })

        if (isAcceptInstallPeerDependencies) {
          await this.installDependencies(PEER_DEPENDENCIES, 'peer dependencies')
        } else {
          logger.break()
          logger.warning('Skipping peer dependencies installation. Some features may not work.')
        }
      }

      if (
        warnings.has(InitPreflightWarning.INCOMPATIBLE_TAILWIND_VERSION) &&
        !warnings.has(InitPreflightWarning.MISSING_PEER_DEPENDENCIES)
      ) {
        logger.break()

        const { upgrade: isAcceptUpgradeTailwindCSS } = await prompt({
          type: 'confirm',
          name: 'upgrade',
          message: 'Tailwind CSS v3 detected. Upgrade to v4 for full compatibility?',
          initial: true,
        })

        if (isAcceptUpgradeTailwindCSS) {
          const upgradeSpinner = ora('Upgrading Tailwind CSS...').start()

          try {
            const { full: command } = await resolvePMCommand('add', ['tailwindcss@latest'])
            await exec(command)
            upgradeSpinner.succeed('Tailwind CSS upgraded')
          } catch {
            upgradeSpinner.fail('Failed to upgrade Tailwind CSS')
            logger.break()
            logger.warning(
              'Continuing with Tailwind CSS v3. Some features may not work as expected.'
            )
          }
        }
      }

      logger.break()

      const config = skipPrompts ? DEFAULT_MANIFEST : await this.collectConfig()

      await this.installDependencies(CORE_DEPENDENCIES, 'core dependencies')

      logger.break()

      const configSpinner = ora('Creating manifest...').start()
      await manifest.create(config)
      configSpinner.succeed('Created hynix.json')

      this.logSummary()
    } catch (error) {
      logger.break()
      logger.error(error instanceof Error ? error.message : 'An unexpected error occurred', {
        exitOnError: true,
      })
    }
  }

  private async collectConfig() {
    const paths = await prompt([
      {
        type: 'text',
        name: 'components',
        message: 'Where do you want to add components?',
        initial: '@/components',
      },
      {
        type: 'text',
        name: 'utils',
        message: 'Where do you want to add utilities?',
        initial: '@/utils',
      },
      {
        type: 'text',
        name: 'styles',
        message: 'Where do you want to add styles?',
        initial: '@/styles',
      },
    ])

    logger.break()

    const { rsc } = await prompt({
      type: 'confirm',
      name: 'rsc',
      message: 'Are you using React Server Components?',
      initial: false,
    })

    return {
      aliases: {
        components: paths.components,
        utils: paths.utils,
        styles: paths.styles,
      },
      rsc,
    }
  }

  private async installDependencies(deps: readonly string[], label: string) {
    const spinner = ora(`Installing ${label}...`).start()

    try {
      const { full: command } = await resolvePMCommand('add', [...deps])
      await exec(command)
      spinner.succeed(`${label} installed`)
    } catch {
      spinner.fail(`Failed to install ${label}`)
      logger.break()
      logger.error(`Cannot continue without ${label}.`, { exitOnError: true })
    }
  }

  private logSummary() {
    logger.break()
    logger.success('Success! Project initialized.')
    logger.break()
    logger.info('Next steps:')
    logger.break()
    logger.highlight('white', '  1. Add your first component:')
    logger.highlight('cyan', '     hynix add button')
    logger.break()
    logger.highlight('white', '  2. Import and use it:')
    logger.highlight('cyan', "     import { Button } from '@/components/button'")
    logger.break()
  }
}

export const init = new InitCommand()
