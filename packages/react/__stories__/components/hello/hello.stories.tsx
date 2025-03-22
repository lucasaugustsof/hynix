import type { Meta, StoryObj } from '@storybook/react'

import { Hello } from 'registry/components/hello'

export default {
  title: 'components/Hello',
  component: Hello,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    test: {
      type: 'boolean',
    },
    test1: {
      type: 'string',
    },
  },
} satisfies Meta

export const Basic: StoryObj = {}
