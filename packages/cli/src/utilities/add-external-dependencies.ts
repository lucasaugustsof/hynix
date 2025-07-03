import { resolvePackageManagerCommand } from './resolve-package-manager-command'
import { runShellCommand } from './run-shell-command'

export async function addExternalDependencies(deps: string[]) {
  const { command, args } = await resolvePackageManagerCommand('add', deps)

  const fullCommand = `${command} ${args.join(' ')}`
  await runShellCommand(fullCommand)
}
