import chalk from 'chalk'

export const logger = {
  info: message => console.log(`  ${message}`),
  success: message => console.log(chalk.green(`  ${message}`)),
  error: message => console.error(chalk.red(`  ${message}`)),
  warn: message => console.warn(chalk.yellow(`  ${message}`)),
  dim: message => console.log(chalk.dim(`  ${message}`)),

  header: message => console.log(`\n${chalk.bold(message)}`),
  divider: () => console.log(chalk.dim('  ─────────────────────────────────')),

  component: (name, status, details = '') => {
    const statusIcon = status === 'success' ? chalk.green('✓') : chalk.red('✗')
    const detailsText = details ? chalk.dim(` ${details}`) : ''
    console.log(`  ${statusIcon} ${name}${detailsText}`)
  },

  summary: stats => {
    console.log()
    logger.divider()
    console.log(`  ${chalk.bold('Total:')}     ${stats.total} components`)
    console.log(`  ${chalk.green('Success:')}   ${stats.success}`)
    if (stats.failed > 0) {
      console.log(`  ${chalk.red('Failed:')}    ${stats.failed}`)
    }
    console.log(`  ${chalk.dim('Output:')}    ${stats.outputDir}`)
    logger.divider()
  },
}
