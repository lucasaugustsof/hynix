import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Switch, type SwitchProps } from '@r/components/switch'

const meta: Meta<SwitchProps> = {
  title: 'components/Switch',
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    disabled: false,
    defaultChecked: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: {
      description: 'Defines the size of the switch.',
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: {
          summary: `'sm' | 'md' | 'lg'`,
        },
      },
    },
    defaultChecked: {
      description: 'Whether the switch is checked by default (uncontrolled).',
      control: false,
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      description: 'Disables the switch and prevents user interaction.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    onCheckedChange: {
      description:
        'Callback function triggered when the checked state of the switch changes. Receives the new boolean value as a parameter.',
      control: false,
      table: {
        category: 'Events',
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
}

export default meta

type SwitchStory = StoryObj<SwitchProps>

export const Basic: SwitchStory = {
  render: args => (
    <Switch.Root {...args}>
      <Switch.Control />
    </Switch.Root>
  ),
}

export const WithLabel: SwitchStory = {
  args: {
    label: 'Enable notifications',
  },
  argTypes: {
    label: {
      description: 'Text label displayed next to the switch.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
  },
  render: args => (
    <Switch.Root {...args}>
      <Switch.Control />
      <Switch.Label>{args.label}</Switch.Label>
    </Switch.Root>
  ),
}

export const Checked: SwitchStory = {
  args: {
    defaultChecked: true,
  },
  render: args => (
    <Switch.Root {...args}>
      <Switch.Control />
    </Switch.Root>
  ),
}

export const DisabledUnchecked: SwitchStory = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
  render: args => (
    <Switch.Root {...args}>
      <Switch.Control />
    </Switch.Root>
  ),
}

export const DisabledChecked: SwitchStory = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
  render: args => (
    <Switch.Root {...args}>
      <Switch.Control />
    </Switch.Root>
  ),
}
