import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button, type ButtonProps } from '../components/button'

import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowUpLine,
  RiGoogleFill,
} from '@remixicon/react'

export default {
  title: 'components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    appearance: 'primary',
    size: 'md',
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: {
      name: 'label',
    },
    appearance: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Determines the visual appearance of the button.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Sets the size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button, making it non-interactive.',
    },
    asChild: {
      control: false,
      description: 'Allows the button to be used as a child component.',
    },
  },
} satisfies Meta<ButtonProps>

export const Basic: StoryObj<ButtonProps> = {}

export const WithLeftIcon: StoryObj<ButtonProps> = {
  render({ children, ...args }) {
    return (
      <Button {...args}>
        <RiArrowLeftLine />
        {children}
      </Button>
    )
  },
}

export const WithRightIcon: StoryObj<ButtonProps> = {
  render({ children, ...args }) {
    return (
      <Button {...args}>
        {children}
        <RiArrowRightLine />
      </Button>
    )
  },
}

export const WithIconOnly: StoryObj<ButtonProps> = {
  args: {
    iconOnly: true,
  },
  render({ children, ...args }) {
    return (
      <Button {...args}>
        <RiArrowUpLine />
      </Button>
    )
  },
}

export const LoginSocial: StoryObj<ButtonProps> = {
  argTypes: {
    children: {
      name: 'label',
      control: false,
    },
    appearance: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
  render({ children, ...args }) {
    return (
      <Button {...args} appearance="secondary">
        <RiGoogleFill />
        Sign in with Google
      </Button>
    )
  },
}
