import pc from 'picocolors'

import { HYNIX_LOGO } from './const'

export const logger = {
  intro() {
    console.log(pc.bold(HYNIX_LOGO))
  },
  log(message: string) {
    console.log(message)
  },
  info(message: string, { exit = false } = {}) {
    console.log(pc.blue('◆'), message)

    if (exit) {
      console.log()
      process.exit(0)
    }
  },
  success(message: string, { withoutSymbol = false, indent = 0 } = {}) {
    const indentStr = '  '.repeat(indent)
    const symbol = withoutSymbol ? '' : `${pc.green('✔')} `
    const text = withoutSymbol ? pc.green(`Success: ${message}`) : message

    console.log(`${indentStr}${symbol}${text}`)
  },
  error(message: string, { withoutSymbol = false, indent = 0, exitOnError = false } = {}) {
    const indentStr = '  '.repeat(indent)
    const symbol = withoutSymbol ? '' : `${pc.red('✖')} `
    const text = withoutSymbol ? pc.red(`Error: ${message}`) : message

    console.log(`${indentStr}${symbol}${text}`)

    if (exitOnError) {
      console.log()
      process.exit(0)
    }
  },
  warning(message: string, { indent = 0 } = {}) {
    const indentStr = '  '.repeat(indent)
    console.log(`${indentStr}${pc.yellow('▲')} ${message}`)
  },
  break() {
    console.log()
  },
  dim(message: string, { indent = 0 } = {}) {
    const indentStr = '  '.repeat(indent)
    console.log(`${indentStr}${pc.dim(message)}`)
  },
}
