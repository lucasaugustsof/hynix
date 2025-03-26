import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Copy } from 'lucide-react'
import { useWindowSize } from 'usehooks-ts'

import { Button } from 'registry/components/button'
import {
  TooltipContent,
  type TooltipProps,
  TooltipRoot,
  TooltipTrigger,
} from 'registry/components/tooltip'

import { cn } from 'registry/utilities/cn'

type TooltipStory = StoryObj<TooltipProps>

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component(args) {
    const { width } = useWindowSize()

    return (
      <TooltipRoot {...args} open={width <= 768 ? true : undefined}>
        <TooltipTrigger asChild>
          <Button variant="secondary" iconOnly>
            <Copy />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <div
            className={cn(
              'rounded border border-blue-400 border-dashed bg-blue-500/10 px-4 py-1 dark:border-blue-500',
              'font-mono font-semibold text-blue-400 text-sm/normal uppercase dark:text-blue-500',
            )}
          >
            slot content
          </div>
        </TooltipContent>
      </TooltipRoot>
    )
  },
  args: {
    openDelay: 1,
    closeDelay: 0.8,
    onOpenChange: fn(),
  },
  argTypes: {
    openDelay: {
      description:
        'Time in seconds to wait before opening the tooltip after hover.',
      control: { type: 'number' },
      table: {
        category: 'Behavior',
      },
    },
    closeDelay: {
      description:
        'Time in seconds to wait before closing the tooltip after mouse leave.',
      control: {
        type: 'number',
      },
      table: {
        category: 'Behavior',
      },
    },
    onOpenChange: {
      description:
        'Callback function that is called whenever the tooltip open state changes. Receives a boolean indicating whether the tooltip is open.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['new'],
}

export const Default: TooltipStory = {}

export default meta
