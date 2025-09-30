/**
 * @fileoverview Format registry for Style Dictionary
 *
 * This module exports all available formatters for Style Dictionary and provides
 * a centralized registry for format names and their implementations.
 * Formatters define how design tokens are converted into output files.
 *
 * @module formats/index
 */

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
