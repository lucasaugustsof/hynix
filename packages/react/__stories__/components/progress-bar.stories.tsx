import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar, type ProgressBarProps } from '@r/components/progress-bar'

type ProgressBarStory = StoryObj<ProgressBarProps>

const meta: Meta<ProgressBarProps> = {
  title: 'components/ProgressBar',
  component: args => {
    return (
      <ProgressBar.Root {...args}>
        <ProgressBar.ValueText />
        <ProgressBar.Track />
      </ProgressBar.Root>
    )
  },
  args: {
    value: 50,
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
        category: 'Visual',
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    value: {
      name: 'value',
      description: 'The current progress value as a percentage (0-100).',
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
      table: {
        category: 'Percentage',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export default meta

export const Basic: ProgressBarStory = {}
