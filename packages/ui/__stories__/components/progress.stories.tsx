import type { Meta, StoryObj } from '@storybook/react'

import * as Progress from '@r/components/progress'
import type { ProgressProps } from '@r/components/progress'

const meta: Meta<ProgressProps> = {
  title: 'components/Progress',
  component: Progress.Root,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A visual indicator used to communicate task progress, system status, or ongoing operations.',
      },
    },
  },
  args: {
    value: 50,
    max: 100,
  },
  argTypes: {
    value: {
      description: 'Current progress value.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'number',
      },
    },
    max: {
      description: 'Maximum value of the progress range.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'number',
      },
    },
    defaultValue: {
      description:
        "The initial value of the progress bar when rendered. Use when you don't need to control the value of the progress.",
      table: {
        category: 'Behavior',
      },
      control: false,
    },
    formatOptions: {
      description: 'The options to use for formatting the value.',
      table: {
        category: 'Behavior',
      },
      control: false,
    },
    onValueChange: {
      description: 'Value change event.',
      control: false,
      table: {
        category: 'Event',
      },
    },
  },
}

export default meta

type ProgressStory = StoryObj<ProgressProps>

function renderProgress(args: ProgressProps) {
  return (
    <Progress.Root {...args}>
      <Progress.Label>Uploading file</Progress.Label>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
      <Progress.ValueText />
    </Progress.Root>
  )
}

export const Basic: ProgressStory = {
  name: 'Basic',
  render: renderProgress,
}
