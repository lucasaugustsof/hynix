import { existsSync, promises as fs } from 'node:fs'
import path from 'node:path'

import { Eta } from 'eta'
import ora from 'ora'
import pc from 'picocolors'
import { pascalCase } from 'scule'

import type { HynixConfig } from '@/schemas/config'
import { fetchComponentRegistry } from '@/services/fetch-registry'
import { resolveAliasToAbsolutePath } from '@/utils/resolve-alias-to-absolute-path'

type ComponentInstalled = {
  status: 'installed'
  name: string
  externalDependencies?: string[]
  registryDependencies?: string[]
  filesWritten: number
}

type ComponentFailed = {
  status: 'failed'
  name: string
  error: string
}

type ComponentAlreadyInstalled = {
  status: 'already-installed'
  name: string
  onOverwrite: () => Promise<void>
}

type ComponentSkipped = {
  status: 'skipped'
  name: string
  reason: 'dependency'
}

type ComponentInstallResult =
  | ComponentInstalled
  | ComponentFailed
  | ComponentAlreadyInstalled
  | ComponentSkipped

type InstallResultsMap = Map<string, ComponentInstallResult>

type RegistryComponent = Awaited<ReturnType<typeof fetchComponentRegistry>>

async function resolveComponentDependencyTree(
  componentNames: string[],
  visited: Set<string> = new Set()
): Promise<string[]> {
  const resolved: string[] = []

  for (const componentName of componentNames) {
    if (visited.has(componentName)) {
      continue
    }

    visited.add(componentName)

    try {
      const registryComponent = await fetchComponentRegistry(componentName)

      if (registryComponent.registryDependencies.length > 0) {
        const deps = await resolveComponentDependencyTree(
          registryComponent.registryDependencies,
          visited
        )
        resolved.push(...deps)
      }

      resolved.push(componentName)
    } catch {
      resolved.push(componentName)
    }
  }

  return resolved
}

export async function installComponents(
  componentNames: string[],
  config: HynixConfig
): Promise<InstallResultsMap> {
  const results: InstallResultsMap = new Map()

  const etaEngine = new Eta({
    autoEscape: false,
    cache: true,
  })

  const resolvedComponents = await resolveComponentDependencyTree(componentNames)

  const uniqueComponents = [...new Set(resolvedComponents)]

  for (const componentName of uniqueComponents) {
    const result = await installSingleComponent(componentName, config, etaEngine)
    results.set(componentName, result)
  }

  return results
}

async function writeComponentFiles(
  registryComponent: RegistryComponent,
  componentsPath: string,
  componentName: string,
  etaEngine: Eta,
  config: HynixConfig
): Promise<number> {
  const templateData = {
    aliases: config.aliases,
  }

  await Promise.all(
    registryComponent.files.map(({ name, content }) =>
      writeComponentFile(componentsPath, componentName, name, content, etaEngine, templateData)
    )
  )

  return registryComponent.files.length
}

async function writeComponentFile(
  componentsPath: string,
  componentName: string,
  fileName: string,
  fileContent: string,
  etaEngine: Eta,
  templateData: {
    aliases: HynixConfig['aliases']
  }
): Promise<void> {
  const filePath = path.join(componentsPath, componentName, fileName)

  await fs.mkdir(path.dirname(filePath), {
    recursive: true,
  })

  const renderedContent = etaEngine.renderString(fileContent, templateData)
  await fs.writeFile(filePath, renderedContent, 'utf-8')
}

export async function installSingleComponent(
  componentName: string,
  config: HynixConfig,
  etaEngine: Eta
): Promise<ComponentInstallResult> {
  const componentsPath = resolveAliasToAbsolutePath(config.aliases.components)
  const componentDir = path.join(componentsPath, componentName)

  const installSpinner = ora(`Installing ${componentName}`).start()

  try {
    const registryComponent = await fetchComponentRegistry(componentName)

    if (existsSync(componentDir)) {
      return {
        name: componentName,
        status: 'already-installed',
        onOverwrite: async () => {
          const componentDisplayName = pascalCase(componentName)
          installSpinner.text = `Overwriting ${pc.cyan(componentDisplayName)}`

          await fs.rm(componentDir, {
            recursive: true,
          })

          await writeComponentFiles(
            registryComponent,
            componentsPath,
            componentName,
            etaEngine,
            config
          )

          installSpinner.stop()
        },
      }
    }

    const filesWritten = await writeComponentFiles(
      registryComponent,
      componentsPath,
      componentName,
      etaEngine,
      config
    )

    return {
      name: componentName,
      status: 'installed',
      externalDependencies: registryComponent.externalDependencies,
      registryDependencies: registryComponent.registryDependencies,
      filesWritten,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return {
      name: componentName,
      status: 'failed',
      error: errorMessage,
    }
  } finally {
    installSpinner.stop()
  }
}
