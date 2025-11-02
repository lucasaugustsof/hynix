import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { Button } from '@/components/button'
import {
  SwitchWithLabel as ComponentSwitchWithLabel,
  Switch,
  type SwitchRootProps,
  type SwitchWithLabelProps,
} from '@/components/switch'

const meta = {
  title: 'Components/Switch',
  component: Switch.Root,
  argTypes: {
    checked: {
      control: false,
      description: 'Controlled checked state of the switch',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled switch',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the switch interaction',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: false,
      description: 'Marks the switch as required',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onCheckedChange: {
      action: 'onCheckedChange',
      description: 'Callback fired when checked state changes',
      table: {
        category: 'Events',
        type: {
          summary: '(details: CheckedChangeDetails) => void',
        },
      },
    },
  },
  args: {
    disabled: false,
    required: false,
    onCheckedChange: action('onCheckedChange'),
    defaultChecked: false,
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<SwitchRootProps>

export default meta

type SwitchStory = StoryObj<SwitchRootProps>

export const Default: SwitchStory = {
  render(args) {
    return (
      <Switch.Root {...args}>
        <Switch.Control />
      </Switch.Root>
    )
  },
}

export const Checked: SwitchStory = {
  args: {
    defaultChecked: true,
  },
  argTypes: {
    defaultChecked: {
      control: false,
    },
  },
  render(args) {
    return (
      <Switch.Root {...args}>
        <Switch.Control />
      </Switch.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
}

export const Disabled: SwitchStory = {
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
  },
  render(args) {
    return (
      <div className="flex flex-col gap-4">
        <Switch.Root {...args}>
          <Switch.Control />
        </Switch.Root>

        <Switch.Root {...args} defaultChecked>
          <Switch.Control />
        </Switch.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
}

export const Controlled: SwitchStory = {
  render(args) {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switch.Root {...args} checked={checked} onCheckedChange={() => setChecked(!checked)}>
            <Switch.Control />
          </Switch.Root>

          <span className="select-none text-fg-1 text-sm">
            Controlled switch (current: {checked ? 'on' : 'off'})
          </span>
        </div>

        <Button.Root variant="secondary" size="xs" onClick={() => setChecked(!checked)}>
          Toggle from outside
        </Button.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
}

export const SwitchWithLabel: StoryObj<SwitchWithLabelProps> = {
  args: {
    flip: false,
  },
  argTypes: {
    flip: {
      control: 'boolean',
      description:
        'Reverses the layout, positioning the switch on the right side instead of the left',
      defaultValue: false,
    },
  },
  render(args) {
    return (
      <div className="space-y-6">
        <ComponentSwitchWithLabel
          {...args}
          labelText="Email notifications"
          labelSubText="Recommended"
          badgeProps={{
            enabled: true,
            variant: 'light',
            color: 'blue',
            children: 'New',
          }}
          description="Receive email notifications about activity in your account, including mentions and replies."
          linkButtonProps={{
            enabled: true,
            children: 'Manage preferences',
            href: '#',
          }}
        />

        <ComponentSwitchWithLabel
          {...args}
          labelText="Two-factor authentication"
          description="Add an extra layer of security to your account by requiring a verification code in addition to your password."
          linkButtonProps={{
            enabled: true,
            children: 'Learn more',
            href: '#',
          }}
        />

        <ComponentSwitchWithLabel
          {...args}
          labelText="Dark mode"
          description="Switch between light and dark theme for better visibility in different lighting conditions."
        />
      </div>
    )
  },
  parameters: {
    controls: {
      include: ['flip'],
    },
    actions: {
      disable: true,
    },
  },
}
