import '@hynix/react/styles.css'

import type { Preview } from '@storybook/react'

import { create } from '@storybook/theming/create'
import { storybookTheme } from './storybook-theme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'On This Page',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      theme: create({
        base: 'light',

        // Typography
        fontBase: storybookTheme.fonts.display,
        fontCode: storybookTheme.fonts.code,
        textColor: storybookTheme.colors.text.primary,

        // UI
        colorSecondary: storybookTheme.colors.brand.highlight,
      }),
    },
  },
}

export default preview
