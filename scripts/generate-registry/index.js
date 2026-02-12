import { promises as fs } from 'node:fs'
import path from 'node:path'

import { Project } from 'ts-morph'

import { COMPONENTS_DIR, OUTPUT_DIR, ROOT_DIR } from './config.js'
import { calculateDates } from './dates.js'
import { extractExternalDependencies, extractRegistryDependencies } from './dependencies.js'
import { logger } from './logger.js'
import { convertAliasesToEtaFormat } from './transform.js'

/**
 * Gets all files in a component directory recursively
 * @param {string} componentDir
 * @param {string} [relativePath='']
 * @returns {Promise<Array<{path: string, relativePath: string}>>}
 */
async function getComponentFiles(componentDir, relativePath = '') {
  const entries = await fs.readdir(componentDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(componentDir, entry.name)
    const relPath = path.join(relativePath, entry.name)

    if (entry.isDirectory()) {
      const subFiles = await getComponentFiles(fullPath, relPath)
      files.push(...subFiles)
    } else if (entry.isFile()) {
      files.push({
        path: fullPath,
        relativePath: relPath,
      })
    }
  }

  return files
}

/**
 * Determines if a file is a TypeScript/JavaScript file
 * @param {string} filePath
 * @returns {boolean}
 */
function isCodeFile(filePath) {
  return /\.(ts|tsx|js|jsx)$/.test(filePath)
}

/**
 * Generates registry metadata for a single component
 * @param {string} componentName
 * @param {string} componentDir
 * @param {Project} project
 * @returns {Promise<object>}
 */
async function generateComponentRegistry(componentName, componentDir, project) {
  const allExternalDeps = new Set()
  const allRegistryDeps = new Set()

  const componentFiles = await getComponentFiles(componentDir)

  const files = await Promise.all(
    componentFiles.map(async ({ path: filePath, relativePath }) => {
      let content = await fs.readFile(filePath, 'utf-8')

      // Only process dependencies for TypeScript/JavaScript files
      if (isCodeFile(filePath)) {
        const sourceFile = project.addSourceFileAtPath(filePath)

        const externalDeps = extractExternalDependencies(sourceFile)
        const registryDeps = extractRegistryDependencies(sourceFile, componentName)

        for (const dep of externalDeps) {
          allExternalDeps.add(dep)
        }

        for (const dep of registryDeps) {
          allRegistryDeps.add(dep)
        }

        content = convertAliasesToEtaFormat(content)
      }

      return {
        name: relativePath,
        content,
      }
    })
  )

  files.sort((a, b) => {
    if (a.name === 'index.ts') return -1
    if (b.name === 'index.ts') return 1
    if (a.name === 'namespace.ts') return -1
    if (b.name === 'namespace.ts') return 1

    return a.name.localeCompare(b.name)
  })

  return {
    name: componentName,
    type: 'registry:component',
    externalDependencies: [...allExternalDeps].sort(),
    registryDependencies: [...allRegistryDeps].sort(),
    files,
  }
}

async function main() {
  const startTime = performance.now()

  try {
    logger.header('Registry Generator')
    logger.dim(`Source: ${path.relative(ROOT_DIR, COMPONENTS_DIR)}`)

    await fs.mkdir(OUTPUT_DIR, {
      recursive: true,
    })

    const project = new Project({
      skipFileDependencyResolution: true,
      compilerOptions: {
        baseUrl: path.join(ROOT_DIR, 'packages/react'),
        paths: {
          '@/*': ['src/*'],
        },
      },
    })

    const entries = await fs.readdir(COMPONENTS_DIR, {
      withFileTypes: true,
    })

    const componentDirs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => ({
        name: entry.name,
        path: path.join(COMPONENTS_DIR, entry.name),
      }))

    logger.header(`Processing ${componentDirs.length} components`)

    const results = await Promise.allSettled(
      componentDirs.map(async ({ name, path: filePath }) => {
        const componentRegistry = await generateComponentRegistry(name, filePath, project)
        const outputPath = path.resolve(OUTPUT_DIR, `${name}.json`)

        const { createdAt, updatedAt } = await calculateDates(outputPath, componentRegistry.files)

        const registryWithDates = {
          ...componentRegistry,
          createdAt,
          updatedAt,
        }

        await fs.writeFile(outputPath, JSON.stringify(registryWithDates, null, 2))

        return registryWithDates
      })
    )

    let successCount = 0
    let failedCount = 0

    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      const componentName = componentDirs[i].name

      if (result.status === 'fulfilled') {
        const { files } = result.value
        const filesInfo = `${files.length} files`

        logger.component(componentName, 'success', filesInfo)
        successCount++
      } else {
        logger.component(componentName, 'error')
        logger.error(`  └─ ${result.reason.message}`)

        failedCount++
      }
    }

    const duration = ((performance.now() - startTime) / 1000).toFixed(2)

    logger.summary({
      total: componentDirs.length,
      success: successCount,
      failed: failedCount,
      outputDir: path.relative(ROOT_DIR, OUTPUT_DIR),
    })

    logger.dim(`Completed in ${duration}s`)
    console.log()

    if (failedCount > 0) {
      process.exit(1)
    }
  } catch (error) {
    logger.error(`Fatal error: ${error.message}`)
    process.exit(1)
  }
}

main()
