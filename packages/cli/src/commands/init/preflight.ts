import { NAME_TAILWIND_DEPENDENCY, TAILWIND_V4_REGEX } from '@/utilities/const'
import { getPackageJson } from '@/utilities/get-package-json'

export enum InitCommandErrors {
  UNIDENTIFIED_NODE_PROJECT = '1',
  TAILWIND_NOT_INSTALLED = '2',
  INCOMPATIBLE_VERSION_TAILWIND = '3',
}

export async function preFlight() {
  const errorsFound = {} as Record<string, boolean>

  // Node.js Project Detection

  const packageJsonFileContent = await getPackageJson(() => {
    errorsFound[InitCommandErrors.UNIDENTIFIED_NODE_PROJECT] = true
  })

  const { dependencies, devDependencies } = packageJsonFileContent!

  // Tailwind CSS Detection

  const tailwindVersionInDeps = dependencies?.[NAME_TAILWIND_DEPENDENCY]
  const tailwindVersionInDevDeps = devDependencies?.[NAME_TAILWIND_DEPENDENCY]

  const isTailwindMissing = !tailwindVersionInDeps && !tailwindVersionInDevDeps

  const tailwindVersions = [
    tailwindVersionInDeps,
    tailwindVersionInDevDeps,
  ].filter((v): v is string => typeof v === 'string')

  const isTailwindInvalidVersion = tailwindVersions.some(
    version => !TAILWIND_V4_REGEX.test(version),
  )

  if (isTailwindMissing) {
    errorsFound[InitCommandErrors.TAILWIND_NOT_INSTALLED] = true
  }

  if (isTailwindInvalidVersion) {
    errorsFound[InitCommandErrors.INCOMPATIBLE_VERSION_TAILWIND] = true
  }

  return {
    errorsFound,
  }
}
