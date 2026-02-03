import { promises as fs } from 'node:fs'

import { lilconfig } from 'lilconfig'

import { LIL_CONFIG_SEARCH_OPTIONS } from '@/common/const'

export async function resetInitialization(): Promise<void> {
  const config = await lilconfig('hynix', LIL_CONFIG_SEARCH_OPTIONS).search()

  if (!config?.filepath) {
    throw new Error(
      'No configuration file found.\n' + 'The project may not have been initialized yet.'
    )
  }

  try {
    await fs.unlink(config.filepath)
  } catch {
    throw new Error(
      `Failed to delete configuration file.\n` +
        `Location: ${config.filepath}\n` +
        'Please check file permissions and try again.'
    )
  }
}
