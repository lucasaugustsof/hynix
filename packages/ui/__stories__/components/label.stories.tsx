import { Label, type LabelProps } from '@r/components/label'
import type { Meta, StoryObj } from '@storybook/react-vite'

type LabelStoryArgs = LabelProps & {
  'data-disabled': boolean
}

const meta: Meta<LabelStoryArgs> = {
  title: 'components/Label',
  component: Label,
  tags: ['autodocs', 'code-only'],
  args: {
    children: 'Label text',
  },
  argTypes: {
    children: {
      description: 'Text or element rendered inside the label.',
      table: {
        category: 'Content',
      },
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type LabelStory = StoryObj<LabelStoryArgs>

export const Basic: LabelStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A basic label component for UI elements or form fields.',
      },
    },
  },
}

export const DisabledLabel: LabelStory = {
  name: 'Disabled label',
  args: {
    children: 'Username (disabled)',
    'data-disabled': true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A label can visually indicate a disabled field using a data attribute.',
      },
    },
  },
}
