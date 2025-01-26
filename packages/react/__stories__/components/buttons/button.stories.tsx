import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { Button, type ButtonProps } from '@/registry/components/buttons/button'

import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiGithubFill,
} from '@remixicon/react'

const meta: Meta<ButtonProps> = {
  title: 'components/Buttons/Button',
  component: Button,
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
    asChild: {
      control: false,
      description:
        'Whether to merge props onto a child element instead of creating a new button element',
    },
  },
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByRole('button')

    await userEvent.click(sut)
    await userEvent.click(canvasElement)

    await expect(args.onClick).toHaveBeenCalled()
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

export const LinkBehavior: StoryObj<ButtonProps> = {
  tags: ['skip-test'],
  args: {
    iconOnly: true,
    'aria-label': 'Go to GitHub',
    asChild: true,
  },
  argTypes: {
    children: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
  render({ ...args }) {
    return (
      <Button {...args} data-testid="github-link">
        <a href="https://github.com/lucasaugustsof/hynix">
          <RiGithubFill />
        </a>
      </Button>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByTestId('github-link')

    await expect(sut.tagName.toLocaleLowerCase()).toEqual('a')
  },
}

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    disabled: true,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByRole('button')

    await userEvent.click(sut)
    await userEvent.click(canvasElement)

    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
