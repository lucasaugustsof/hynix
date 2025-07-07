import { RiAddLine, RiDeleteBinLine } from '@remixicon/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, type ButtonProps } from '@r/components/button'

const meta: Meta<ButtonProps> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    appearance: 'primary',
    size: 'md',
    isIconOnly: false,
    children: 'Click me',
  },
  argTypes: {
    appearance: {
      description: 'Defines the visual style of the button.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      description: 'Controls the size of the button.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    isIconOnly: {
      description:
        'If true, the button will have a square shape and contain only an icon.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'boolean',
      },
    },
    children: {
      description: 'Content displayed inside the button.',
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

type ButtonStory = StoryObj<ButtonProps>

export const Basic: ButtonStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A basic button used for primary actions.',
      },
    },
  },
}

export const SecondaryAction: ButtonStory = {
  name: 'Secondary action',
  args: {
    appearance: 'secondary',
    children: 'Cancel',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the secondary button for less prominent actions, such as cancel or back.',
      },
    },
  },
}

export const GhostMinimal: ButtonStory = {
  name: 'Ghost button',
  args: {
    appearance: 'ghost',
    children: 'Learn more',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ghost buttons are used for subtle actions or secondary links in minimal UIs.',
      },
    },
  },
}

export const DestructiveAction: ButtonStory = {
  name: 'Destructive action',
  args: {
    appearance: 'destructive',
    children: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a destructive button for irreversible actions like delete or remove.',
      },
    },
  },
}

export const AddIconButton: ButtonStory = {
  name: 'Icon only (add)',
  args: {
    isIconOnly: true,
    children: <RiAddLine aria-hidden="true" />,
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
    docs: {
      description: {
        story:
          'Use an icon-only button for compact actions like adding an item in lists or tables.',
      },
    },
  },
}

export const DeleteIconButton: ButtonStory = {
  name: 'Icon only (delete)',
  args: {
    appearance: 'destructive',
    isIconOnly: true,
    children: <RiDeleteBinLine aria-hidden="true" />,
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
    docs: {
      description: {
        story:
          'Use a destructive icon-only button for compact delete or remove actions.',
      },
    },
  },
}
