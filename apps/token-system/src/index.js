import sdConfig from './config.js'
import { formats } from './formats/index.js'
import StyleDictionary from 'style-dictionary'

export async function main() {
  const sd = new StyleDictionary(sdConfig)

  for (const [name, format] of Object.entries(formats)) {
    sd.registerFormat({
      name,
      format,
    })
  }

  await sd.buildAllPlatforms()
}

main()
