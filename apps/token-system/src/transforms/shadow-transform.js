/**
 * @fileoverview Shadow transformer for Style Dictionary
 *
 * Transforms W3C Design Token Format shadows into Tailwind v4 compatible CSS box-shadow values.
 * Handles both single shadows and multiple shadow layers (arrays).
 *
 * @module transforms/shadow-transform
 */

import chroma from 'chroma-js'

/**
 * @typedef {import('style-dictionary/types').TransformedToken} TransformedToken
 */

/**
 * Converts W3C color object to CSS rgba() string
 *
 * @param {Object} color - W3C color object
 * @param {string} color.colorSpace - Color space (e.g., 'srgb')
 * @param {number[]} color.components - RGB components as 0-1 values
 * @param {number} color.alpha - Alpha channel as 0-1 value
 * @returns {string} CSS rgba() color string
 */
function colorToCSS(color) {
  const [r, g, b] = color.components.map(c => c * 255)
  return chroma(r, g, b, color.alpha).css()
}

/**
 * Converts a single shadow object to CSS box-shadow string
 *
 * @param {Object} shadow - W3C shadow object
 * @param {Object} shadow.color - W3C color object
 * @param {Object} shadow.offsetX - Offset X with value and unit
 * @param {Object} shadow.offsetY - Offset Y with value and unit
 * @param {Object} shadow.blur - Blur radius with value and unit
 * @param {Object} shadow.spread - Spread radius with value and unit
 * @param {boolean} [shadow.inset] - Whether shadow is inset
 * @returns {string} CSS box-shadow value
 */
function shadowToCSS(shadow) {
  const { color, offsetX, offsetY, blur, spread, inset } = shadow

  const parts = []

  if (inset) {
    parts.push('inset')
  }

  parts.push(`${offsetX.value}${offsetX.unit}`)
  parts.push(`${offsetY.value}${offsetY.unit}`)
  parts.push(`${blur.value}${blur.unit}`)
  parts.push(`${spread.value}${spread.unit}`)
  parts.push(colorToCSS(color))

  return parts.join(' ')
}

/**
 * Transforms W3C shadow token value to CSS box-shadow string
 *
 * @param {TransformedToken} token - Style Dictionary token
 * @returns {string} CSS box-shadow value
 */
export function transformShadow(token) {
  const value = token.$value

  if (Array.isArray(value)) {
    return value.map(shadowToCSS).join(', ')
  }

  return shadowToCSS(value)
}
