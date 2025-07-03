import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd, type KbdProps } from '@r/components/kbd'

const meta: Meta<KbdProps> = {
  title: 'components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    children: '⌘',
  },
  argTypes: {
    variant: {
      description: 'Defines the background and text color of the key.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['primary', 'secondary'],
    },
    children: {
      description: 'Key label or character to be displayed inside the kbd tag.',
      table: {
        category: 'Content',
      },
      control: {
        type: 'text',
      },
    },
    className: {
      description: 'Utility classes to override or extend styling.',
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

type KbdStory = StoryObj<KbdProps>

export const Basic: KbdStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A simple keyboard key representation.',
      },
    },
  },
}

export const Shortcut: KbdStory = {
  name: 'Keyboard shortcut',
  render: () => (
    <span className="inline-flex gap-1 text-fg-1 text-sm">
      <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
    </span>
  ),
  parameters: {
    controls: {
      exclude: ['children', 'variant', 'size'],
    },
    docs: {
      description: {
        story:
          'Use multiple `<Kbd />` components inline to represent keyboard shortcuts like Cmd + K.',
      },
    },
  },
}

export const SecondaryVariant: KbdStory = {
  name: 'Secondary variant',
  args: {
    variant: 'secondary',
    children: 'Esc',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A secondary variant is useful when displaying less prominent keyboard keys.',
      },
    },
  },
}
