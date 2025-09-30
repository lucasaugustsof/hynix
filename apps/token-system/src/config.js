import { formatEnums } from './formats/index.js'
import { transformEnums } from './transforms/index.js'

/** @type {import('style-dictionary').Config} */
export default {
  source: ['tokens/foundations.json'],
  platforms: {
    css: {
      transforms: [transformEnums.colorOklch],
      buildPath: 'dist/',
      files: [
        {
          destination: 'globals.css',
          format: formatEnums.tailwindV4,
        },
      ],
    },
  },
}
