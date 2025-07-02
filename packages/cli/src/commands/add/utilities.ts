import { promises as fs } from 'node:fs'
import path from 'node:path'

import * as p from '@clack/prompts'
import type { Eta } from 'eta'
import prettier from 'prettier'

import { logger } from '@/utilities/logger'
import { resolveAliasToAbsolutePath } from '@/utilities/resolve-alias-to-absolute-path'

import { fetchRegistryMetadata } from '@/registry/api'

export async function resolveComponentUrls(
  componentNames: string[],
  availableComponents: {
    name: string
    url: string
  }[],
): Promise<{
  urls: string[]
  unknown: string[]
}> {
  try {
    const componentMap = new Map(availableComponents.map(c => [c.name, c.url]))
    const unknown: string[] = []

    const urls = componentNames
      .filter(name => {
        if (componentMap.has(name)) return true

        unknown.push(name)
        return false
      })
      .map(name => componentMap.get(name)!)

    return { urls, unknown }
  } catch (err) {
    logger.debug('Failed to resolve component URLs.')
    throw new Error(err)
  }
}

export async function promptComponentSelection(
  availableComponents: {
    name: string
    url: string
  }[],
): Promise<string[] | symbol> {
  const selection = await p.multiselect({
    message:
      'Select your components › (`Space` to select) (`A` to toggle all) (`Enter` to confirm).',
    options: availableComponents
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ name, url }) => ({
        label: name,
        value: url,
      })),
  })

  if (p.isCancel(selection)) {
    logger.warning('Component selection cancelled.')
  }

  return selection
}

export async function writeComponentFile(
  etaEngine: Eta,
  aliases: Record<string, string>,
  file: {
    name: string
    content: string
  },
) {
  try {
    const resolvedCode = etaEngine.renderString(file.content, {
      aliases,
    })

    const formattedCode = await prettier.format(resolvedCode, {
      parser: 'typescript',
    })

    const outputPath = path.join(
      resolveAliasToAbsolutePath(aliases.components),
      file.name,
    )

    await fs.writeFile(outputPath, formattedCode, 'utf8')
  } catch (err) {
    logger.debug(`Failed to write file: ${file.name}`)
    throw new Error(err)
  }
}

export async function writeRegistryDependenciesRecursively(
  dependencyNames: string[],
  componentRegistry: {
    name: string
    url: string
  }[],
  etaEngine: Eta,
  pathAliases: Record<string, string>,
  processedComponents: Set<string>,
) {
  const pendingDependencies = dependencyNames.filter(
    name => !processedComponents.has(name),
  )
  if (pendingDependencies.length === 0) return

  for (const dependencyName of pendingDependencies) {
    processedComponents.add(dependencyName)

    const registryEntry = componentRegistry.find(
      entry => entry.name === dependencyName,
    )

    if (!registryEntry) {
      logger.warning(`Component not found in registry: ${dependencyName}`)
      continue
    }

    const componentMetadata = await fetchRegistryMetadata(registryEntry.url)

    if (componentMetadata.registryDependencies.length > 0) {
      await writeRegistryDependenciesRecursively(
        componentMetadata.registryDependencies,
        componentRegistry,
        etaEngine,
        pathAliases,
        processedComponents,
      )
    }

    await writeComponentFile(etaEngine, pathAliases, componentMetadata.file)
  }
}
