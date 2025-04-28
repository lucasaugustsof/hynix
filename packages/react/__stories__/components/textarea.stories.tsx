import { Textarea, type TextareaProps } from '@r/components/textarea'

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<TextareaProps> = {
  title: 'components/Textarea',
  component: Textarea,
  args: {
    size: 'md',
    placeholder: 'Type something...',
    disabled: false,
    invalid: false,
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the textarea.',
      table: {
        category: 'Visual',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the textarea is empty.',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea, preventing user input.',
      table: {
        category: 'State',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the textarea as invalid, applying error styles.',
      table: {
        category: 'State',
      },
    },
    onChange: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type TextareaStory = StoryObj<TextareaProps>

export const Default: TextareaStory = {
  name: 'Default',
}
