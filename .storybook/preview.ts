import '@hynix/react/styles.css'

import type { Preview, Decorator } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: {
      Light: 'light',
      Dark: 'dark',
    },
    defaultTheme: 'Light',
  }),
]

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
    },
    backgrounds: {
      disable: true,
    },
  },
}

export default preview
