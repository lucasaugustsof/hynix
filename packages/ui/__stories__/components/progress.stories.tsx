import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Progress, type ProgressProps } from '@r/components/progress'

const meta: Meta<ProgressProps> = {
  title: 'components/Progress',
  component: Progress.Root,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A visual indicator used to communicate task progress, system status, or ongoing operations.\n\n[View source on GitHub](https://github.com/lucasaugustsof/hynix/blob/main/packages/ui/src/components/progress)',
      },
    },
  },
  args: {
    value: 50,
    max: 100,
    size: 'md',
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
    size: {
      description: 'Size of the progress bar.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
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
  parameters: {
    docs: {
      description: {
        story: 'A default progress bar indicating the progress of a task.',
      },
    },
  },
}

export const Uploading: ProgressStory = {
  name: 'Uploading file',
  args: {
    value: 32,
    max: 100,
    size: 'md',
  },
  render: renderProgress,
  parameters: {
    docs: {
      description: {
        story: 'Displays current file upload progress.',
      },
    },
  },
}

export const LargeBar: ProgressStory = {
  name: 'Large bar for emphasis',
  args: {
    value: 80,
    max: 100,
    size: 'lg',
  },
  render: renderProgress,
  parameters: {
    docs: {
      description: {
        story: 'Use the large variant for emphasis in dashboards or metrics.',
      },
    },
  },
}

export const FullWidthBar: ProgressStory = {
  name: 'Full width bar',
  args: {
    value: 45,
  },
  render: args => (
    <Progress.Root {...args} className="w-full">
      <Progress.Label>Loading dashboard</Progress.Label>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
      <Progress.ValueText />
    </Progress.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A full-width progress bar with a striped gradient style, used in dashboards or page loaders.',
      },
    },
  },
}

export const AutoFill: ProgressStory = {
  name: 'Auto fill (simulated sync)',
  render: () => {
    const [progress, setProgress] = React.useState(0)
    const max = 100

    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= max) {
            clearInterval(interval)
            return max
          }
          return prev + 1
        })
      }, 25)

      return () => clearInterval(interval)
    }, [])

    return (
      <Progress.Root
        value={progress}
        max={max}
        className="flex flex-col space-y-3"
      >
        <div className="flex w-full items-center justify-between">
          <Progress.Label>Syncing workspace</Progress.Label>

          <Progress.ValueText>
            {progress} of {max}
          </Progress.ValueText>
        </div>

        <Progress.Track>
          <Progress.Range className="bg-[repeating-linear-gradient(45deg,var(--color-blue-500)_0_8px,var(--color-blue-400)_8px_16px)]" />
        </Progress.Track>
      </Progress.Root>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simulates a workspace sync operation, automatically filling the progress bar from 0 to 100.',
      },
    },
  },
}
