import type { Meta, StoryObj } from '@storybook/react'

import { Input, type InputProps } from '@/registry/components/inputs/input'

const meta: Meta<InputProps> = {
  title: 'components/Inputs/Input',
  component: Input,
  args: {
    placeholder: 'E-mail',
    disabled: true,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: StoryObj = {}
