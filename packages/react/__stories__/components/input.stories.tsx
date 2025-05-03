import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { RiEyeLine, RiSearchLine } from '@remixicon/react'

import { Input, type InputProps } from '@r/components/input'

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  args: {
    size: 'md',
    placeholder: 'Type something...',
    disabled: false,
    prefix: '',
    suffix: '',
    prefixStyling: false,
    suffixStyling: false,
    invalid: false,
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Adjusts the input size.',
      table: {
        category: 'Visual',
      },
    },
    placeholder: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
    prefix: {
      control: false,
      table: {
        category: 'Complement',
      },
    },
    suffix: {
      control: false,
      table: {
        category: 'Complement',
      },
    },
    prefixStyling: {
      table: {
        category: 'Complement',
      },
    },
    suffixStyling: {
      table: {
        category: 'Complement',
      },
    },
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type InputStory = StoryObj<InputProps>

export const Basic: InputStory = {}

export const WithPrefix: InputStory = {
  name: 'With Prefix Icon',
  render: args => (
    <Input {...args} prefix={<RiSearchLine />} placeholder="Search..." />
  ),
}

export const WithSuffix: InputStory = {
  name: 'With Suffix Icon',
  render: args => (
    <Input {...args} suffix={<RiEyeLine />} placeholder="Enter password" />
  ),
}
