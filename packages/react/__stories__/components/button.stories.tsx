import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button, type ButtonProps } from '@/registry/components/button'

import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiGithubFill,
} from '@remixicon/react'

const meta: Meta<ButtonProps> = {
  title: 'components/Button',
  component: Button,
  tags: ['version:1.0.0'],
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    disabled: false,
    iconOnly: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the button',
    },
    disabled: {
      description: 'Whether the button is disabled and non-interactive',
    },
    iconOnly: {
      control: false,
      description:
        'Whether the button contains only an icon (requires aria-label)',
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: StoryObj<ButtonProps> = {}

export const WithPrefix: StoryObj<ButtonProps> = {
  render({ ...args }) {
    return (
      <Button {...args}>
        <RiArrowLeftLine />
        {args.children}
      </Button>
    )
  },
}

export const WithSuffix: StoryObj<ButtonProps> = {
  render({ ...args }) {
    return (
      <Button {...args}>
        {args.children}
        <RiArrowRightLine />
      </Button>
    )
  },
}

export const WithPrefixAndSuffix: StoryObj<ButtonProps> = {
  render({ ...args }) {
    return (
      <Button {...args}>
        <RiArrowLeftLine />
        {args.children}
        <RiArrowRightLine />
      </Button>
    )
  },
}

export const IconOnly: StoryObj<ButtonProps> = {
  args: {
    iconOnly: true,
    'aria-label': 'Go to GitHub',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  render({ ...args }) {
    return (
      <Button {...args}>
        <RiGithubFill />
      </Button>
    )
  },
}

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    disabled: true,
    onClick: fn(),
  },
}
