import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox, type CheckboxProps } from '@r/components/checkbox'

type CheckboxStory = StoryObj<CheckboxProps>

const meta: Meta<CheckboxProps> = {
  title: 'components/Checkbox',
  component(args) {
    return (
      <Checkbox.Root {...args}>
        <Checkbox.Control />
      </Checkbox.Root>
    )
  },
  args: {
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Controls the size of the checkbox icon and spacing.',
      options: ['sm', 'md', 'lg'],
      control: 'inline-radio',
      table: {
        category: 'Visual',
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the checkbox, making it non-interactive.',
      control: 'boolean',
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

export const Basic: CheckboxStory = {}

export const Indeterminate: CheckboxStory = {
  args: {
    checked: 'indeterminate',
  },
  argTypes: {
    checked: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
}

export const WithLabelRight: CheckboxStory = {
  render(args) {
    return (
      <Checkbox.Root {...args}>
        <Checkbox.Control />
        <Checkbox.Label>Label</Checkbox.Label>
      </Checkbox.Root>
    )
  },
}

export const WithLabelLeft: CheckboxStory = {
  render(args) {
    return (
      <Checkbox.Root {...args}>
        <Checkbox.Label>Label</Checkbox.Label>
        <Checkbox.Control />
      </Checkbox.Root>
    )
  },
}
