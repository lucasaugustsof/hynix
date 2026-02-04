import { existsSync } from 'node:fs'
import path from 'node:path'

import chalk from 'chalk'
import type { ListrTask } from 'listr2'

export function checkFileExists(_path: string, title?: string): ListrTask {
  const { base: fileName } = path.parse(_path)
  const resolvedPath = path.resolve(_path)

  return {
    title: title ?? `Checking if ${chalk.cyan(fileName)} exists`,
    task: (_, task) => {
      if (!existsSync(resolvedPath)) {
        throw new Error(
          `${chalk.cyan(fileName)} not found in ${chalk.dim(path.dirname(resolvedPath))}`
        )
      }

      task.title = `Found ${chalk.cyan(fileName)}`
    },
  }
}
