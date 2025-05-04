import type { Meta, StoryObj } from '@storybook/react'

import { Separator, type SeparatorProps } from '@r/components/separator'

const meta: Meta<SeparatorProps> = {
  title: 'components/Separator',
  component: Separator,
  args: {
    direction: 'horizontal',
    labelText: 'Label',
  },
  argTypes: {
    labelText: {
      name: 'Label Text',
      control: 'text',
      description:
        'Text used as a label in labeled separators. Ignored for default variant.',
      table: {
        category: 'Content',
      },
    },
    direction: {
      name: 'Direction',
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Controls the orientation of the separator line.',
      table: {
        category: 'Layout',
      },
    },
    type: {
      control: false,
      table: { disable: true },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type SeparatorStory = StoryObj<SeparatorProps>

export const Basic: SeparatorStory = {
  args: {
    type: 'default',
    labelText: '',
  },
}

export const LabelLeft: SeparatorStory = {
  name: 'Label Left',
  render(args) {
    return <Separator {...args} type="label-left" />
  },
}

export const LabelCenter: SeparatorStory = {
  name: 'Label Center',
  render(args) {
    return <Separator {...args} type="label-center" />
  },
}

export const LabelRight: SeparatorStory = {
  name: 'Label Right',
  render(args) {
    return <Separator {...args} type="label-right" />
  },
}
