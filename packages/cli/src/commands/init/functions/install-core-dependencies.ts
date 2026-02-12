import ora from 'ora'

import { CORE_DEPENDENCIES } from '@/utils/const'
import { exec } from '@/utils/exec'
import { logger } from '@/utils/logger'
import { resolvePMCommand } from '@/utils/resolve-pm-command'

export async function installCoreDependencies(): Promise<void> {
  logger.break()
  logger.info('Installing core dependencies')
  logger.dim(`Dependencies: ${CORE_DEPENDENCIES.join(', ')}`)
  logger.break()

  const { full: installCommand } = await resolvePMCommand('add', [...CORE_DEPENDENCIES])
  const spinner = ora('Installing dependencies...').start()

  try {
    await exec(installCommand)
    spinner.succeed('Core dependencies installed successfully')
  } catch (error) {
    spinner.fail('Failed to install dependencies')

    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred during installation'

    throw new Error(errorMessage)
  }
}
