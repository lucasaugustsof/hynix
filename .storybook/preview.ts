import '@/styles/globals.css'

import { withThemeByDataAttribute } from '@storybook/addon-themes'
import type { Preview } from '@storybook/react-vite'

import { withReactScan } from './decorators/with-react-scan'

const preview: Preview = {
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: 'light',
        Dark: 'dark',
      },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
    withReactScan,
  ],
}

export default preview
