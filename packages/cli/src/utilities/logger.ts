import { log } from '@clack/prompts'
import chalk from 'chalk'

import type { ForegroundColorName } from 'chalk'

export const logger = {
  info(message: string) {
    log.info(message)
  },
  success(message: string) {
    log.success(message)
  },
  error(message: string) {
    log.error(message)
    process.exit(0)
  },
  warning(message: string) {
    log.warning(message)
  },
  custom(
    message: string,
    options: {
      color?: ForegroundColorName
    },
  ) {
    const { color } = options
    log.message(chalk[color ?? 'grey'](message))
  },
  step: log.step,

  // Used only in dev environment
  debug(message: string) {
    log.message(chalk.magenta(`[DEBUG] ${message}`))
  },
}
