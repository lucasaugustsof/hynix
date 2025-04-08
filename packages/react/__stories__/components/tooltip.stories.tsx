import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { RiFocus3Line } from '@remixicon/react'

import { Button } from 'registry/components/button'
import {
  Tooltip,
  TooltipContent,
  type TooltipProps,
  TooltipTrigger,
} from 'registry/components/tooltip'

import { cn } from 'registry/utilities/cn'

type TooltipStory = StoryObj<TooltipProps>

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component(args) {
    return (
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="secondary" iconOnly>
            <RiFocus3Line />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <div
            className={cn(
              'rounded border border-highlight border-dashed bg-highlight/10 px-4 py-1',
              'font-mono font-semibold text-highlight text-sm/normal uppercase',
            )}
          >
            slot content
          </div>
        </TooltipContent>
      </Tooltip>
    )
  },
  args: {
    openDelay: 1000,
    closeDelay: 0.8,
    onOpenChange: fn(),
  },
  argTypes: {
    openDelay: {
      description:
        'Time in seconds to wait before opening the tooltip after hover.',
      control: {
        type: 'number',
      },
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
        type: {
          summary: '(open: boolean) => void',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export const Default: TooltipStory = {}

export default meta
