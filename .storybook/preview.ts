import '@/styles/globals.css'

import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'

import { withReactScan } from './decorators/with-react-scan'
import { withStrictMode } from './decorators/with-strict-mode'

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
    withThemeByDataAttribute({
      themes: {
        Light: 'light',
        Dark: 'dark',
      },
      attributeName: 'data-theme',
      defaultTheme: 'Light',
    }),
    withReactScan,
    withStrictMode,
  ],
}

export default preview
