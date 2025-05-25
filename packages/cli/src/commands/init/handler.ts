import { resolvePackageManagerCommand } from '@/utilities/resolve-package-manager-command'

export async function handler() {
  await resolvePackageManagerCommand('add', ['react'])
}
