import { lilconfig } from 'lilconfig'

import { LIL_CONFIG_SEARCH_OPTIONS } from '@/common/const'
import { CliError } from '@/common/errors'

import { InitErrorCode } from './errors'

export async function ensureNotInitialized(): Promise<{
  message: string
}> {
  const config = await lilconfig('hynix', LIL_CONFIG_SEARCH_OPTIONS).search()

  if (config) {
    const { filepath } = config

    throw new CliError(
      'This project has already been initialized.\n' +
        `Configuration found at: ${filepath}\n` +
        'To reinitialize, delete the config file and run this command again.',
      {
        code: InitErrorCode.ALREADY_INITIALIZED,
      }
    )
  }

  return {
    message: 'Ready to initialize project.',
  }
}
