import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@r/components/button'
import {
  ProgressBar,
  type ProgressBarProps,
  ProgressBarProvider,
  ProgressBarTrack,
  ProgressBarValueText,
  useProgress,
} from '@r/components/progress-bar'

import { RiAddLine, RiSubtractLine } from '@remixicon/react'

type ProgressBarStory = StoryObj<ProgressBarProps>

const meta: Meta<ProgressBarProps> = {
  title: 'components/ProgressBar',
  component: args => {
    return (
      <ProgressBar {...args}>
        <ProgressBarTrack />
      </ProgressBar>
    )
  },
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Visual size of the progress bar.',
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export default meta

export const Default: ProgressBarStory = {
  args: {
    value: 0,
  },
  argTypes: {
    value: {
      name: 'value',
      description: 'The current progress value as a percentage (0-100).',
      control: { type: 'number', min: 0, max: 100 },
      table: {
        category: 'State',
      },
    },
  },
}

export const Controlled: StoryObj<
  React.ComponentPropsWithRef<typeof ProgressBarProvider>
> = {
  render(args) {
    const progress = useProgress()

    return (
      <>
        <ProgressBarProvider
          {...args}
          className="block space-y-2"
          value={progress}
        >
          <ProgressBarTrack />

          <div className="flex items-center justify-center">
            <ProgressBarValueText />
          </div>
        </ProgressBarProvider>

        <div className="mt-3 flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => progress.setValue(progress.value! - 10)}
            iconOnly
          >
            <RiSubtractLine />
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => progress.setValue(progress.value! + 10)}
            iconOnly
          >
            <RiAddLine />
          </Button>
        </div>
      </>
    )
  },
}
