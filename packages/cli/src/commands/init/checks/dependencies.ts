import chalk from 'chalk'
import type { ListrTask } from 'listr2'

import { PEER_DEPENDENCIES } from '@/common/const'
import { readPackageJson } from '@/common/read-package-json'
import type { PreflightContext } from '@/core/base-command'

import { InitPreflightWarning } from '../enums'

export function checkDependencies(): ListrTask<PreflightContext> {
  return {
    title: 'Checking peer dependencies',
    task: async (ctx, task) => {
      const packageJson = await readPackageJson()

      const allDependencies: Record<string, string> = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }

      const missingDependencies = PEER_DEPENDENCIES.filter(dep => !allDependencies[dep])

      if (missingDependencies.length > 0) {
        const missingList = missingDependencies.map(dep => chalk.cyan(dep)).join(', ')

        ctx.warnings.add(InitPreflightWarning.MISSING_PEER_DEPENDENCIES)
        task.skip(`Missing: ${missingList}`)
      }

      const foundList = PEER_DEPENDENCIES.map(dep => chalk.cyan(dep)).join(', ')
      task.title = `Found ${foundList}`
    },
  }
}
