import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox, type CheckboxProps } from '@/registry/components/checkbox'

const meta: Meta<CheckboxProps> = {
  title: 'components/Checkbox',
  component: Checkbox,
  args: {
    size: 'md',
    labelText: 'Label',
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    labelText: {
      control: 'text',
      description: 'Defines the text displayed next to the checkbox.',
      table: {
        category: 'Content',
      },
    },
    labelPlacement: {
      control: 'inline-radio',
      options: ['ltr', 'rtl'],
      description:
        'Determines the position of the label relative to the checkbox. `ltr` places it on the right, and `rtl` places it on the left.',
      table: {
        category: 'Content',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description:
        'Specifies the size of the checkbox. Available options: `sm`, `md`, `lg`, and `xl`.',
      table: {
        category: 'Appearance',
      },
    },
    indeterminate: {
      control: 'boolean',
      description:
        'Indicates an indeterminate state, typically used when a checkbox is part of a group with mixed selections.',
      table: {
        category: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables user interaction with the checkbox, making it unclickable.',
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

// The default Checkbox component with a label on the right side. Users can toggle between checked and unchecked states.
export const Basic: StoryObj<CheckboxProps> = {}

// A Checkbox without a visible label. Useful in cases where the label is provided via a tooltip or external text context.
export const WithoutLabel: StoryObj<CheckboxProps> = {
  args: {
    labelText: '',
    labelPlacement: 'rtl',
  },
  argTypes: {
    labelText: {
      control: false,
      table: {
        disable: true,
      },
    },
    labelPlacement: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
}
