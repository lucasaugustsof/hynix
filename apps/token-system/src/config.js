import { formatEnums } from './formats/index.js'
import { transformEnums } from './transforms/index.js'
// import { logVerbosityLevels } from 'style-dictionary/enums'

/** @type {import('style-dictionary').Config} */
export default {
  source: ['tokens/foundations.json', 'tokens/shadows.json'],
  platforms: {
    css: {
      transforms: [transformEnums.colorOklch, transformEnums.shadowCSS],
      buildPath: 'dist/',
      files: [
        {
          destination: 'globals.css',
          format: formatEnums.tailwindV4,
        },
      ],
      // log: {
      //   verbosity: logVerbosityLevels.verbose,
      // },
    },
  },
}
