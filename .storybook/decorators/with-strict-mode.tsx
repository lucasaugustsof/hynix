import type { Decorator } from '@storybook/react-vite'
import * as React from 'react'

export const withStrictMode: Decorator = (Story, context) => (
  <React.StrictMode>
    <Story {...context} />
  </React.StrictMode>
)
