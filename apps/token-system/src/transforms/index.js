/**
 * @fileoverview Design token transforms for Style Dictionary
 * This module provides transformation functions to convert design tokens
 * from one format to another (e.g., color spaces, units, etc.)
 */

import chroma from 'chroma-js'

/**
 * @typedef {import('style-dictionary/types').TransformedToken} TransformedToken
 * @typedef {import('style-dictionary/types').Transform} Transform
 */

export const transformEnums = {
  /** Transform color values to OKLCH color space */
  colorOklch: 'color/oklch',
}

/**
 *
 * @type {Object<string, Omit<Transform, 'name'>>}
 */
export const transforms = {
  [transformEnums.colorOklch]: {
    type: 'value',
    filter: token => token.$type === 'color',
    transform: token => {
      const mappedValue = {}

      if (typeof token.$value === 'object') {
        for (const theme in token.$value) {
          mappedValue[theme] = chroma(token.$value[theme]).css('oklch')
        }
      }

      return mappedValue
    },
  },
}
