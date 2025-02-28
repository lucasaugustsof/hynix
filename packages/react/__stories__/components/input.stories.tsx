import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Input, type InputProps } from '@/registry/components/input'

type ArgumentType<T> = T & {
  'data-invalid': boolean
}

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  tags: ['version:1.0.0'],
  args: {
    size: 'md',
    placeholder: 'Enter text here',
    disabled: false,
    onChange: action('onChange event was called'),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Sets the input size (small, medium, or large).',
      table: {
        category: 'Appearance',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Text displayed when the input is empty.',
      table: {
        category: 'Content',
        defaultValue: {
          summary: '""',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input, preventing user interaction.',
      table: {
        category: 'State',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the input value changes.',
      table: {
        category: 'Events',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: StoryObj<InputProps> = {
  args: {
    onChange: fn(),
  },
}

export const Disabled: StoryObj<InputProps> = {
  args: {
    onFocus: fn(),
    disabled: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
    onFocus: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
}

export const Invalid: StoryObj<ArgumentType<InputProps>> = {
  args: {
    'data-invalid': true,
    disabled: false,
  },
  argTypes: {
    'data-invalid': {
      control: false,
      table: {
        disable: true,
      },
    },
    disabled: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
}
