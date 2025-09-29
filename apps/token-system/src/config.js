import { formatEnums } from './formats.js'
import { transformGroups } from 'style-dictionary/enums'

/** @type {import('style-dictionary').Config} */
export default {
  source: ['tokens/foundations.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
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
