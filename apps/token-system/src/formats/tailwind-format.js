/**
 * @fileoverview TailwindCSS formatter for Style Dictionary
 *
 * This module provides a custom formatter that converts Style Dictionary design tokens
 * into TailwindCSS-compatible CSS output. It handles theme-based color tokens and generates:
 * - CSS custom properties grouped by theme selectors
 * - TailwindCSS theme configuration with color variable references
 * - Support for multiple themes (light, dark, etc.) using data-theme attributes
 *
 * @module formats/tailwind-format
 */

import { format } from 'prettier'

/**
 * @typedef {import('style-dictionary/types').FormatFnArguments} FormatFnArguments
 * @typedef {import('style-dictionary/types').TransformedToken[]} TransformedTokenArray
 */

/**
 * @typedef {Object} FormattedColorOutput
 * @property {string} outVarsColors - CSS custom properties grouped by theme selectors (e.g., ":root { ... }", "[data-theme="dark"] { ... }")
 * @property {string} outThemeColors - TailwindCSS theme configuration with color variable references (e.g., "--color-red-500: var(--red-500);")
 */

class TailwindFormat {
  #rootVars = new Map()

  /**
   *
   * @param {FormatFnArguments} args - Arguments provided by the `Style Dicionary` formatter function
   * @returns string
   */
  async run({ dictionary }) {
    const { allTokens } = dictionary

    this.#rootVars.clear()

    const { outThemeColors } = this.#getVariableColors(allTokens)
    const { outThemeShadows } = this.#getVariableShadows(allTokens)

    const rootBlocks = this.#buildRootBlocks()

    const outContent = await format(
      `@import "tailwindcss";\n

      @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));\n

      @theme {
        --color-*: initial;
        ${outThemeColors}
        --shadow-*: initial;
        ${outThemeShadows}
      }

      ${rootBlocks}
    `,
      {
        parser: 'css',
        plugins: [import('prettier-plugin-tailwindcss')],
      },
    )

    return outContent
  }

  /**
   * Adds a CSS variable to the rootVars map
   *
   * @param {string} selector - CSS selector (':root', '[data-theme="dark"]', etc.)
   * @param {string} name - Variable name without '--' prefix
   * @param {string} value - Variable value
   */
  #addRootVar(selector, name, value) {
    if (!this.#rootVars.has(selector)) {
      this.#rootVars.set(selector, [])
    }

    this.#rootVars.get(selector).push(`--${name}: ${value};`)
  }

  /**
   * Builds CSS blocks from accumulated root variables
   *
   * @returns {string} CSS blocks with all selectors and their variables
   */
  #buildRootBlocks() {
    let output = ''

    for (const [selector, vars] of this.#rootVars.entries()) {
      output += `${selector} {\n${vars.join('\n')}\n}\n\n`
    }

    return output
  }

  /**
   * Processes color tokens and generates formatted CSS output for TailwindCSS
   *
   * @param {TransformedTokenArray} allTokens - Array of transformed design tokens from Style Dictionary
   * @returns {Object} Object containing theme configuration
   */
  #getVariableColors(allTokens) {
    const mapThemes = new Map()

    for (const token of allTokens) {
      if (typeof token.$value === 'object') {
        for (const theme in token.$value) {
          const tokenName = token.path.join('-')

          if (!mapThemes.has(theme)) {
            mapThemes.set(theme, [
              {
                ...token,
                name: tokenName,
              },
            ])
            continue
          }

          const previousTokens = mapThemes.get(theme) ?? []

          mapThemes.set(theme, [
            ...previousTokens,
            {
              ...token,
              name: tokenName,
            },
          ])
        }
      }
    }

    for (const [theme, tokens] of mapThemes.entries()) {
      const selector = theme === '_' ? ':root' : `[data-theme="${theme}"]`

      for (const token of tokens) {
        this.#addRootVar(selector, token.name, token.$value[theme])
      }
    }

    let outThemeColors = ''

    if (mapThemes.has('_')) {
      outThemeColors = mapThemes
        .get('_')
        .map(token => `--color-${token.name}: var(--${token.name});`)
        .join('\n')
    }

    return {
      outThemeColors,
    }
  }

  /**
   * Processes shadow tokens and generates formatted CSS output for TailwindCSS v4
   *
   * @param {TransformedTokenArray} allTokens - Array of transformed design tokens from Style Dictionary
   * @returns {Object} Object containing theme configuration
   */
  #getVariableShadows(allTokens) {
    const shadowTokens = allTokens.filter(token => token.$type === 'shadow')

    if (shadowTokens.length === 0) {
      return {
        outThemeShadows: '',
      }
    }

    let outThemeShadows = ''

    for (const token of shadowTokens) {
      const tokenName = token.path.join('-')

      this.#addRootVar(':root', tokenName, token.$value)

      outThemeShadows += `--shadow-${tokenName}: var(--${tokenName});\n`
    }

    return {
      outThemeShadows,
    }
  }
}

export const tailwindFormat = new TailwindFormat()
