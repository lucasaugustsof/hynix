import chalk, { type ColorName } from 'chalk'

export const logger = {
  log(message: string) {
    console.log(message)
  },
  info(message: string, { exit = false } = {}) {
    console.log(chalk.blue('◆'), message)
    console.log()

    if (exit) {
      process.exit(0)
    }
  },
  success(message: string) {
    console.log(chalk.green('✔︎'), message)
  },
  error(message: string, { exitOnError = false } = {}) {
    console.log(chalk.red('✖'), message)
    console.log()

    if (exitOnError) {
      process.exit(0)
    }
  },
  warning(message: string) {
    console.log(chalk.yellow('▲'), message)
  },
  highlight(color: ColorName, message: string) {
    console.log(chalk[color](message))
  },
  break() {
    console.log()
  },
}
