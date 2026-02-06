import pc from 'picocolors'

import { hynixConfig } from '@/utils/config-file'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

export const PREFLIGHT_CHECK_NOT_INITIALIZED = 'init:project-not-initialized'

export async function checkNotInitialized(): PromisePreflightCheck {
  try {
    const existingConfig = await hynixConfig.find()

    if (existingConfig) {
      return {
        name: PREFLIGHT_CHECK_NOT_INITIALIZED,
        status: 'skipped',
        reason: 'Project is already initialized',
        message: `Found existing configuration at ${pc.cyan(existingConfig.filepath)}`,
      }
    }

    return {
      name: PREFLIGHT_CHECK_NOT_INITIALIZED,
      status: 'passed',
      message: 'Project is ready to initialize',
    }
  } catch {
    return {
      name: PREFLIGHT_CHECK_NOT_INITIALIZED,
      status: 'failed',
      reason: 'Could not check initialization status',
      message: 'Failed to search for configuration',
      hint: 'Make sure you have proper file system permissions',
    }
  }
}
