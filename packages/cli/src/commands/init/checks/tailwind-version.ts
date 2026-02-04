import chalk from 'chalk'
import type { ListrTask } from 'listr2'
import semver from 'semver'

import { readPackageJson } from '@/common/read-package-json'
import type { PreflightContext } from '@/core/base-command'

import { InitPreflightWarning } from '../enums'

const MIN_TAILWIND_VERSION = '4.0.0'

export function checkTailwindVersion(): ListrTask<PreflightContext> {
  return {
    title: 'Checking Tailwind CSS version',
    task: async (ctx, task) => {
      const packageJson = await readPackageJson()

      const allDependencies: Record<string, string> = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }

      const tailwindVersion = allDependencies.tailwindcss

      if (!tailwindVersion) {
        task.skip('Tailwind CSS not installed')
        return
      }

      const cleanVersion = semver.coerce(tailwindVersion)

      if (!cleanVersion || semver.lt(cleanVersion, MIN_TAILWIND_VERSION)) {
        ctx.warnings.add(InitPreflightWarning.INCOMPATIBLE_TAILWIND_VERSION)

        task.skip(
          `Tailwind CSS ${chalk.cyan(`v${MIN_TAILWIND_VERSION}+`)} required. Found ${chalk.dim(tailwindVersion)}`
        )
        return
      }

      task.title = `Tailwind CSS ${chalk.cyan(`v${cleanVersion}`)} detected`
    },
  }
}
