import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine, RiDeleteBinLine } from '@remixicon/react'
import { Button } from '@/components/button'

type ButtonProps = React.ComponentPropsWithRef<typeof Button.Root>

export default {
  title: 'Components/Actions/Button',
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
    onlyIcon: {
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
    onlyIcon: false,
  },
} satisfies Meta<ButtonProps>

type ButtonStory = StoryObj<ButtonProps>

export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: ButtonStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button.Root variant="primary">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root variant="secondary">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root variant="outline">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root variant="danger">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
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
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root size="xs">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root size="sm">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
      </Button.Root>
      <Button.Root size="md">
        <Button.Icon as={RiArrowLeftSLine} />
        Button
        <Button.Icon as={RiArrowRightSLine} />
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
      <Button.Root onlyIcon variant="primary">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root onlyIcon variant="secondary">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root onlyIcon variant="outline">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root onlyIcon variant="danger">
        <Button.Icon as={RiDeleteBinLine} />
      </Button.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
