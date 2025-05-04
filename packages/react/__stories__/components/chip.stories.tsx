import type { Meta, StoryObj } from '@storybook/react'

import { Avatar, getInitialLetters } from '@r/components/avatar'
import { Chip, type ChipProps } from '@r/components/chip'

const meta: Meta<ChipProps> = {
  title: 'components/Chip',
  component(args) {
    return (
      <Chip.Root {...args}>
        <Chip.Label>{args.children}</Chip.Label>
        <Chip.Close />
      </Chip.Root>
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
      description: 'Content inside the chip.',
      table: {
        category: 'Content',
      },
    },
    size: {
      name: 'Size',
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Controls the chip padding and font size.',
      table: {
        category: 'Visual',
      },
    },
    active: {
      name: 'Active',
      control: 'boolean',
      description: 'Toggles the active/selected state of the chip.',
      table: {
        category: 'State',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type ChipStory = StoryObj<ChipProps>

export const Basic: ChipStory = {}

export const WithCloseLeft: ChipStory = {
  name: 'Close on Left',
  render(args) {
    return (
      <Chip.Root {...args}>
        <Chip.Close />
        <Chip.Label>{args.children}</Chip.Label>
      </Chip.Root>
    )
  },
}

export const Active: ChipStory = {
  name: 'Active State',
  args: {
    active: true,
  },
  argTypes: {
    active: {
      control: false,
    },
  },
}

export const WithoutClose: ChipStory = {
  render(args) {
    return (
      <Chip.Root {...args}>
        <Chip.Label>{args.children}</Chip.Label>
      </Chip.Root>
    )
  },
}

export const WithAvatar: ChipStory = {
  args: {
    size: 'md',
    children: 'John Doe',
  },
  argTypes: {
    size: {
      control: false,
    },
    active: {
      control: false,
    },
  },
  render(args) {
    return (
      <Chip.Root {...args} className="pr-3 pl-0.5">
        <Avatar
          size="md"
          src="https://i.pravatar.cc/300"
          altText={getInitialLetters('John Doe')}
        />

        <Chip.Label>{args.children}</Chip.Label>
        <Chip.Close />
      </Chip.Root>
    )
  },
}
