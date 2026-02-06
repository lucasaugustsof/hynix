import { promises as fs } from 'node:fs'

import pc from 'picocolors'

import { hynixConfig } from '@/utils/config-file'
import { resolveAliasToAbsolutePath } from '@/utils/resolve-alias-to-absolute-path'
import type { PromisePreflightCheck } from '@/utils/run-preflight'

export const PREFLIGHT_CHECK_COMPONENTS_DIRECTORY = 'add:components-directory-exist'

export async function checkComponentsDirectory(): PromisePreflightCheck {
  try {
    const config = await hynixConfig.read()

    if (!config) {
      return {
        name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
        status: 'failed',
        reason: 'Could not read aliases from configuration',
        message: 'Invalid configuration format',
        hint: 'Ensure hynix.json has a valid "aliases" field',
      }
    }

    const aliases = config.aliases as Record<string, string>
    const componentsAlias = aliases.components

    if (!componentsAlias) {
      return {
        name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
        status: 'failed',
        reason: 'Components alias not found in configuration',
        message: 'Missing "components" alias in hynix.json',
        hint: 'Add a "components" alias to your configuration',
      }
    }

    try {
      const absolutePath = resolveAliasToAbsolutePath(componentsAlias)
      const stats = await fs.stat(absolutePath)

      if (!stats.isDirectory()) {
        return {
          name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
          status: 'failed',
          reason: 'Components path is not a directory',
          message: `${pc.cyan(componentsAlias)} is not a directory`,
          hint: 'Create the components directory or update the alias in hynix.json',
        }
      }

      return {
        name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
        status: 'passed',
        message: `Components will be added to ${pc.cyan(componentsAlias)}`,
      }
    } catch {
      return {
        name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
        status: 'failed',
        reason: 'Components directory does not exist',
        message: `Missing: ${pc.cyan(componentsAlias)}`,
        hint: 'Create the components directory or update the alias in hynix.json',
      }
    }
  } catch (error) {
    return {
      name: PREFLIGHT_CHECK_COMPONENTS_DIRECTORY,
      status: 'failed',
      reason: 'Could not validate components directory',
      message: error instanceof Error ? error.message : 'Failed to check directory',
      hint: 'Ensure tsconfig.json paths are correctly configured',
    }
  }
}
