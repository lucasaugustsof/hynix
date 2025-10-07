import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'

export default {
  title: 'components/Hello',
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta

export const Basic: StoryObj = {}
