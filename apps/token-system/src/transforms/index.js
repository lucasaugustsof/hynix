/**
 * @fileoverview Design token transforms for Style Dictionary
 * This module provides transformation functions to convert design tokens
 * from one format to another (e.g., color spaces, units, etc.)
 *
 * @module transforms/index
 */

import chroma from 'chroma-js'
import { transformTypes } from 'style-dictionary/enums'
import { transformShadow } from './shadow-transform.js'

/**
 * @typedef {import('style-dictionary/types').TransformedToken} TransformedToken
 * @typedef {import('style-dictionary/types').Transform} Transform
 */

export const transformEnums = {
  /** Transform color values to OKLCH color space */
  colorOklch: 'color/oklch',
  /** Transform W3C shadow values to CSS box-shadow */
  shadowCSS: 'shadow/css',
}

/**
 *
 * @type {Object<string, Omit<Transform, 'name'>>}
 */
export const transforms = {
  [transformEnums.colorOklch]: {
    type: transformTypes.value,
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
  [transformEnums.shadowCSS]: {
    type: transformTypes.value,
    filter: token => token.$type === 'shadow',
    transform: transformShadow,
  },
}
