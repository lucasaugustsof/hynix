import { create } from '@storybook/theming/create'

// @ts-ignore
import brandImage from './storybook-logo.svg'

export const storybookTheme = {
  colors: {
    background: {
      default: '#FFFFFF',
      secondary: '#FCFCFC',
    },
    surface: {
      default: '#F4F4F5',
    },
    border: {
      default: '#E1E1E2',
    },
    text: {
      primary: '#1C1917',
      inverse: '#FFFFFF',
    },
    brand: {
      main: '#1A1A1A',
      highlight: '#3479E9',
    },
  },
  radii: {
    xlarge: 8,
  },
  fonts: {
    display: '"Geist", serif',
    code: '"Geist Mono", monospace',
  },
}

export default create({
  base: 'light',
  // Typography
  fontBase: storybookTheme.fonts.display,
  fontCode: storybookTheme.fonts.code,

  brandImage,
  brandTitle: 'Hynix',
  brandUrl: 'https://storybook.hynix.cc',
  brandTarget: '_self',

  // Colors
  colorSecondary: storybookTheme.colors.brand.main,

  // UI
  appBg: storybookTheme.colors.background.secondary,
  appContentBg: storybookTheme.colors.background.default,
  appPreviewBg: storybookTheme.colors.background.default,
  appBorderColor: storybookTheme.colors.border.default,
  appBorderRadius: storybookTheme.radii.xlarge,

  // Text colors
  textColor: storybookTheme.colors.text.primary,
  textInverseColor: storybookTheme.colors.text.inverse,

  // Toolbar default and active colors
  barTextColor: storybookTheme.colors.text.primary,
  barSelectedColor: storybookTheme.colors.brand.main,
  barHoverColor: storybookTheme.colors.brand.main,
  barBg: storybookTheme.colors.background.secondary,

  // Form colors
  inputBg: storybookTheme.colors.background.secondary,
  inputBorder: storybookTheme.colors.border.default,
  inputTextColor: storybookTheme.colors.text.primary,
  inputBorderRadius: storybookTheme.radii.xlarge,
  buttonBg: storybookTheme.colors.background.secondary,
  buttonBorder: storybookTheme.colors.border.default,
  booleanBg: storybookTheme.colors.background.secondary,
  booleanSelectedBg: storybookTheme.colors.background.default,
})
