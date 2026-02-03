import { promises as fs } from 'node:fs'
import path from 'node:path'

import * as z from 'zod'

import { CWD } from '@/common/const'
import { CliError } from '@/common/errors'

enum PackageJsonErrorCode {
  NOT_FOUND = 'INIT_001',
  READ_ERROR = 'INIT_002',
  PARSE_ERROR = 'INIT_003',
  INVALID = 'INIT_004',
}

const packageJsonSchema = z.object({
  name: z.string({
    message: 'The "name" field is required in package.json',
  }),
  version: z.string({
    message: 'The "version" field is required in package.json',
  }),
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
})

export type PackageJson = z.infer<typeof packageJsonSchema>

export async function readPackageJson(): Promise<PackageJson> {
  const packageJsonPath = path.join(CWD, 'package.json')

  const raw = await readFile(packageJsonPath)
  const parsed = parseJSON(raw)

  const result = packageJsonSchema.safeParse(parsed)

  if (!result.success) {
    const issues = result.error.issues.map(issue => `  - ${issue.message}`).join('\n')

    throw new CliError(`Invalid package.json:\n${issues}`, {
      code: PackageJsonErrorCode.INVALID,
    })
  }

  return result.data
}

async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    const isNotFound = error instanceof Error && 'code' in error && error.code === 'ENOENT'

    throw new CliError(
      isNotFound
        ? 'Could not find package.json in the current directory.\n' +
            'Make sure you are running this command from the root of your project.'
        : 'Failed to read package.json.\nPlease check file permissions and try again.',
      {
        code: isNotFound ? PackageJsonErrorCode.NOT_FOUND : PackageJsonErrorCode.READ_ERROR,
      }
    )
  }
}

function parseJSON(raw: string): PackageJson {
  try {
    return JSON.parse(raw)
  } catch {
    throw new CliError(
      'Failed to parse package.json.\n' +
        'The file contains invalid JSON. Please fix the syntax errors and try again.',
      {
        code: PackageJsonErrorCode.PARSE_ERROR,
      }
    )
  }
}
