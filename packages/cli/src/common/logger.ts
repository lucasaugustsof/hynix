import chalk, { type ColorName } from 'chalk'

export const logger = {
  info(log: string) {
    console.log(chalk.blue('◆'), log)
  },
  success(log: string) {
    console.log(chalk.green('✔︎'), log)
  },
  error(log: string, { exitOnError = false } = {}) {
    console.log(chalk.red('✖'), log)
    console.log()

    if (exitOnError) {
      process.exit(0)
    }
  },
  warning(log: string) {
    console.log(chalk.yellow('▲'), log)
  },
  highlight(color: ColorName, log: string) {
    console.log(chalk[color](log))
  },
  break() {
    console.log()
  },
}
