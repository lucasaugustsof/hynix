import type { Command } from 'package-manager-detector'
import { resolveCommand } from 'package-manager-detector/commands'
import { detect } from 'package-manager-detector/detect'

const DETECTION_STRATEGIES = [
  'lockfile',
  'packageManager-field',
  'devEngines-field',
  'install-metadata',
] as const

export async function getPackageManager() {
  const pm = await detect({
    strategies: [...DETECTION_STRATEGIES],
  })

  if (!pm) {
    throw new Error('Could not detect package manager')
  }

  return pm
}

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
