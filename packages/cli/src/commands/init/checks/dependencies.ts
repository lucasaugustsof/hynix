import pc from 'picocolors'

import { PEER_DEPENDENCIES } from '@/utils/const'
import { readPackageJson } from '@/utils/read-package-json'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

export const PREFLIGHT_CHECK_PEER_DEPENDENCIES = 'init:peer-dependencies-installed'

export async function checkDependencies(): PromisePreflightCheck {
  try {
    const packageJson = await readPackageJson()

    const allDependencies: Record<string, string> = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    const missingDependencies = PEER_DEPENDENCIES.filter(dep => !allDependencies[dep])

    if (missingDependencies.length > 0) {
      const missingList = missingDependencies.map(dep => pc.cyan(dep)).join(', ')

      return {
        name: PREFLIGHT_CHECK_PEER_DEPENDENCIES,
        status: 'failed',
        reason: 'Missing required peer dependencies',
        message: `Missing: ${missingList}`,
        hint: 'Install the missing dependencies to continue',
      }
    }

    const foundList = PEER_DEPENDENCIES.map(dep => pc.cyan(dep)).join(', ')
    return {
      name: PREFLIGHT_CHECK_PEER_DEPENDENCIES,
      status: 'passed',
      message: `Found ${foundList}`,
    }
  } catch {
    return {
      name: PREFLIGHT_CHECK_PEER_DEPENDENCIES,
      status: 'failed',
      reason: 'Could not check dependencies',
      message: 'Failed to read package.json',
      hint: 'Make sure package.json exists and is valid',
    }
  }
}
