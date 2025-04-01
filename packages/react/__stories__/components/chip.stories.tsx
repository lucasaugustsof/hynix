import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import {
  Chip,
  ChipClose,
  ChipLabel,
  type ChipProps,
} from 'registry/components/chip'

type ChipStory = StoryObj<ChipProps>

const meta: Meta<ChipProps> = {
  title: 'components/Chip',
  component(args) {
    return (
      <Chip {...args}>
        <ChipLabel>{args.children}</ChipLabel>
        <ChipClose onClick={() => fn()} />
      </Chip>
    )
  },
  args: {
    children: 'Label',
    activated: false,
    size: 'md',
  },
  argTypes: {
    // Content
    children: {
      name: 'Label',
      control: 'text',
      description:
        'Content of the chip including ChipLabel and ChipClose components.',
      table: {
        category: 'Content',
      },
    },

    size: {
      name: 'Size',
      description: 'Defines the size of the chip.',
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
      },
    },

    activated: {
      name: 'Activated',
      description: 'Controls whether the chip is in activated state.',
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['new'],
}

export default meta

export const Default: ChipStory = {}

export const WithCloseLeft: ChipStory = {
  render(args) {
    return (
      <Chip {...args}>
        <ChipClose onClick={() => fn()} />
        <ChipLabel>{args.children}</ChipLabel>
      </Chip>
    )
  },
}
