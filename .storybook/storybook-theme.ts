import { create } from 'storybook/theming/create'

// @ts-ignore
import brandImage from './storybook-logo.svg'

export default create({
  base: 'dark',

  brandImage,
  brandTitle: 'Hynix',
  brandUrl: 'https://storybook.hynix.cc',
  brandTarget: '_self',
})
