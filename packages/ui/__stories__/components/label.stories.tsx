import type { Meta, StoryObj } from '@storybook/react'
import { Label, type LabelProps } from '@r/components/label'

type LabelStoryArgs = LabelProps & {
  'data-disabled': boolean
}

const meta: Meta<LabelStoryArgs> = {
  title: 'components/Label',
  component: Label,
  tags: ['autodocs', 'code-only'],
  args: {
    children: 'Label text',
    size: 'md',
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
    size: {
      description: 'Controls the font size of the label.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg', 'xl'],
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

export const FormFieldLabel: LabelStory = {
  name: 'Form field label',
  args: {
    children: 'Email address',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a small label to annotate form input fields like text or email.',
      },
    },
  },
}

export const SectionTitle: LabelStory = {
  name: 'Section title',
  args: {
    children: 'Billing information',
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a large label to denote section headings in a layout or form.',
      },
    },
  },
}

export const DisabledLabel: LabelStory = {
  name: 'Disabled label',
  args: {
    children: 'Username (disabled)',
    size: 'md',
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
