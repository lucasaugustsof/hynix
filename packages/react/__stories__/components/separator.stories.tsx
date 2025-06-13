import type { Meta, StoryObj } from '@storybook/react'

import { Separator, type SeparatorProps } from '@r/components/separator'

const meta: Meta<SeparatorProps> = {
  title: 'components/Separator',
  component: Separator,
  tags: ['autodocs', 'experimental'],
  args: {
    type: 'default',
    direction: 'horizontal',
    labelText: 'Or continue with',
  },
  argTypes: {
    type: {
      description:
        'Defines the placement of the label relative to the separator line.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'label-left', 'label-center', 'label-right'],
    },
    direction: {
      description: 'Controls the direction of the separator line.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['horizontal', 'vertical'],
    },
    labelText: {
      description:
        'Text displayed between the lines when a labeled type is selected.',
      table: {
        category: 'Content',
      },
      control: {
        type: 'text',
      },
    },
    className: {
      description: 'Utility classes for styling the outer separator container.',
      table: {
        category: 'Layout',
      },
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type SeparatorStory = StoryObj<SeparatorProps>

export const Basic: SeparatorStory = {
  name: 'Basic',
  args: {
    type: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'A standard horizontal separator without any label.',
      },
    },
  },
}

export const WithLabelLeft: SeparatorStory = {
  name: 'Label on the left',
  args: {
    type: 'label-left',
    labelText: 'Step 1',
  },
  parameters: {
    docs: {
      description: {
        story: 'A horizontal separator with a label aligned to the left.',
      },
    },
  },
}

export const WithLabelCenter: SeparatorStory = {
  name: 'Label in the center',
  args: {
    type: 'label-center',
    labelText: 'Or continue with',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A horizontal separator with a label centered between two lines.',
      },
    },
  },
}

export const WithLabelRight: SeparatorStory = {
  name: 'Label on the right',
  args: {
    type: 'label-right',
    labelText: 'Final step',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A horizontal separator with the label placed to the right of the line.',
      },
    },
  },
}

export const VerticalSeparator: SeparatorStory = {
  name: 'Vertical separator',
  args: {
    direction: 'vertical',
    type: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A vertical line used to separate content in horizontal layouts (e.g., side-by-side panels).',
      },
    },
  },
}
