import type { Meta, StoryObj } from '@storybook/react'

import { Label, type LabelProps } from '@r/components/label'

const meta: Meta<LabelProps> = {
  title: 'components/Label',
  component: Label,
  args: {
    children: 'Label',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text or node displayed inside the label.',
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type LabelStory = StoryObj<LabelProps>

export const Default: LabelStory = {
  name: 'Default',
}
