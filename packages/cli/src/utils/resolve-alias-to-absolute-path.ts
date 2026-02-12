import path from 'node:path'

import * as tsConfigPaths from 'tsconfig-paths'

import { CWD } from './const'

/**
 * Resolves a TypeScript path alias to an absolute file system path
 *
 * Loads the tsconfig.json from the current working directory and resolves
 * the provided alias import to its absolute path based on the configured
 * path mappings and baseUrl.
 *
 * @param aliasImport - The aliased import path to resolve (e.g., '@/components/button')
 * @returns The absolute file system path corresponding to the alias
 * @throws {Error} If tsconfig.json cannot be loaded
 * @throws {Error} If no paths are configured in tsconfig.json
 * @throws {Error} If the alias cannot be resolved to any configured path mapping
 *
 * @example
 * ```ts
 * // With tsconfig.json:
 * // {
 * //   "compilerOptions": {
 * //     "baseUrl": ".",
 * //     "paths": {
 * //       "@/*": ["src/*"]
 * //     }
 * //   }
 * // }
 *
 * const absolutePath = resolveAliasToAbsolutePath('@/components/button')
 * // Returns: '/project/root/src/components/button'
 *
 * const utilPath = resolveAliasToAbsolutePath('@/utils/helpers')
 * // Returns: '/project/root/src/utils/helpers'
 * ```
 */
export function resolveAliasToAbsolutePath(aliasImport: string) {
  const configResult = tsConfigPaths.loadConfig(CWD)

  if (configResult.resultType === 'failed') {
    throw new Error(`Failed to load tsconfig: ${configResult.message}`)
  }

  const { absoluteBaseUrl, paths } = configResult

  if (!paths) {
    throw new Error('No paths found in tsconfig configuration.')
  }

  for (const aliasPattern in paths) {
    const aliasPrefix = aliasPattern.replace(/\*$/, '')
    const targetPatterns = paths[aliasPattern]

    if (aliasImport.startsWith(aliasPrefix)) {
      const remainingPath = aliasImport.slice(aliasPrefix.length)

      const targetPattern = targetPatterns[0]
      const targetPrefix = targetPattern.replace(/\*$/, '')

      const resolvedPath = path.resolve(absoluteBaseUrl, targetPrefix, remainingPath)

      return resolvedPath
    }
  }

  throw new Error(
    `Failed to resolve the alias '${aliasImport}' to an absolute path. Please verify that the alias is correctly configured in tsconfig.json.`
  )
}
