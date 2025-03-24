import type { Meta, StoryObj } from '@storybook/react'

import { Button, type ButtonProps } from 'registry/components/button'

import { ArrowLeft, ArrowRight, Link } from 'lucide-react'

type ButtonStory = StoryObj<ButtonProps>

const meta: Meta<ButtonProps> = {
  title: 'components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    children: {
      control: 'text',
      name: 'Label',
      description:
        'Content displayed inside the button. Can be a string, icon, or other React elements.',
      table: {
        category: 'Content',
      },
    },
    variant: {
      control: 'inline-radio',
      name: 'Variant',
      description:
        'Visual style of the button, used to represent different action intents.',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      table: {
        category: 'Appearance',
      },
    },
    size: {
      control: 'inline-radio',
      name: 'Size',
      description:
        'Controls the button’s dimensions and typography based on the selected size.',
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
      description:
        'Disables the button, making it non-interactive and visually dimmed.',
      table: {
        category: 'State',
      },
    },
    iconOnly: {
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

export const Default: ButtonStory = {}

export const WithLeftIcon: ButtonStory = {
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render(args) {
    return (
      <Button {...args}>
        <ArrowLeft />
        Button
      </Button>
    )
  },
}

export const WithRightIcon: ButtonStory = {
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render(args) {
    return (
      <Button {...args}>
        Button
        <ArrowRight />
      </Button>
    )
  },
}

export const WithBothIcon: ButtonStory = {
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render(args) {
    return (
      <Button {...args}>
        <ArrowLeft />
        Button
        <ArrowRight />
      </Button>
    )
  },
}

export const WithIconOnly: ButtonStory = {
  args: {
    iconOnly: true,
    'aria-label': 'Link',
  },
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render(args) {
    return (
      <Button {...args}>
        <Link />
      </Button>
    )
  },
}

export default meta
