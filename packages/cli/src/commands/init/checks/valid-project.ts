import chalk from 'chalk'
import type { ListrTask } from 'listr2'

import { readPackageJson } from '@/common/read-package-json'

export function checkValidProject(): ListrTask {
  return {
    title: `Checking if ${chalk.cyan('package.json')} exists`,
    task: async (_, task) => {
      await readPackageJson()
      task.title = `Found ${chalk.cyan('package.json')}`
    },
  }
}
