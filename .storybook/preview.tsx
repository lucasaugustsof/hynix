import '@repo/ui/styles.css'

import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'

import { Analytics } from '@vercel/analytics/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    Story => {
      return (
        <>
          <Story />
          <Analytics />
        </>
      )
    },
  ],
}

export default preview
