import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronLeft, ChevronRight, CircleCheck, Copy, Plus, Trash } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button, type ButtonProps } from '@/components/button'
import { cn } from '@/lib/cn'

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

type ButtonStory = StoryObj<ButtonProps>

export const Default: ButtonStory = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: ButtonStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Button variant="primary">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button variant="secondary">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button variant="outline">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button variant="danger">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
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
      <Button size="2xs">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button size="xs">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button size="sm">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
      <Button size="md">
        <ChevronLeft />
        Button
        <ChevronRight />
      </Button>
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
      <Button iconOnly variant="primary">
        <Plus />
      </Button>
      <Button iconOnly variant="secondary">
        <Plus />
      </Button>
      <Button iconOnly variant="outline">
        <Plus />
      </Button>
      <Button iconOnly variant="danger">
        <Trash />
      </Button>
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
        <Button
          onClick={handleCopyText}
          className={cn(
            isCopied && 'pointer-events-none',
            'transition-[background-color,box-shadow,scale] active:scale-98'
          )}
          variant="secondary"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
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
              {isCopied ? <CircleCheck /> : <Copy />}
            </motion.span>
          </AnimatePresence>
          Copy
        </Button>
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
