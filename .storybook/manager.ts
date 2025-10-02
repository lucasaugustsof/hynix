import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

// @ts-expect-error
import logoSvg from './storybook-logo.svg'

addons.setConfig({
  theme: create({
    base: 'light',
    brandImage: logoSvg,
  }),
})
