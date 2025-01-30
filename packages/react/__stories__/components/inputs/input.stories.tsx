import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Input, type InputProps } from '@/registry/components/input'
import { InputGroup } from '@/registry/components/input-group'

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

type ArgumentType<T> = T & {
  'data-invalid': boolean
}

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  args: {
    size: 'md',
    placeholder: 'E-mail',
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

export const Basic: StoryObj = {}

export const WithPrefix: StoryObj<InputProps> = {
  render({ placeholder, ...args }) {
    return (
      <InputGroup {...args} prefixElement={<RiArrowLeftLine />}>
        <Input placeholder={placeholder} />
      </InputGroup>
    )
  },
}

export const WithSuffix: StoryObj<InputProps> = {
  render({ placeholder, ...args }) {
    return (
      <InputGroup {...args} suffixElement={<RiArrowRightLine />}>
        <Input placeholder={placeholder} />
      </InputGroup>
    )
  },
}

export const Disabled: StoryObj<InputProps> = {
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
  },
}

export const Warning: StoryObj<ArgumentType<InputProps>> = {
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
