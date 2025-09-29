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
  /**
   *
   * @param {FormatFnArguments} args - Arguments provided by the `Style Dicionary` formatter function
   * @returns string
   */
  async run({ dictionary }) {
    const { allTokens } = dictionary

    const { outVarsColors, outThemeColors } = this.#getVariableColors(allTokens)

    const outContent = await format(
      `@import "tailwindcss";\n

      @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));\n

      @theme {
        --color-*: initial;
        ${outThemeColors}
      }

      ${outVarsColors}
    `,
      {
        parser: 'css',
        plugins: [import('prettier-plugin-tailwindcss')],
      },
    )

    return outContent
  }

  /**
   * Processes color tokens and generates formatted CSS output for TailwindCSS
   *
   * @param {TransformedTokenArray} allTokens - Array of transformed design tokens from Style Dictionary
   * @returns {FormattedColorOutput} Object containing CSS variables and theme configuration
   */
  #getVariableColors(allTokens) {
    const mapThemes = new Map()

    for (const token of allTokens) {
      if (typeof token.$value === 'object') {
        for (const theme in token.$value) {
          if (!mapThemes.has(theme)) {
            mapThemes.set(theme, [token])
            continue
          }

          const previousTokens = mapThemes.get(theme) ?? []
          mapThemes.set(theme, [...previousTokens, token])
        }
      }
    }

    let outVarsColors = ''
    let outThemeColors = ''

    for (const [theme, tokens] of mapThemes.entries()) {
      const renamedTheme = theme === '_' ? ':root' : `[data-theme="${theme}"]`

      const themeTokens = tokens
        .map(token => {
          return `--${token.name}: ${token.$value[theme]};`
        })
        .join('\n')

      outVarsColors += `
        ${renamedTheme} {
          ${themeTokens}
        }
      `
    }

    outThemeColors = mapThemes
      .get('_')
      .map(token => {
        return `--color-${token.name}: var(--${token.name});`
      })
      .join('\n')

    return {
      outVarsColors,
      outThemeColors,
    }
  }
}

export const tailwindFormat = new TailwindFormat()
