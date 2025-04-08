import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Badge, type BadgeProps } from 'registry/components/badge'

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
      description: 'Defines the color scheme of the badge.',
      control: 'inline-radio',
      options: ['default', 'warning', 'success', 'danger'],
      table: {
        category: 'Appearance',
      },
    },
    active: {
      name: 'Active',
      description:
        'Sets the badge to an active state, which changes its appearance.',
      control: 'boolean',
      table: {
        category: 'State',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export default meta

export const Default: BadgeStory = {}

export const Interactive: BadgeStory = {
  argTypes: {
    active: {
      name: 'Active',
      control: false,
    },
  },
  render(args) {
    const [active, setActive] = useState(false)

    function toggleActive() {
      setActive(!active)
    }

    return (
      <Badge {...args} active={active} onClick={toggleActive} asChild>
        <button type="button">{args.children}</button>
      </Badge>
    )
  },
}

export const WithIconOnly: BadgeStory = {
  render() {
    return (
      <Badge>
        Read More
        <RiArrowRightUpLine />
      </Badge>
    )
  },
}
