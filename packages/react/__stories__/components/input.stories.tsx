import type { Meta, StoryObj } from '@storybook/react'

import { Input, type InputProps } from '@r/components/input'

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  args: {
    size: 'md',
    placeholder: 'Type something...',
    disabled: false,
    prefix: '',
    prefixStyling: false,
    suffix: '',
    suffixStyling: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the input field.',
      table: {
        category: 'Visual',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the input is empty.',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field, preventing user interaction.',
      table: {
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description:
        'Marks the input as invalid, applying visual and semantic error styles.',
      table: {
        category: 'State',
      },
    },
    prefix: {
      control: 'text',
      description: 'Optional content displayed before the input field.',
      table: {
        category: 'Addons',
      },
    },
    prefixStyling: {
      control: 'boolean',
      description: 'Applies visual styling to the prefix addon.',
      table: {
        category: 'Addons',
      },
    },
    suffix: {
      control: 'text',
      description: 'Optional content displayed after the input field.',
      table: {
        category: 'Addons',
      },
    },
    suffixStyling: {
      control: 'boolean',
      description: 'Applies visual styling to the suffix addon.',
      table: {
        category: 'Addons',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default: StoryObj<InputProps> = {
  name: 'Default',
}
