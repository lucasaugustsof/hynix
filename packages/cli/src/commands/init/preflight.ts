import path from 'node:path'
import fse from 'fs-extra'

import { PROCESS_CWD } from '@/utilities/const'

export enum InitCommandErrors {
  UNIDENTIFIED_NODE_PROJECT = '1',
  TAILWIND_NOT_INSTALLED = '2',
  INCOMPATIBLE_VERSION_TAILWIND = '3',
}

export async function preFlight() {
  const errorsFound = {} as Record<string, boolean>

  const packageJsonFilePath = path.resolve(PROCESS_CWD, 'package.json')

  // Node.js Project Detection

  const isPackageJsonFileExists = await fse.exists(packageJsonFilePath)

  if (!isPackageJsonFileExists) {
    errorsFound[InitCommandErrors.UNIDENTIFIED_NODE_PROJECT] = true
  }

  // Tailwind CSS Detection

  const packageJsonFileContent = await fse.readFile(packageJsonFilePath, 'utf8')

  const { dependencies } = JSON.parse(packageJsonFileContent) as {
    dependencies: Record<string, string>
  }

  const tailwindDependency = 'tailwindcss'
  const regexValidateTailwindVersion = /^4\.\d+\.\d+$/ // 4.x.x

  if (!(tailwindDependency in dependencies)) {
    errorsFound[InitCommandErrors.TAILWIND_NOT_INSTALLED] = true
  }

  if (!regexValidateTailwindVersion.test(dependencies[tailwindDependency])) {
    errorsFound[InitCommandErrors.INCOMPATIBLE_VERSION_TAILWIND] = true
  }

  return { errorsFound }
}
