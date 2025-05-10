import { promises as fs } from 'node:fs'
import path from 'node:path'

import { Project, ImportDeclaration } from 'ts-morph'

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

async function buildRegistry() {
  const astMechanism = astSetupMechanism()
  const componentFiles = await fs.readdir(path.resolve(COMPONENTS_PATH))

  const componentFilePath = path.resolve(COMPONENTS_PATH, 'checkbox.tsx')
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

  const { name: componentName, base: fileName } = path.parse(componentFilePath)
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

  console.log(JSON.stringify(registryData, null, 2))
}

buildRegistry()
