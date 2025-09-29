import { tailwindFormat } from './tailwind-format.js'

/**
 * @typedef {import('style-dictionary/types').FormatFn} FormatFn
 */

export const formatEnums = {
  tailwindV4: 'tailwind/v4',
}

/**
 * @type {Object<string, FormatFn>}
 */
export const formats = {
  [formatEnums.tailwindV4]: tailwindFormat.run.bind(tailwindFormat),
}
