import { useState } from 'react'

import { Badge, type BadgeProps } from '@r/components/badge'
import type { Meta, StoryObj } from '@storybook/react'

import { RiArrowRightUpLine } from '@remixicon/react'

type BadgeStory = StoryObj<BadgeProps>

const meta: Meta<BadgeProps> = {
  title: 'components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'default',
    active: false,
  },
  argTypes: {
    children: {
      name: 'Label',
      description: 'The content displayed inside the badge.',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    variant: {
      name: 'Variant',
      description: 'Defines the visual style of the badge.',
      control: 'inline-radio',
      options: ['default', 'warning', 'success', 'danger'],
      table: {
        category: 'Visual',
      },
    },
    active: {
      name: 'Active',
      description: 'Indicates whether the badge is in an active state.',
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: BadgeStory = {
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the `Badge` component with default props.',
      },
    },
  },
}

export const Clickable: BadgeStory = {
  argTypes: {
    active: {
      control: false,
    },
  },
  render(args) {
    const [active, setActive] = useState(false)
    const toggleActive = () => setActive(!active)

    return (
      <Badge {...args} active={active} onClick={toggleActive} asChild>
        <button type="button">{args.children}</button>
      </Badge>
    )
  },
}

export const WithIcon: BadgeStory = {
  render(args) {
    return (
      <Badge {...args}>
        Read More
        <RiArrowRightUpLine />
      </Badge>
    )
  },
}
