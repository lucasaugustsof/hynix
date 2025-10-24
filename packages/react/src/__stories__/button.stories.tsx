import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  RiAddLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiCheckboxCircleLine,
  RiDeleteBinLine,
  RiFileCopyLine,
} from '@remixicon/react'
import { AnimatePresence, motion } from 'motion/react'
import { Button, type ButtonRootProps } from '@/components/button'
import { cn } from '@/lib/cn'

export default {
  title: 'Components/Button',
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
      <Button.Root iconOnly variant="primary">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root iconOnly variant="secondary">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root iconOnly variant="outline">
        <Button.Icon as={RiAddLine} />
      </Button.Root>
      <Button.Root iconOnly variant="danger">
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

export const WithAnimation: ButtonStory = {
  render() {
    function CopyButton() {
      const [isCopied, setIsCopied] = React.useState(false)

      function handleCopyText() {
        const TIMEOUT = 2000

        navigator.clipboard.writeText('Hello World')
        setIsCopied(true)

        setTimeout(() => setIsCopied(false), TIMEOUT)
      }

      return (
        <Button.Root
          onClick={handleCopyText}
          className={cn(
            isCopied && 'pointer-events-none',
            'transition-[background-color,box-shadow,scale] active:scale-98'
          )}
          variant="secondary"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <Button.Icon
              as={motion.span}
              key={isCopied ? 'copied' : 'copy'}
              initial={{
                opacity: 0.5,
                filter: 'blur(2px)',
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
              }}
              exit={{
                opacity: 0,
                filter: 'blur(2px)',
                scale: 0.9,
              }}
              transition={{
                ease: 'easeOut',
                duration: 0.15,
              }}
            >
              {isCopied ? <RiCheckboxCircleLine /> : <RiFileCopyLine />}
            </Button.Icon>
          </AnimatePresence>
          Copy
        </Button.Root>
      )
    }

    return <CopyButton />
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}
