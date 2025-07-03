import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'

import * as Checkbox from '@r/components/checkbox'
import type { CheckboxProps } from '@r/components/checkbox'

import { Label } from '@r/components/label'

export default {
  title: 'components/Checkbox',
  component: Checkbox.Root,
  tags: ['autodocs'],
  args: {
    size: 'md',
    disabled: false,
    children: <Checkbox.Control />,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: {
      description: 'Controls the size of the checkbox: sm, md, or lg.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      description: 'Disables the checkbox, preventing user interaction.',
      table: {
        category: 'State',
      },
      control: {
        type: 'boolean',
      },
    },
    defaultChecked: {
      description: 'Initial checked state of the checkbox (uncontrolled).',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'boolean',
      },
    },
    checked: {
      description: 'Controlled state: whether the checkbox is checked or not.',
      table: {
        category: 'Behavior',
      },
      control: {
        type: 'boolean',
      },
    },
    onCheckedChange: {
      description: 'Callback triggered when the checked state changes.',
      table: {
        category: 'Events',
      },
      control: false,
    },
    children: {
      description:
        'The visual control element, typically `<CheckboxControl />`.',
      table: {
        category: 'Data',
        disable: true,
      },
      control: false,
    },
  },
} satisfies Meta<CheckboxProps>

type CheckboxStory = StoryObj<CheckboxProps>

export const Basic: CheckboxStory = {
  name: 'Basic',
  args: {
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uncontrolled checkbox with initial unchecked state. Use `defaultChecked` to set initial value.',
      },
    },
  },
  argTypes: {
    checked: {
      control: false,
    },
    onCheckedChange: {
      control: false,
    },
  },
}

export const Controlled: CheckboxStory = {
  name: 'Controlled',
  render: args => {
    const [checked, setChecked] = React.useState(false)

    return (
      <Checkbox.Root
        {...args}
        className="inline-flex items-center gap-x-3"
        checked={checked}
        onCheckedChange={details => {
          const { checked } = details

          if (checked !== 'indeterminate') {
            setChecked(checked)
          }
        }}
      >
        <Checkbox.Control />
        <Label>{checked ? 'Enabled' : 'Disabled'}</Label>
      </Checkbox.Root>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled usage example. The `checked` state is managed in the parent using `useState`.',
      },
    },
  },
  argTypes: {
    defaultChecked: {
      control: false,
    },
  },
}

export const Disabled: CheckboxStory = {
  name: 'Disabled',
  args: {
    disabled: true,
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Disabled checkbox. Prevents user interaction and shows inactive state.',
      },
    },
  },
  argTypes: {
    checked: {
      control: false,
    },
    onCheckedChange: {
      control: false,
    },
    defaultChecked: {
      control: false,
    },
  },
}

export const Indeterminate: CheckboxStory = {
  name: 'Indeterminate',
  args: {
    checked: 'indeterminate',
  },
  render: args => (
    <Checkbox.Root {...args}>
      <Checkbox.Control />
    </Checkbox.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Checkbox with indeterminate state. Cycles between `true`, `false`, and `"indeterminate"`.',
      },
    },
  },
  argTypes: {
    defaultChecked: {
      control: false,
    },
  },
}
