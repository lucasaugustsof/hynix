import { Command } from 'commander'
import chalk from 'chalk'

import { logger } from '@/utilities/logger'

import { preFlight, AddCommandErrors } from './preflight'
import { handler } from './handler'

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

    logger.success('Preflight checks')

    await handler(componentNames)
  })
