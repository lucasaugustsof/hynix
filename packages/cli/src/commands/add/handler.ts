import { Eta } from 'eta'

import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'
import { CLIError } from '@/utilities/cli-error'

import { fetchRegistry, fetchRegistryMetadata } from '@/registry/api'

import {
  promptComponentSelection,
  resolveComponentUrls,
  writeComponentFile,
} from './utilities'

export async function handler(componentNames: string[]) {
  try {
    const { aliases } = manifestManager.readManifest()
    const availableComponents = await fetchRegistry()

    const eta = new Eta()

    let selectedUrls: string[] = []
    let unknownComponents: string[] = []

    if (componentNames.length > 0) {
      const { urls, unknown } = await resolveComponentUrls(
        componentNames,
        availableComponents,
      )

      selectedUrls = urls
      unknownComponents = unknown
    } else {
      const selection = await promptComponentSelection(availableComponents)

      if (Array.isArray(selection)) {
        selectedUrls = selection
      }
    }

    if (unknownComponents.length > 0) {
      logger.warning(
        `The following components could not be found: ${unknownComponents.join(', ')}`,
      )
    }

    if (selectedUrls.length === 0) {
      logger.info('No components selected. Exiting.')
      return
    }

    const metadataComponents = await Promise.all(
      selectedUrls.map(fetchRegistryMetadata),
    )

    for (const { file } of metadataComponents) {
      await writeComponentFile(eta, aliases, file)
    }
  } catch (err) {
    if (err instanceof CLIError) {
      logger.error(err.message)
    }

    logger.error('An unexpected error occurred while handling components.')
  }
}
