import pc from 'picocolors'

import { hynixConfig } from '@/utils/config-file'
import { logger } from '@/utils/logger'

export async function cleanExistingConfig() {
  const existingConfig = await hynixConfig.find()

  if (existingConfig) {
    await hynixConfig.delete()

    logger.break()
    logger.success(`Removed existing configuration from ${pc.cyan(existingConfig.filepath)}`)
  }
}
