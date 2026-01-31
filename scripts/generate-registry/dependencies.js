import { IGNORED_PACKAGES } from './config.js'

/**
 * Checks if a module specifier is an external package (not relative or alias)
 * @param {string} moduleSpecifier
 * @returns {boolean}
 */
function isExternalPackage(moduleSpecifier) {
  return !moduleSpecifier.startsWith('.') && !moduleSpecifier.startsWith('@/')
}

/**
 * Gets the package name from a module specifier
 * @param {string} moduleSpecifier
 * @returns {string}
 */
function getPackageName(moduleSpecifier) {
  if (moduleSpecifier.startsWith('@')) {
    const parts = moduleSpecifier.split('/')
    return `${parts[0]}/${parts[1]}`
  }

  return moduleSpecifier.split('/')[0]
}

/**
 * Checks if a package should be ignored
 * @param {string} packageName
 * @returns {boolean}
 */
function isIgnoredPackage(packageName) {
  return IGNORED_PACKAGES.some(
    ignored => packageName === ignored || packageName.startsWith(`${ignored}/`)
  )
}

/**
 * Extracts external dependencies from import declarations
 * @param {import('ts-morph').SourceFile} sourceFile
 * @returns {string[]}
 */
export function extractExternalDependencies(sourceFile) {
  const dependencies = new Set()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (isExternalPackage(moduleSpecifier)) {
      const packageName = getPackageName(moduleSpecifier)

      if (!isIgnoredPackage(packageName)) {
        dependencies.add(packageName)
      }
    }
  }

  return [...dependencies].sort()
}

/**
 * Extracts registry dependencies (internal component imports)
 * @param {import('ts-morph').SourceFile} sourceFile
 * @param {string} currentComponentName
 * @returns {string[]}
 */
export function extractRegistryDependencies(sourceFile, currentComponentName) {
  const dependencies = new Set()

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue()

    if (moduleSpecifier.startsWith('@/components/')) {
      const match = moduleSpecifier.match(/@\/components\/([^/]+)/)

      if (match) {
        const componentName = match[1]
        if (componentName !== currentComponentName) {
          dependencies.add(componentName)
        }
      }
    }
  }

  return [...dependencies].sort()
}
