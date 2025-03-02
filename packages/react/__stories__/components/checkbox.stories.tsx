import {
  Checkbox,
  CheckboxLabel,
  type CheckboxProps,
} from '@/registry/components/checkbox'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<CheckboxProps> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    labelPlacement: 'rtl',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Defines the size of the checkbox.',
      table: {
        category: 'Appearance',
      },
    },
    labelPlacement: {
      control: 'inline-radio',
      options: ['ltr', 'rtl'],
      description: 'Sets the label position relative to the checkbox.',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Changes the component state to disabled.',
      table: {
        category: 'State',
      },
    },
  },
}

export default meta

type CheckboxStory = StoryObj<CheckboxProps>

export const Basic: CheckboxStory = {}

export const Checked: CheckboxStory = {
  args: {
    checked: true,
  },
}

export const Indeterminate: CheckboxStory = {
  args: {
    checked: 'indeterminate',
  },
}

export const WithLabel: CheckboxStory = {
  render: args => (
    <Checkbox {...args}>
      <CheckboxLabel>Checkbox Label</CheckboxLabel>
    </Checkbox>
  ),
}

export const Sizes: CheckboxStory = {
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
  render: args => {
    const sizeLabels: Record<NonNullable<CheckboxProps['size']>, string> = {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
    }

    return (
      <div className="flex flex-col gap-4">
        {Object.entries(sizeLabels).map(([size, label]) => (
          <Checkbox key={size} {...args} size={size as CheckboxProps['size']}>
            <CheckboxLabel>{label}</CheckboxLabel>
          </Checkbox>
        ))}
      </div>
    )
  },
}
