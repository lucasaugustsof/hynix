import type { Meta, StoryObj } from '@storybook/react'

import { Hello } from './hello'

export default {
  title: 'components/Hello',
  component: Hello,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export const Basic: StoryObj = {}
