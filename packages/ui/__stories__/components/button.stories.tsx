import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'

export default {
  title: 'components/Button',
  component: Button,
} satisfies Meta

export const Basic: StoryObj = {
  args: {
    children: 'Button',
  },
}
