import React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { Button } from '@/components/button'
import { Checkbox, useCheckbox } from '@/components/checkbox'

type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox.Root>

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Determines the size of the checkbox',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
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
    size: 'md',
    disabled: false,
    required: false,
    onCheckedChange: action('onCheckedChange'),
    defaultChecked: false,
  },
} satisfies Meta<CheckboxProps>

export default meta

type CheckboxStory = StoryObj<CheckboxProps>

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

          <span className="select-none text-fg-1 text-sm">Controlled checkbox</span>
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

export const Group: CheckboxStory = {
  render(_args) {
    const todoList = [
      {
        id: 1,
        title: 'Learn React',
        completed: false,
      },
      {
        id: 2,
        title: 'Learn TypeScript',
        completed: false,
      },
      {
        id: 3,
        title: 'Learn Next.js',
        completed: false,
      },
    ]

    return (
      <Checkbox.Group className="flex flex-col gap-y-3" defaultValue={['1']} name="todo">
        {todoList.map(todo => (
          <Checkbox.Root
            key={todo.id}
            value={String(todo.id)}
            className="inline-flex items-center gap-x-2"
          >
            <Checkbox.Control />
            <span className="select-none text-fg-1 text-paragraph-sm">{todo.title}</span>
          </Checkbox.Root>
        ))}
      </Checkbox.Group>
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

export const WithProvider: CheckboxStory = {
  render(_args) {
    const checkboxStore = useCheckbox()

    const isChecked = checkboxStore.checkedState === true
    const isIndeterminate = checkboxStore.checkedState === 'indeterminate'

    return (
      <div className="space-y-4">
        <Checkbox.RootProvider value={checkboxStore}>
          <div className="flex items-center gap-2">
            <Checkbox.Control />
            <span className="select-none text-fg-1 text-paragraph-sm">
              Accept terms and conditions
            </span>
          </div>
        </Checkbox.RootProvider>

        <div className="flex flex-wrap items-center gap-2">
          <Button.Root variant="secondary" size="xs" onClick={() => checkboxStore.setChecked(true)}>
            Check
          </Button.Root>

          <Button.Root
            variant="secondary"
            size="xs"
            onClick={() => checkboxStore.setChecked(false)}
          >
            Uncheck
          </Button.Root>

          <Button.Root
            variant="secondary"
            size="xs"
            onClick={() => checkboxStore.setChecked('indeterminate')}
          >
            Indeterminate
          </Button.Root>

          <Button.Root variant="secondary" size="xs" onClick={() => checkboxStore.toggleChecked()}>
            Toggle
          </Button.Root>
        </div>

        <pre className="text-fg-1 text-paragraph-sm">
          Current state:{' '}
          <output className="text-danger text-label-sm">
            {isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'}
          </output>
        </pre>
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
