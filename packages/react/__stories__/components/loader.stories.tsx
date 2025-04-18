import type { Meta, StoryObj } from '@storybook/react'

import { Loader, type LoaderProps } from 'registry/components/loader'

type LoaderStory = StoryObj<LoaderProps>

const meta: Meta<LoaderProps> = {
  title: 'components/Loader',
  component: Loader,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      description: 'Controls the size of the loader.',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export const Default: LoaderStory = {}

export default meta
