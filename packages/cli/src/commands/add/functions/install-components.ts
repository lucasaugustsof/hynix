import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import { Eta } from 'eta'
import ora from 'ora'

import type { HynixConfig } from '@/schemas/config'
import { fetchComponentRegistry } from '@/services/fetch-registry'
import { logger } from '@/utils/logger'
import { resolveAliasToAbsolutePath } from '@/utils/resolve-alias-to-absolute-path'

type ComponentInstallStatus = 'installed' | 'failed' | 'already-installed'

interface ComponentInstallResult {
  name: string
  status: ComponentInstallStatus
  error?: string
  externalDependencies?: string[]
  filesWritten?: number
}

type InstallResultsMap = Map<string, ComponentInstallResult>

export async function installComponents(
  componentNames: string[],
  config: HynixConfig
): Promise<InstallResultsMap> {
  const results: InstallResultsMap = new Map()
  const etaEngine = new Eta()

  for (const componentName of componentNames) {
    const result = await installSingleComponent(componentName, config, etaEngine)
    results.set(componentName, result)
  }

  return results
}

export async function installSingleComponent(
  componentName: string,
  config: HynixConfig,
  etaEngine: Eta
): Promise<ComponentInstallResult> {
  const componentsPath = resolveAliasToAbsolutePath(config.aliases.components)

  const componentSpinner = ora(`Installing ${componentName}`).start()

  try {
    const componentDir = path.join(componentsPath, componentName)
    const isExists = existsSync(componentDir)

    if (isExists) {
      return {
        name: componentName,
        status: 'already-installed',
      }
    }

    const registryComponent = await fetchComponentRegistry(componentName)
    let filesWritten = 0

    for (const { name, content } of registryComponent.files) {
      const filePath = path.join(componentsPath, componentName, name)

      await fs.mkdir(path.dirname(filePath), {
        recursive: true,
      })

      const renderedContent = etaEngine.renderString(content, {
        aliases: config.aliases,
      })
      await fs.writeFile(filePath, renderedContent, 'utf-8')

      filesWritten++
    }

    return {
      name: componentName,
      status: 'installed',
      externalDependencies: registryComponent.externalDependencies,
      filesWritten,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    logger.error(errorMessage, {
      indent: 1,
    })

    return {
      name: componentName,
      status: 'failed',
      error: errorMessage,
    }
  } finally {
    componentSpinner.stop()
  }
}
