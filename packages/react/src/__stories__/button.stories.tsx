import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine, RiDeleteBinLine } from '@remixicon/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, type ButtonProps } from '@/components/button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'danger'],
      description: 'Visual style variant of the button',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'select',
      options: ['2xs', 'xs', 'sm', 'md'],
      description: 'Size of the button affecting height and padding',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    iconOnly: {
      control: false,
      description:
        'Makes the button square with equal width and height, ideal for icon-only buttons',
      table: {
        category: 'Appearance',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and applies disabled styling',
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
    children: {
      control: 'text',
      description: 'Button content (text, icons, or any React node)',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        category: 'Events',
        type: {
          summary: '(event: MouseEvent) => void',
        },
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    iconOnly: false,
  },
} satisfies Meta<ButtonProps>

export const Default: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: StoryObj<ButtonProps> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button variant="primary">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button variant="secondary">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button variant="outline">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button variant="danger">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllSizes: StoryObj<ButtonProps> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button size="2xs">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button size="xs">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button size="sm">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
      <Button size="md">
        <RiArrowLeftSLine />
        Button
        <RiArrowRightSLine />
      </Button>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const IconOnly: StoryObj<ButtonProps> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button iconOnly variant="primary">
        <RiAddLine />
      </Button>
      <Button iconOnly variant="secondary">
        <RiAddLine />
      </Button>
      <Button iconOnly variant="outline">
        <RiAddLine />
      </Button>
      <Button iconOnly variant="danger">
        <RiDeleteBinLine />
      </Button>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
