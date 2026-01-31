import { ALIAS_MAPPINGS } from './config.js'

/**
 * Converts alias imports to Eta template format
 * @param {string} content - File content
 * @returns {string} - Content with aliases converted to Eta format
 */
export function convertAliasesToEtaFormat(content) {
  let result = content

  for (const [alias, etaFormat] of Object.entries(ALIAS_MAPPINGS)) {
    const singleQuoteRegex = new RegExp(`from '${alias.replace('/', '\\/')}`, 'g')
    const doubleQuoteRegex = new RegExp(`from "${alias.replace('/', '\\/')}`, 'g')

    result = result.replace(singleQuoteRegex, `from '${etaFormat}`)
    result = result.replace(doubleQuoteRegex, `from "${etaFormat}`)
  }

  return result
}
