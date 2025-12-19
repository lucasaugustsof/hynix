import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine, RiDeleteBinLine } from '@remixicon/react'
import { Button, type ButtonRootProps } from '@/components/button'

export default {
  title: 'Components/Buttons/Button',
  component: Button.Root,
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
} satisfies Meta<ButtonRootProps>

type ButtonStory = StoryObj<ButtonRootProps>

export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: ButtonStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button.Root variant="primary">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root variant="secondary">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root variant="outline">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root variant="danger">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllSizes: ButtonStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button.Root size="2xs">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root size="xs">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root size="sm">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root size="md">
        <Button.Icon asChild>
          <RiArrowLeftSLine />
        </Button.Icon>
        Button
        <Button.Icon asChild>
          <RiArrowRightSLine />
        </Button.Icon>
      </Button.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const IconOnly: ButtonStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button.Root iconOnly variant="primary">
        <Button.Icon asChild>
          <RiAddLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root iconOnly variant="secondary">
        <Button.Icon asChild>
          <RiAddLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root iconOnly variant="outline">
        <Button.Icon asChild>
          <RiAddLine />
        </Button.Icon>
      </Button.Root>
      <Button.Root iconOnly variant="danger">
        <Button.Icon asChild>
          <RiDeleteBinLine />
        </Button.Icon>
      </Button.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
