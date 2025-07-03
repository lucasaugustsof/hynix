import * as p from '@clack/prompts'
import { Eta } from 'eta'

import { addExternalDependencies } from '@/utilities/add-external-dependencies'
import { CLIError } from '@/utilities/cli-error'
import { logger } from '@/utilities/logger'
import { manifestManager } from '@/utilities/manifest-manager'

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
      return
    }

    const initialMetadata = await Promise.all(
      selectedUrls.map(fetchRegistryMetadata),
    )

    const processedRegistryDependenciesMap = new Map<
      string,
      {
        npmDeps: string[]
      }
    >()

    for (const {
      file: componentFile,
      registryDependencies: registryDeps,
      dependencies: npmDeps,
    } of initialMetadata) {
      if (registryDeps.length > 0) {
        await writeRegistryDependenciesRecursively(
          registryDeps,
          npmDeps,
          componentRegistry,
          etaEngine,
          aliases,
          processedRegistryDependenciesMap,
        )
      }

      const componentBaseName = componentFile.name.replace(/\.[^/.]+$/, '')

      if (!processedRegistryDependenciesMap.has(componentBaseName)) {
        processedRegistryDependenciesMap.set(componentBaseName, {
          npmDeps,
        })

        await writeComponentFile(etaEngine, aliases, componentFile)
      }
    }

    const npmDepsToInstall = Array.from(
      processedRegistryDependenciesMap.values(),
    ).flatMap(a => a.npmDeps)

    await p.tasks([
      {
        title: 'Installing dependencies',
        task: async () => {
          await addExternalDependencies(npmDepsToInstall)
          return 'Installed dependencies'
        },
      },
    ])

    // Add a summary here
  } catch (err) {
    if (err instanceof CLIError) {
      logger.error(err.message)
    }

    logger.error('An unexpected error occurred while handling components.')
  }
}
