import ora from 'ora'

import { exec } from '@/utils/exec'
import { resolvePMCommand } from '@/utils/resolve-pm-command'

export async function installExternalDependencies(dependencies: string[]): Promise<void> {
  if (dependencies.length === 0) {
    return
  }

  const spinner = ora('Installing external dependencies...').start()

  try {
    const { full: installCommand } = await resolvePMCommand('add', dependencies)
    await exec(installCommand)

    spinner.succeed('External dependencies installed')
  } catch (error) {
    spinner.fail('Failed to install external dependencies')
    throw error
  }
}
