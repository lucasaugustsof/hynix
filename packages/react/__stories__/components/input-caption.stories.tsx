import type { Meta, StoryObj } from '@storybook/react'

import {
  InputCaption,
  type InputCaptionProps,
} from '@/registry/components/input-caption'

const meta: Meta<InputCaptionProps> = {
  title: 'components/InputCaption',
  component: InputCaption,
  args: {
    type: 'default',
    children: 'Caption',
    size: 'sm',
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

export const Basic: StoryObj<InputCaptionProps> = {}

export const Success: StoryObj<InputCaptionProps> = {
  args: {
    type: 'success',
    children: 'Success',
  },
}

export const Warning: StoryObj<InputCaptionProps> = {
  name: 'Error',
  args: {
    type: 'error',
    children: 'Error',
  },
}

export const Info: StoryObj<InputCaptionProps> = {
  args: {
    type: 'info',
    children: 'Info',
  },
}

export const Requirements: StoryObj<InputCaptionProps> = {
  args: {
    type: 'requirements',
    children: 'At least 8 character',
  },
}

export const Password: StoryObj<InputCaptionProps> = {
  args: {
    type: 'password',
    securityLevel: 0,
    stepMessages: ['Bad', 'Good', 'Excellent'],
  },
  argTypes: {
    securityLevel: {
      control: {
        type: 'number',
        max: 4,
        min: 0,
      },
    },
    stepMessages: {
      control: false,
    },
  },
}
