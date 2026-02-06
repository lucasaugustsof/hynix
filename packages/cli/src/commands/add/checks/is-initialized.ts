import pc from 'picocolors'

import { hynixConfig } from '@/utils/config-file'
import { CONFIG_FILE_NAME } from '@/utils/const'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

export const PREFLIGHT_CHECK_IS_INITIALIZED = 'add:project-is-initialized'

export async function checkIsInitialized(): PromisePreflightCheck {
  try {
    const config = await hynixConfig.find()

    if (!config) {
      return {
        name: PREFLIGHT_CHECK_IS_INITIALIZED,
        status: 'failed',
        reason: `Configuration file ${pc.cyan(CONFIG_FILE_NAME)} not found`,
        message: `Please run ${pc.cyan('hynix init')} first to initialize the project`,
        hint: `Run ${pc.cyan('hynix init')} to set up the project configuration`,
      }
    }

    return {
      name: PREFLIGHT_CHECK_IS_INITIALIZED,
      status: 'passed',
      message: `Found ${pc.cyan(CONFIG_FILE_NAME)}`,
    }
  } catch (error) {
    return {
      name: PREFLIGHT_CHECK_IS_INITIALIZED,
      status: 'failed',
      reason: 'Could not check initialization status',
      message: error instanceof Error ? error.message : 'Failed to check configuration file',
      hint: 'Make sure you have proper file system permissions',
    }
  }
}
