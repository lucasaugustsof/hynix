import type { Meta, StoryObj } from '@storybook/react'

import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
  type CheckboxProps,
} from '@r/components/checkbox'
import { Label } from '@r/components/label'

const meta: Meta<CheckboxProps> = {
  title: 'Components/Checkbox',
  component(args) {
    return (
      <Checkbox {...args}>
        <CheckboxControl />

        <CheckboxLabel asChild>
          <Label>Label</Label>
        </CheckboxLabel>
      </Checkbox>
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
      description: 'Disables the checkbox and makes it non-interactive.',
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

type CheckboxStory = StoryObj<CheckboxProps>

export const Default: CheckboxStory = {}

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
