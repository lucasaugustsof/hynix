import { promises as fs, readFileSync } from 'node:fs'
import path from 'node:path'

import { ZodError } from 'zod'

import { type Manifest, ManifestSchema } from '@/schemas/manifest'

import { CLIError } from './cli-error'
import { FS_ERROR_CODES, MANIFEST_FILE, PROCESS_CWD } from './const'

export class ManifestManager {
  private manifestPath = path.resolve(PROCESS_CWD, MANIFEST_FILE)

  public async saveManifest(content: Manifest): Promise<void> {
    const result = ManifestSchema.safeParse(content)

    if (!result.success) {
      const msgs = result.error.issues.map(
        i => `${i.path.join('.')}: ${i.message}`,
      )

      throw new CLIError(`Invalid manifest:\n${msgs.join('\n')}`)
    }

    try {
      await fs.writeFile(
        this.manifestPath,
        JSON.stringify(result.data, null, 2),
        'utf8',
      )
    } catch (err) {
      const { code } = err
      if (
        code === FS_ERROR_CODES.PERMISSION_DENIED ||
        code === FS_ERROR_CODES.OPERATION_NOT_PERMITTED
      ) {
        throw new CLIError(
          `Permission denied writing manifest at ${this.manifestPath}`,
        )
      }
      if (code === FS_ERROR_CODES.IS_A_DIRECTORY) {
        throw new CLIError(
          `Expected a file but found a directory at ${this.manifestPath}`,
        )
      }
      throw new CLIError(`Error writing manifest: ${err.message || err}`)
    }
  }

  public readManifest(): Manifest {
    let raw: string

    try {
      raw = readFileSync(this.manifestPath, 'utf8')
    } catch (err) {
      const { code } = err
      if (code === FS_ERROR_CODES.NO_SUCH_FILE_OR_DIRECTORY) {
        throw new CLIError(`Manifest not found at ${this.manifestPath}`)
      }

      if (
        code === FS_ERROR_CODES.PERMISSION_DENIED ||
        code === FS_ERROR_CODES.OPERATION_NOT_PERMITTED
      ) {
        throw new CLIError(
          `Permission denied reading manifest at ${this.manifestPath}`,
        )
      }

      if (code === FS_ERROR_CODES.IS_A_DIRECTORY) {
        throw new CLIError(
          `Expected a file but found a directory at ${this.manifestPath}`,
        )
      }

      throw new CLIError(`Error reading manifest: ${err.message || err}`)
    }

    let data: unknown
    try {
      data = JSON.parse(raw)
    } catch (err) {
      throw new CLIError(`Invalid JSON in manifest: ${err.message || err}`)
    }

    try {
      return ManifestSchema.parse(data)
    } catch (err) {
      if (err instanceof ZodError) {
        const msgs = err.issues.map(i => `${i.path.join('.')}: ${i.message}`)
        throw new CLIError(`Schema validation failed:\n${msgs.join('\n')}`)
      }
      throw new CLIError(`Unexpected validation error: ${err}`)
    }
  }
}

export const manifestManager = new ManifestManager()
