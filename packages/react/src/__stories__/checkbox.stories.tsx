import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { Button } from '@/components/button'
import {
  Checkbox,
  type CheckboxRootProps,
  CheckboxWithLabel as ComponentCheckboxWithLabel,
} from '@/components/checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  argTypes: {
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      description: 'Controlled checked state of the checkbox',
      table: {
        category: 'State',
        type: {
          summary: 'boolean | "indeterminate"',
        },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled checkbox',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox interaction',
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
      control: 'boolean',
      description: 'Marks the checkbox as required',
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
} satisfies Meta<CheckboxRootProps>

export default meta

type CheckboxStory = StoryObj<CheckboxRootProps>

export const Default: CheckboxStory = {
  render(args) {
    return (
      <Checkbox.Root {...args}>
        <Checkbox.Control />
      </Checkbox.Root>
    )
  },
}

export const Checked: CheckboxStory = {
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
      <Checkbox.Root {...args}>
        <Checkbox.Control />
      </Checkbox.Root>
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

export const Indeterminate: CheckboxStory = {
  args: {
    checked: 'indeterminate',
  },
  argTypes: {
    checked: {
      control: false,
    },
  },
  render(args) {
    return (
      <Checkbox.Root {...args}>
        <Checkbox.Control />
      </Checkbox.Root>
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

export const Disabled: CheckboxStory = {
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
        <Checkbox.Root {...args}>
          <Checkbox.Control />
        </Checkbox.Root>

        <Checkbox.Root {...args} defaultChecked>
          <Checkbox.Control />
        </Checkbox.Root>

        <Checkbox.Root {...args} checked="indeterminate">
          <Checkbox.Control />
        </Checkbox.Root>
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

export const Controlled: CheckboxStory = {
  render(args) {
    const [checked, setChecked] = React.useState(false)

    return (
      <div className="space-y-4">
        <Checkbox.Root
          {...args}
          checked={checked}
          onCheckedChange={() => setChecked(!checked)}
          className="grid grid-cols-[auto_1fr] gap-x-2"
        >
          <Checkbox.Control />

          <span className="select-none text-fg-1 text-sm">
            Controlled checkbox (current: {checked ? 'checked' : 'unchecked'})
          </span>
        </Checkbox.Root>

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

export const CheckboxWithLabel: CheckboxStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ComponentCheckboxWithLabel
        editLabel="Email notifications"
        editSublabel="(Recommended)"
        editDescription="Receive updates about your account activity, security alerts, and product news directly to your inbox."
        badgeProps={{
          enabled: true,
          children: 'New',
          color: 'green',
        }}
        linkButtonProps={{
          enabled: true,
          children: 'Manage preferences',
        }}
        defaultChecked
      />

      <ComponentCheckboxWithLabel
        editLabel="Two-factor authentication"
        editSublabel="(Required for admin)"
        editDescription="Add an extra layer of security to your account by requiring a verification code in addition to your password."
        linkButtonProps={{
          enabled: true,
          children: 'Learn more',
        }}
      />

      <ComponentCheckboxWithLabel
        editLabel="Marketing communications"
        editSublabel="(Recommended)"
        editDescription="Get the latest product updates, feature releases, and special offers from our team."
      />

      <ComponentCheckboxWithLabel
        editLabel="Beta features access"
        badgeProps={{
          enabled: true,
          children: 'Beta',
        }}
        editDescription="Get early access to experimental features. Note that these may be unstable or change without notice."
        linkButtonProps={{
          enabled: true,
          children: 'View roadmap',
        }}
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
  },
}
