import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { RiFocus3Line } from '@remixicon/react'

import { Button } from '@r/components/button'
import { Tooltip, type TooltipProps } from '@r/components/tooltip'

import { cn } from '@r/utilities/cn'

type TooltipStory = StoryObj<TooltipProps>

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component(args) {
    return (
      <Tooltip.Root {...args}>
        <Tooltip.Trigger asChild>
          <Button variant="secondary" iconOnly>
            <RiFocus3Line />
          </Button>
        </Tooltip.Trigger>

        <Tooltip.Content>
          <div
            className={cn(
              'rounded border border-highlight border-dashed bg-highlight/10 px-4 py-1',
              'font-mono font-semibold text-highlight text-sm/normal uppercase',
            )}
          >
            slot content
          </div>
        </Tooltip.Content>
      </Tooltip.Root>
    )
  },
  args: {
    openDelay: 1000,
    closeDelay: 200,
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
