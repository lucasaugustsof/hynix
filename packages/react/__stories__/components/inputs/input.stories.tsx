import type { Meta, StoryObj } from '@storybook/react'

import { Input, type InputProps } from '@/registry/components/inputs/input'

// import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

const meta: Meta<InputProps> = {
  title: 'components/Inputs/Input',
  component: Input,
  args: {
    placeholder: 'E-mail',
    disabled: false,
    prefixElement: 'https://',
    suffixElement: '.com',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['subtle', 'flushed', 'combo-box'],
    },
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
