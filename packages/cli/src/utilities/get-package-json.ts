import { promises as fs, existsSync } from 'node:fs'
import path from 'node:path'

import { PROCESS_CWD } from './const'

export type PackageJson = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export async function getPackageJson(
  onMissing?: (filePath?: string) => void,
): Promise<PackageJson | undefined> {
  const filePath = path.join(PROCESS_CWD, 'package.json')

  if (!existsSync(filePath)) {
    onMissing?.(filePath)
    return
  }

  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as PackageJson
  } catch (err) {
    console.error(`Failed to read or parse ${filePath}:`, err)
    return
  }
}
