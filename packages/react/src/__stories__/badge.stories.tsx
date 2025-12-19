import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiFlashlightFill, RiStarFill } from '@remixicon/react'
import { Badge, type BadgeRootProps } from '@/components/badge'

export default {
  title: 'Components/Data Display/Badge',
  component: Badge.Root,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Visual style variant of the badge',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'filled',
        },
      },
    },
    color: {
      control: 'select',
      options: [
        'gray',
        'blue',
        'orange',
        'red',
        'green',
        'yellow',
        'purple',
        'sky',
        'pink',
        'teal',
      ],
      description: 'Color scheme of the badge',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'gray',
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the badge affecting height and spacing',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'sm',
        },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content (text, icons, or any React node)',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the badge, reducing opacity',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    children: 'Badge',
    variant: 'filled',
    color: 'blue',
    size: 'sm',
    disabled: false,
  },
} satisfies Meta<BadgeRootProps>

type BadgeStory = StoryObj<BadgeRootProps>

export const Default: BadgeStory = {
  args: {
    children: 'Badge',
  },
}

export const AllVariants: BadgeStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge.Root color="blue" variant="filled">
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="light">
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="lighter">
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="stroke">
        Badge
      </Badge.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllColors: BadgeStory = {
  render: () => {
    const colors = [
      'gray',
      'blue',
      'orange',
      'red',
      'green',
      'yellow',
      'purple',
      'sky',
      'pink',
      'teal',
    ] as const

    return (
      <div className="flex flex-col gap-y-4">
        {colors.map(color => (
          <div key={color} className="flex items-center gap-x-3">
            <span className="w-16 text-fg-1 text-xs capitalize">{color}</span>
            <Badge.Root color={color} variant="filled">
              Badge
            </Badge.Root>
            <Badge.Root color={color} variant="light">
              Badge
            </Badge.Root>
            <Badge.Root color={color} variant="lighter">
              Badge
            </Badge.Root>
            <Badge.Root color={color} variant="stroke">
              Badge
            </Badge.Root>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllSizes: BadgeStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge.Root color="blue" variant="light" size="sm">
        Small
      </Badge.Root>
      <Badge.Root color="blue" variant="light" size="md">
        Medium
      </Badge.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithIcon: BadgeStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge.Root color="orange" variant="filled">
        <Badge.Icon asChild>
          <RiFlashlightFill />
        </Badge.Icon>
        Badge
      </Badge.Root>
      <Badge.Root color="orange" variant="light">
        <Badge.Icon asChild>
          <RiStarFill />
        </Badge.Icon>
        Badge
      </Badge.Root>
      <Badge.Root color="orange" variant="lighter">
        Badge
        <Badge.Icon asChild>
          <RiFlashlightFill />
        </Badge.Icon>
      </Badge.Root>
      <Badge.Root color="orange" variant="stroke">
        <Badge.Icon asChild>
          <RiStarFill />
        </Badge.Icon>
        Badge
        <Badge.Icon asChild>
          <RiFlashlightFill />
        </Badge.Icon>
      </Badge.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithDot: BadgeStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge.Root color="blue" variant="filled">
        <Badge.Dot />
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="light">
        <Badge.Dot />
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="lighter">
        <Badge.Dot />
        Badge
      </Badge.Root>
      <Badge.Root color="blue" variant="stroke">
        <Badge.Dot />
        Badge
      </Badge.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const NumberOnly: BadgeStory = {
  render: () => {
    const colors = [
      'gray',
      'blue',
      'orange',
      'red',
      'green',
      'yellow',
      'purple',
      'sky',
      'pink',
      'teal',
    ] as const

    return (
      <div className="flex flex-col gap-y-4">
        {colors.map(color => (
          <div key={color} className="flex items-center gap-x-3">
            <span className="w-16 text-fg-1 text-xs capitalize">{color}</span>
            <Badge.Root color={color} variant="filled">
              {1}
            </Badge.Root>
            <Badge.Root color={color} variant="light">
              {5}
            </Badge.Root>
            <Badge.Root color={color} variant="lighter">
              {12}
            </Badge.Root>
            <Badge.Root color={color} variant="stroke">
              {99}
            </Badge.Root>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}
