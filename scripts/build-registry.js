import { promises as fs, existsSync } from 'node:fs'
import path from 'node:path'

import { Project, ImportDeclaration } from 'ts-morph'
import chalk from 'chalk'
import ora from 'ora'

const PREFIX_REGISTRY = '@r'
const COMPONENTS_PATH = 'packages/react/src/components'
const IGNORED_EXTERNAL_DEPENDENCIES = ['react', '@ark-ui/react', 'motion']

function astSetupMechanism() {
  const project = new Project()
  project.addSourceFilesAtPaths('**/*.tsx')

  return project
}

/**
 *
 * @param {Array<ImportDeclaration>} importDeclarations
 */
function getExternalDependencies(importDeclarations) {
  return importDeclarations
    .map(importDeclaration => {
      const modulePath = importDeclaration.getModuleSpecifierValue()

      const isRegistryImport = modulePath.startsWith(PREFIX_REGISTRY)

      const isExactIgnoredDependency =
        IGNORED_EXTERNAL_DEPENDENCIES.includes(modulePath)

      const isPartialIgnoredDependency = IGNORED_EXTERNAL_DEPENDENCIES.some(
        ignored => modulePath.startsWith(ignored),
      )

      if (
        isRegistryImport ||
        isExactIgnoredDependency ||
        isPartialIgnoredDependency
      ) {
        return null
      }

      return modulePath
    })
    .filter(Boolean)
}

/**
 *
 * @param {ImportDeclaration} registryImport
 */
function replaceImportWithAliasTemplate(registryImport) {
  let fullImportText = registryImport.getFullText()

  const registryType = fullImportText.split('/')[1]
  const aliasTemplate = `<%= aliases.${registryType} %>`

  fullImportText = fullImportText.replace(
    path.join(PREFIX_REGISTRY, registryType),
    aliasTemplate,
  )

  registryImport.replaceWithText(fullImportText)
}

/**
 *
 * @param {string} registryName
 * @param {string} content
 */
async function writeRegistryFile(registryName, content) {
  const outputPath = path.join(import.meta.dirname, '../docs/registry')

  const loading = ora(
    `Generating ${chalk.blue(registryName)} registry file...`,
  ).start()

  try {
    if (!existsSync(outputPath)) {
      await fs.mkdir(outputPath, {
        recursive: true,
      })
    }

    await fs.writeFile(
      path.join(outputPath, `${registryName}.json`),
      JSON.stringify(content, null, 2),
    )

    loading.succeed(
      `Successfully generated ${chalk.green(registryName)} registry.`,
    )
  } catch {
    loading.fail(`Failed to generate ${chalk.red(registryName)} registry file.`)
  }
}

async function buildRegistry() {
  const astMechanism = astSetupMechanism()
  const componentFiles = await fs.readdir(path.resolve(COMPONENTS_PATH))

  for (const componentFile of componentFiles) {
    const componentFilePath = path.resolve(COMPONENTS_PATH, componentFile)
    const sourceFile = astMechanism.getSourceFile(componentFilePath)

    const importDeclarations = sourceFile.getImportDeclarations()

    const registryImports = importDeclarations.filter(node => {
      const modulePath = node
        .getModuleSpecifier()
        .getText()
        .replace(/\'/g, '')
        .trim()

      return modulePath.startsWith(PREFIX_REGISTRY)
    })

    const externalDependencies = getExternalDependencies(importDeclarations)
    const registryDependencies = []

    for (const registryImport of registryImports) {
      const regexTypeRegistryComponent = /@r\/(components)\/(\w+)/
      const modulePath = registryImport.getModuleSpecifierValue()

      if (regexTypeRegistryComponent.test(modulePath)) {
        const [, , componentRegistry] = modulePath.match(
          regexTypeRegistryComponent,
        )

        registryDependencies.push(componentRegistry)
      }

      replaceImportWithAliasTemplate(registryImport)
    }

    const { name: componentName, base: fileName } =
      path.parse(componentFilePath)

    const code = sourceFile.getSourceFile().getText()

    const registryData = {
      name: componentName,
      dependencies: externalDependencies,
      registryDependencies,
      file: {
        name: fileName,
        content: code,
      },
    }

    await writeRegistryFile(componentName, registryData)
  }

  const registryIndexContent = {
    registry: componentFiles.map(
      componentFile => path.parse(componentFile).name,
    ),
  }

  await writeRegistryFile('index', registryIndexContent)
}

buildRegistry()
