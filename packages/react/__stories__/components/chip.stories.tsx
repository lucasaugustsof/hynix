import type { Meta, StoryObj } from '@storybook/react'

import { Chip, ChipClose, ChipLabel, type ChipProps } from '@r/components/chip'

type ChipStory = StoryObj<ChipProps>

const meta: Meta<ChipProps> = {
  title: 'components/Chip',
  component(args) {
    return (
      <Chip {...args}>
        <ChipLabel>{args.children}</ChipLabel>
        <ChipClose />
      </Chip>
    )
  },
  args: {
    children: 'Label',
    active: false,
    size: 'md',
  },
  argTypes: {
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
    active: {
      name: 'Active',
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
  tags: [],
}

export default meta

export const Default: ChipStory = {}

export const WithCloseLeft: ChipStory = {
  render(args) {
    return (
      <Chip {...args}>
        <ChipClose />
        <ChipLabel>{args.children}</ChipLabel>
      </Chip>
    )
  },
}
