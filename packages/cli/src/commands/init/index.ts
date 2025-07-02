import * as p from '@clack/prompts'
import { Command } from 'commander'

import { BANNER_INTRO } from '@/utilities/const'
import { logger } from '@/utilities/logger'

import { CLIError } from '@/utilities/cli-error'
import { handler } from './handler'
import { InitCommandErrors, preFlight } from './preflight'

export const init = new Command()
  .name('init')
  .description('prepares your project for using the Hynix CLI.')
  .action(async () => {
    try {
      logger.custom(BANNER_INTRO, {
        color: 'yellowBright',
      })

      const { errorsFound } = await preFlight()

      if (errorsFound[InitCommandErrors.UNIDENTIFIED_NODE_PROJECT]) {
        logger.error(
          'Error: This does not appear to be a Node.js project. Make sure there is a package.json file in the current directory',
        )
      }

      if (errorsFound[InitCommandErrors.TAILWIND_NOT_INSTALLED]) {
        logger.warning(
          'TailwindCSS installation was not detected in your project. Continuing\nthe initialization may cause issues later.',
        )

        const shouldProceedWithoutTailwind = await p.confirm({
          message: 'Do you still want to proceed?',
          active: 'Yes, I want to proceed.',
          inactive: 'No, I want to abort.',
          initialValue: false,
        })

        if (!shouldProceedWithoutTailwind) {
          logger.info(
            'Initialization has been safely aborted. Please set up TailwindCSS\nby following the official guide: https://tailwindcss.com/docs/installation',
          )
          process.exit(0)
        }
      }

      if (errorsFound[InitCommandErrors.INCOMPATIBLE_VERSION_TAILWIND]) {
        logger.error(
          'The detected TailwindCSS version is not compatible. Please ensure\nyou are using version 4.x.x or higher.',
        )
      }

      logger.step(
        'Preflight check completed successfully. Your environment is ready for initialization.',
      )

      await handler()
    } catch (err) {
      if (err instanceof CLIError) {
        logger.error(err.message)
      }
    }
  })
