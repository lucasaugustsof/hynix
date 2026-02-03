import { readPackageJson } from '@/common/read-package-json'

export async function ensureValidProject(): Promise<{
  message: string
}> {
  await readPackageJson()
  return {
    message: 'Project structure validated successfully.',
  }
}
