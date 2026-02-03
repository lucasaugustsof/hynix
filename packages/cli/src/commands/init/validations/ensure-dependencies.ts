import semver from 'semver'

import { CliError } from '@/common/errors'
import { readPackageJson } from '@/common/read-package-json'

import { InitErrorCode } from './errors'

const REQUIRED_DEPENDENCIES = ['react', 'react-dom', 'tailwindcss'] as const
const MIN_TAILWIND_VERSION = '4.0.0'

export async function ensureDependencies(): Promise<{
  message: string
}> {
  const packageJson = await readPackageJson()

  const allDependencies: Record<string, string> = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }

  const missingDependencies = REQUIRED_DEPENDENCIES.filter(dep => !allDependencies[dep])

  if (missingDependencies.length > 0) {
    const missingList = missingDependencies.map(dep => `  - ${dep}`).join('\n')

    throw new CliError(`Missing dependencies:\n${missingList}`, {
      code: InitErrorCode.MISSING_DEPENDENCIES,
    })
  }

  const tailwindVersion = allDependencies.tailwindcss
  const cleanVersion = semver.coerce(tailwindVersion)

  if (!cleanVersion || semver.lt(cleanVersion, MIN_TAILWIND_VERSION)) {
    throw new CliError(
      `Tailwind CSS v${MIN_TAILWIND_VERSION}+ is required. Found ${tailwindVersion}.`,
      {
        code: InitErrorCode.INCOMPATIBLE_TAILWIND_VERSION,
      }
    )
  }

  return {
    message: 'All required dependencies are installed.',
  }
}
