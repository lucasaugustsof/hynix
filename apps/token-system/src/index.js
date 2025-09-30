import sdConfig from './config.js'
import { formats } from './formats/index.js'
import { transforms } from './transforms/index.js'
import StyleDictionary from 'style-dictionary'

export async function main() {
  const sd = new StyleDictionary(sdConfig)

  /**
   * Registers Style Dictionary extensions (transforms or formats)
   * @param {string} method - The Style Dictionary method name ('registerTransform' or 'registerFormat')
   * @param {Object} entries - Object containing name-value pairs to register
   * @param {Function} fn - Formatter function to adapt the value structure for the registration
   */
  function register(method, entries, fn) {
    for (const [name, value] of Object.entries(entries)) {
      sd[method]({
        name,
        ...fn(value),
      })
    }
  }

  register('registerTransform', transforms, value => ({
    ...value,
  }))

  register('registerFormat', formats, value => ({
    format: value,
  }))

  await sd.buildAllPlatforms()
}

main()
