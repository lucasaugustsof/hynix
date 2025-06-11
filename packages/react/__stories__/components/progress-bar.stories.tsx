import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar, type ProgressBarProps } from '@r/components/progress-bar'

const meta: Meta<ProgressBarProps> = {
  title: 'components/ProgressBar',
  component: ProgressBar.Root,
  args: {
    size: 'md',
    value: 50,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the height and spacing of the progress bar',
      table: {
        category: 'Appearance',
      },
    },
    value: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
      description: 'Defines the current progress percentage (0-100)',
      table: {
        category: 'Behavior',
      },
    },
  },
}

export default meta

type Story = StoryObj<ProgressBarProps>

export const Basic: Story = {
  name: 'Basic Usage',
  render: args => (
    <ProgressBar.Root {...args}>
      <ProgressBar.Track />
    </ProgressBar.Root>
  ),
}

export const WithLabelAndValue: Story = {
  name: 'With Label and Value Text',
  render: args => (
    <ProgressBar.Root {...args}>
      <ProgressBar.Label>Uploading file</ProgressBar.Label>
      <ProgressBar.ValueText />
      <ProgressBar.Track />
    </ProgressBar.Root>
  ),
}

export const AnimatedProgress: Story = {
  name: 'Animated Progress (Live Demo)',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: args => {
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue(prev => (prev >= 100 ? 0 : prev + 5))
      }, 400)

      return () => clearInterval(interval)
    }, [])

    return (
      <ProgressBar.Root {...args} value={value}>
        <ProgressBar.Label>Loading reports...</ProgressBar.Label>
        <ProgressBar.ValueText />
        <ProgressBar.Track />
      </ProgressBar.Root>
    )
  },
}
