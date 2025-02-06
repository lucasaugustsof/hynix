import type { Meta, StoryObj } from '@storybook/react'

import { Badge, type BadgeProps } from '@/registry/components/badge'

const meta: Meta<BadgeProps> = {
  title: 'components/Badge',
  component: Badge,
  args: {
    appearance: 'fill',
    variant: 'informative',
    size: 'md',
    activated: false,
  },
  argTypes: {
    appearance: {
      control: 'inline-radio',
      options: ['fill', 'ghost'],
      table: {
        category: 'appearance',
      },
    },
    variant: {
      control: 'inline-radio',
      options: ['informative', 'warning', 'success', 'danger'],
      table: {
        category: 'appearance',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        category: 'appearance',
      },
    },
    activated: {
      control: 'boolean',
      table: {
        category: 'state',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Fill: StoryObj = {}

export const Ghost: StoryObj = {}
