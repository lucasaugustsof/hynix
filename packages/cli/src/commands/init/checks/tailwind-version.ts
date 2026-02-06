import pc from 'picocolors'
import semver from 'semver'

import { readPackageJson } from '@/utils/read-package-json'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

const MIN_TAILWIND_VERSION = '4.0.0'

export const PREFLIGHT_CHECK_TAILWIND_VERSION = 'init:tailwind-version-compatible'

export async function checkTailwindVersion(): PromisePreflightCheck {
  try {
    const packageJson = await readPackageJson()

    const allDependencies: Record<string, string> = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    const tailwindVersion = allDependencies.tailwindcss

    if (!tailwindVersion) {
      return {
        name: PREFLIGHT_CHECK_TAILWIND_VERSION,
        status: 'failed',
        reason: 'Tailwind CSS is not installed',
        message: 'Tailwind CSS not found',
        hint: `Install Tailwind CSS ${pc.cyan(`v${MIN_TAILWIND_VERSION}+`)} to continue`,
      }
    }

    const cleanVersion = semver.coerce(tailwindVersion)

    if (!cleanVersion || semver.lt(cleanVersion, MIN_TAILWIND_VERSION)) {
      return {
        name: PREFLIGHT_CHECK_TAILWIND_VERSION,
        status: 'failed',
        reason: `Tailwind CSS ${pc.cyan(`v${MIN_TAILWIND_VERSION}+`)} is required`,
        message: `Found ${pc.dim(tailwindVersion)}`,
        hint: `Update Tailwind CSS to ${pc.cyan(`v${MIN_TAILWIND_VERSION}+`)}`,
      }
    }

    return {
      name: PREFLIGHT_CHECK_TAILWIND_VERSION,
      status: 'passed',
      message: `Tailwind CSS ${pc.cyan(`v${cleanVersion}`)} detected`,
    }
  } catch {
    return {
      name: PREFLIGHT_CHECK_TAILWIND_VERSION,
      status: 'failed',
      reason: 'Could not check Tailwind CSS version',
      message: 'Failed to read package.json',
      hint: 'Make sure package.json exists and is valid',
    }
  }
}
