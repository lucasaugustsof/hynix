import { promises as fs } from 'node:fs'
import { join } from 'node:path'

import { z } from 'zod'

import { CWD, MANIFEST_FILE_NAME } from './const'

const aliasSchema = z
  .string()
  .min(1, 'Alias cannot be empty')
  .startsWith('@/', 'Alias must start with @/')

export const manifestSchema = z.object({
  aliases: z.object({
    components: aliasSchema,
    utils: aliasSchema,
    styles: aliasSchema,
  }),
  rsc: z.boolean({
    message: 'RSC option is required',
  }),
})

export type HynixManifest = z.infer<typeof manifestSchema>

class ManifestManager {
  private readonly path = join(CWD, MANIFEST_FILE_NAME)

  async read(): Promise<HynixManifest> {
    let content: string

    try {
      content = await fs.readFile(this.path, 'utf-8')
    } catch {
      throw new Error(`Could not read ${MANIFEST_FILE_NAME}. Run "hynix init" first.`)
    }

    let data: unknown

    try {
      data = JSON.parse(content)
    } catch {
      throw new Error(
        `Invalid JSON in ${MANIFEST_FILE_NAME}. Please fix the syntax or delete the file and run "hynix init" again.`
      )
    }

    const result = manifestSchema.safeParse(data)

    if (!result.success) {
      const issues = result.error.issues
        .map(i => `  - ${i.path.join('.')}: ${i.message}`)
        .join('\n')
      throw new Error(`Invalid ${MANIFEST_FILE_NAME}:\n${issues}`)
    }

    return result.data
  }

  async create(config: HynixManifest): Promise<void> {
    const result = manifestSchema.safeParse(config)

    if (!result.success) {
      const issues = result.error.issues
        .map(i => `  - ${i.path.join('.')}: ${i.message}`)
        .join('\n')
      throw new Error(`Invalid configuration:\n${issues}`)
    }

    const data = JSON.stringify(result.data, null, 2)
    await fs.writeFile(this.path, data, 'utf-8')
  }

  async delete(): Promise<void> {
    try {
      await fs.unlink(this.path)
    } catch {
      throw new Error(
        `Could not delete ${MANIFEST_FILE_NAME}. File may not exist or permission denied.`
      )
    }
  }

  async exists(): Promise<boolean> {
    try {
      await fs.access(this.path)
      return true
    } catch {
      return false
    }
  }
}

export const manifest = new ManifestManager()
