import pc from 'picocolors'

import { readPackageJson } from '@/utils/read-package-json'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

export const PREFLIGHT_CHECK_PACKAGE_JSON_EXISTS = 'init:package-json-exists'

export async function checkValidProject(): PromisePreflightCheck {
  try {
    await readPackageJson()
    return {
      name: PREFLIGHT_CHECK_PACKAGE_JSON_EXISTS,
      status: 'passed',
      message: `Found ${pc.cyan('package.json')}`,
    }
  } catch {
    return {
      name: PREFLIGHT_CHECK_PACKAGE_JSON_EXISTS,
      status: 'failed',
      reason: `No ${pc.cyan('package.json')} found in the current directory`,
      message: `Could not find ${pc.cyan('package.json')}`,
      hint: 'Make sure you are running this command in the root of your project',
    }
  }
}
