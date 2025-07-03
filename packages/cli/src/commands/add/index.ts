import chalk from 'chalk'
import { Command } from 'commander'

import { logger } from '@/utilities/logger'

import { handler } from './handler'
import { AddCommandErrors, preFlight } from './preflight'

export const add = new Command()
  .name('add')
  .description('quickly add Hynix components and start building faster.')
  .argument('[components...]')
  .action(async componentNames => {
    const { errorsFound } = preFlight()

    if (errorsFound[AddCommandErrors.MANIFEST_FILE_NOT_FOUND]) {
      logger.error(
        `Project not initialized. Please run ${chalk.cyan('npx hynix@latest init')} to set it up.`,
      )
    }

    logger.step('Preflight check completed successfully')

    await handler(componentNames)
  })
