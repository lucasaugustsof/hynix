import type { Meta } from '@storybook/react'

import { Hello } from '@/registry/components/hello'

export default {
  title: 'hello',
  component: Hello,
  parameters: {
    layout: 'centered',
  },
} as Meta

export const Data = {}
