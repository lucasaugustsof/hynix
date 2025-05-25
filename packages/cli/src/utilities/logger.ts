import { log } from '@clack/prompts'
import chalk from 'chalk'

import type { ForegroundColor } from 'chalk'

export const logger = {
  info(message: string) {
    log.info(chalk.blue(message))
  },
  success(message: string) {
    log.success(chalk.green(message))
  },
  error(message: string) {
    log.error(chalk.red(message))
    process.exit(0)
  },
  warning(message: string) {
    log.warning(chalk.yellow(message))
  },
  custom(
    message: string,
    options: {
      color?: ForegroundColor
    },
  ) {
    const { color } = options
    log.message(chalk[color ?? 'grey'](message))
  },
  step: log.step,
}
