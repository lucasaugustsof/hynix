import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { RiInformation2Fill, RiUser6Line } from '@remixicon/react'
import { Field, type FieldRootProps } from '@/components/field'

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Controls the height and horizontal spacing of the input',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'xs',
        },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Change event handler for the input element',
      table: {
        category: 'Events',
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
  },
  args: {
    size: 'md',
    onChange: action('onChange'),
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} as Meta<FieldRootProps>

export default meta

type FieldStory = StoryObj<FieldRootProps>

export const Default: FieldStory = {
  render(args) {
    return (
      <Field.Root {...args}>
        <Field.Control>
          <Field.Icon asChild>
            <RiUser6Line />
          </Field.Icon>

          <Field.Input placeholder="Placeholder text..." />

          <Field.Icon asChild>
            <RiInformation2Fill />
          </Field.Icon>
        </Field.Control>
      </Field.Root>
    )
  },
}

export const WithoutIcons: FieldStory = {
  render(args) {
    return (
      <Field.Root {...args}>
        <Field.Control>
          <Field.Input placeholder="Enter your response..." />
        </Field.Control>
      </Field.Root>
    )
  },
}

export const Disabled: FieldStory = {
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
      <Field.Root {...args}>
        <Field.Control>
          <Field.Icon asChild>
            <RiUser6Line />
          </Field.Icon>
          <Field.Input disabled placeholder="This field is locked" value="disabled@domain.com" />
          <Field.Icon asChild>
            <RiInformation2Fill />
          </Field.Icon>
        </Field.Control>
      </Field.Root>
    )
  },
}

export const Invalid: FieldStory = {
  args: {
    invalid: true,
  },
  argTypes: {
    invalid: {
      control: false,
    },
  },
  render(args) {
    return (
      <Field.Root {...args}>
        <Field.Control>
          <Field.Icon asChild>
            <RiUser6Line />
          </Field.Icon>
          <Field.Input
            aria-invalid
            data-invalid
            placeholder="Enter a valid username"
            defaultValue="user!"
          />
          <Field.Icon asChild>
            <RiInformation2Fill />
          </Field.Icon>
        </Field.Control>
      </Field.Root>
    )
  },
}

export const AllSizes: FieldStory = {
  render(args) {
    const sizes: FieldRootProps['size'][] = ['xs', 'sm', 'md']

    return (
      <div className="flex items-center space-x-6">
        {sizes.reverse().map(size => (
          <div key={size} className="space-y-1">
            <Field.Root {...args} size={size}>
              <Field.Control>
                <Field.Icon asChild>
                  <RiUser6Line />
                </Field.Icon>
                <Field.Input placeholder={`Field size "${size}"`} />
                <Field.Icon asChild>
                  <RiInformation2Fill />
                </Field.Icon>
              </Field.Control>
            </Field.Root>
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}
