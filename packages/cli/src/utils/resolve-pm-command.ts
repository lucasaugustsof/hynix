import type { Command } from 'package-manager-detector'
import { resolveCommand } from 'package-manager-detector/commands'
import { detect } from 'package-manager-detector/detect'

/**
 * Strategies used to detect the package manager in order of priority
 */
const DETECTION_STRATEGIES = [
  'lockfile',
  'packageManager-field',
  'devEngines-field',
  'install-metadata',
] as const

/**
 * Detects the package manager used in the current project
 *
 * Uses multiple detection strategies including lockfile analysis,
 * package.json fields, and install metadata to determine the package manager.
 *
 * @returns The detected package manager information
 * @throws {Error} If no package manager could be detected
 *
 * @example
 * ```ts
 * const pm = await getPackageManager()
 * console.log(pm.agent) // 'pnpm', 'npm', 'yarn', etc.
 * ```
 */
export async function getPackageManager() {
  const pm = await detect({
    strategies: [...DETECTION_STRATEGIES],
  })

  if (!pm) {
    throw new Error('Could not detect package manager')
  }

  return pm
}

/**
 * Resolves a package manager command with arguments for the detected package manager
 *
 * Takes a generic command (like 'install', 'add', 'remove') and converts it
 * to the package manager-specific syntax with the provided arguments.
 *
 * @param command - The package manager command to resolve (e.g., 'install', 'add')
 * @param args - Arguments to pass to the command
 * @returns Resolved command object with command, args, and full command string
 * @throws {Error} If the command cannot be resolved for the detected package manager
 *
 * @example
 * ```ts
 * // With pnpm detected
 * const cmd = await resolvePMCommand('add', ['react', 'react-dom'])
 * // Returns: { command: 'pnpm', args: ['add', 'react', 'react-dom'], full: 'pnpm add react react-dom' }
 *
 * // With npm detected
 * const cmd = await resolvePMCommand('install', [])
 * // Returns: { command: 'npm', args: ['install'], full: 'npm install' }
 * ```
 */
export async function resolvePMCommand(command: Command, args: string[]) {
  const pm = await getPackageManager()
  const resolved = resolveCommand(pm.agent, command, args)

  if (!resolved) {
    throw new Error(`Could not resolve command "${command}" for ${pm.agent}`)
  }

  return {
    ...resolved,
    full: `${resolved.command} ${resolved.args.join(' ')}`,
  }
}
