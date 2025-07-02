import { Eta } from 'eta'

import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'
import { CLIError } from '@/utilities/cli-error'

import { fetchRegistry, fetchRegistryMetadata } from '@/registry/api'

import {
  promptComponentSelection,
  resolveComponentUrls,
  writeComponentFile,
  writeRegistryDependenciesRecursively,
} from './utilities'

export async function handler(componentNames: string[]) {
  try {
    const { aliases } = manifestManager.readManifest()

    const componentRegistry = await fetchRegistry()
    const etaEngine = new Eta()

    let selectedUrls: string[] = []
    let unknownComponents: string[] = []

    if (componentNames.length > 0) {
      const { urls, unknown } = await resolveComponentUrls(
        componentNames,
        componentRegistry,
      )

      selectedUrls = urls
      unknownComponents = unknown
    } else {
      const selection = await promptComponentSelection(componentRegistry)

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

    const initialMetadata = await Promise.all(
      selectedUrls.map(fetchRegistryMetadata),
    )

    const processedComponents = new Set<string>()

    for (const {
      file: componentFile,
      registryDependencies: directDeps,
    } of initialMetadata) {
      if (directDeps.length > 0) {
        await writeRegistryDependenciesRecursively(
          directDeps,
          componentRegistry,
          etaEngine,
          aliases,
          processedComponents,
        )
      }

      const componentBaseName = componentFile.name.replace(/\.[^/.]+$/, '')

      if (!processedComponents.has(componentBaseName)) {
        processedComponents.add(componentBaseName)
        await writeComponentFile(etaEngine, aliases, componentFile)
      }
    }

    console.log(processedComponents)
  } catch (err) {
    if (err instanceof CLIError) {
      logger.error(err.message)
    }
    logger.error('An unexpected error occurred while handling components.')
  }
}
