import '@/styles/globals.css'

import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
  parameters: {
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
}

export default preview
