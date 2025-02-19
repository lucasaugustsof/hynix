import { create } from '@storybook/theming/create'

// @ts-ignore
import brandImage from './storybook-logo.svg'

export default create({
  base: 'light',

  fontBase: `'Inter', serif`,
  fontCode: 'monospace',

  brandImage,
  brandTitle: 'Hynix',
  brandUrl: 'https://storybook.hynix.cc',
  brandTarget: '_self',
})
