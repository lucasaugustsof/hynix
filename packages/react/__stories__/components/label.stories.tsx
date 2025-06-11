import type { Meta, StoryObj } from '@storybook/react'

import { Label, type LabelProps } from '@r/components/label'

const meta: Meta<LabelProps> = {
  title: 'components/Label',
  component: Label,
  args: {
    size: 'md',
    children: 'Label',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Controls the font size of the label',
      table: {
        category: 'Appearance',
      },
    },
    children: {
      name: 'label',
      control: 'text',
      description: 'The label text content',
      table: {
        category: 'Content',
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<LabelProps>

export const Basic: Story = {
  name: 'Basic Usage',
  render: args => <Label {...args} />,
}
