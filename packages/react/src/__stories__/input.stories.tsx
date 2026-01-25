import { Field as ArkField } from '@ark-ui/react/field'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiUser6Line } from '@remixicon/react'
import { HintText } from '@/components/hint-text'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

type InputProps = React.ComponentProps<typeof Input.Root> & {
  disabled?: boolean
}

export default {
  title: 'Components/Forms/Input',
  component: Input.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm', 'xs'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    disabled: false,
  },

  decorators: [
    Story => (
      <ArkField.Root required className="max-w-80">
        <Story />
      </ArkField.Root>
    ),
  ],
} satisfies Meta<InputProps>

type InputStory = StoryObj<InputProps>

export const Default: InputStory = {
  render({ disabled, ...args }) {
    return (
      <Input.Root {...args}>
        <Input.Control>
          <Input.TextInput placeholder="Placeholder text..." disabled={disabled} />
        </Input.Control>
      </Input.Root>
    )
  },
}

export const WithAddonPrefix: InputStory = {
  render(args) {
    return (
      <Input.Root {...args}>
        <Input.AddonPrefix>https://</Input.AddonPrefix>
        <Input.Control>
          <Input.TextInput placeholder="Placeholder text..." />
        </Input.Control>
      </Input.Root>
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

export const CompleteWithField: InputStory = {
  render(args) {
    return (
      <div className="space-y-1">
        <Label.Root>
          <Label.Text>Change Label</Label.Text>
          <Label.Asterisk />
          <Label.SubText>(Optional)</Label.SubText>
          <Label.Info />
        </Label.Root>

        <Input.Root {...args}>
          <Input.Control>
            <Input.Icon as={RiUser6Line} />
            <Input.TextInput placeholder="Placeholder text..." />
          </Input.Control>
        </Input.Root>

        <HintText leftIcon>This is a hint text to help user.</HintText>
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
