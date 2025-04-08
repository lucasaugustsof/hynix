import type { Meta, StoryObj } from '@storybook/react'

import { Divider, type DividerProps } from 'registry/components/divider'

type DividerStory = StoryObj<DividerProps>

const meta: Meta<DividerProps> = {
  title: 'components/Divider',
  component: Divider,
  args: {
    type: 'default',
    labelText: 'Label',
    direction: 'horizontal',
  },
  argTypes: {
    type: {
      control: false,
      table: {
        disable: true,
      },
    },
    labelText: {
      name: 'Label Text',
      control: 'text',
      description:
        'Text that will be used as the label within the divider when using label variations.',
      table: {
        category: 'Content',
      },
    },
    direction: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: [],
}

export const Default: DividerStory = {}

export const LabelLeft: DividerStory = {
  render(args) {
    return <Divider {...args} type="label-left" />
  },
}

export const LabelCenter: DividerStory = {
  render(args) {
    return <Divider {...args} type="label-center" />
  },
}

export const LabelRight: DividerStory = {
  render(args) {
    return <Divider {...args} type="label-right" />
  },
}

export default meta
