import { promises as fs } from 'node:fs'
import path from 'node:path'

import * as z from 'zod'

import { CWD } from './const'

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

/**
 * Type representing a validated package.json object
 */
export type PackageJson = z.infer<typeof packageJsonSchema>

/**
 * Reads and validates the package.json file from the current working directory
 *
 * Locates the package.json file in the CWD, reads its contents, parses the JSON,
 * and validates it against the required schema. Provides detailed error messages
 * for missing files, invalid JSON, or schema validation failures.
 *
 * @returns A promise that resolves to the validated PackageJson object
 * @throws {Error} If package.json is not found in the current directory
 * @throws {Error} If the file cannot be read due to permissions
 * @throws {Error} If the file contains invalid JSON syntax
 * @throws {Error} If the package.json is missing required fields or has invalid structure
 *
 * @example
 * ```ts
 * try {
 *   const pkg = await readPackageJson()
 *   console.log(pkg.name) // 'my-app'
 *   console.log(pkg.version) // '1.0.0'
 *   console.log(pkg.dependencies) // { react: '^18.0.0', ... }
 * } catch (error) {
 *   console.error(error.message) // Detailed error message
 * }
 * ```
 */
export async function readPackageJson(): Promise<PackageJson> {
  const packageJsonPath = path.join(CWD, 'package.json')

  const raw = await readFile(packageJsonPath)
  const parsed = parseJSON(raw)

  const result = packageJsonSchema.safeParse(parsed)

  if (!result.success) {
    const issues = result.error.issues.map(issue => `  - ${issue.message}`).join('\n')

    throw new Error(`Invalid package.json:\n${issues}`)
  }

  return result.data
}

/**
 * Reads a file from the file system
 *
 * @param filePath - Absolute path to the file to read
 * @returns A promise that resolves to the file contents as a string
 * @throws {Error} If the file is not found (ENOENT)
 * @throws {Error} If the file cannot be read due to other errors
 */
async function readFile(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (error) {
    const isNotFound = error instanceof Error && 'code' in error && error.code === 'ENOENT'

    throw new Error(
      isNotFound
        ? 'Could not find package.json in the current directory.\n' +
            'Make sure you are running this command from the root of your project.'
        : 'Failed to read package.json.\nPlease check file permissions and try again.'
    )
  }
}

/**
 * Parses a JSON string into a PackageJson object
 *
 * @param raw - The raw JSON string to parse
 * @returns The parsed object (not yet validated)
 * @throws {Error} If the JSON is malformed or contains syntax errors
 */
function parseJSON(raw: string): PackageJson {
  try {
    return JSON.parse(raw)
  } catch {
    throw new Error(
      'Failed to parse package.json.\n' +
        'The file contains invalid JSON. Please fix the syntax errors and try again.'
    )
  }
}
