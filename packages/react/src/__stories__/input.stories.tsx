import type React from 'react'
import { Field as ArkField } from '@ark-ui/react/field'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiAtLine, RiMailLine, RiSearchLine, RiUser6Line } from '@remixicon/react'
import { HintText } from '@/components/hint-text'
import { Input } from '@/components/input'
import { Label } from '@/components/label'

type InputRootProps = React.ComponentProps<typeof Input.Root>

type InputProps = InputRootProps & {
  disabled?: boolean
  placeholder?: string
}

const meta = {
  title: 'Components/Forms/Input',
  component: Input.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm', 'xs'],
      description: 'Controls the height and spacing of the input',
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
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
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
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    size: 'md',
    disabled: false,
    placeholder: 'Enter text...',
  },
  decorators: [
    Story => (
      <ArkField.Root className="w-80">
        <Story />
      </ArkField.Root>
    ),
  ],
} satisfies Meta<InputProps>

export default meta

type InputStory = StoryObj<InputProps>

export const Default: InputStory = {
  render({ disabled, placeholder, ...args }) {
    return (
      <Input.Root {...args}>
        <Input.Control>
          <Input.TextField placeholder={placeholder} disabled={disabled} />
        </Input.Control>
      </Input.Root>
    )
  },
}

export const WithIcon: InputStory = {
  render({ disabled, placeholder, ...args }) {
    return (
      <Input.Root {...args}>
        <Input.Control>
          <Input.Icon as={RiSearchLine} />
          <Input.TextField placeholder={placeholder} disabled={disabled} />
        </Input.Control>
      </Input.Root>
    )
  },
  args: {
    placeholder: 'Search...',
  },
}

export const WithAddonPrefix: InputStory = {
  render({ ...args }) {
    return (
      <Input.Root {...args}>
        <Input.AddonPrefix>https://</Input.AddonPrefix>
        <Input.Control>
          <Input.TextField placeholder="www.example.com" />
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

export const WithAddonInlinePrefix: InputStory = {
  render({ ...args }) {
    return (
      <Input.Root {...args}>
        <Input.Control>
          <Input.AddonInlinePrefix>$</Input.AddonInlinePrefix>
          <Input.TextField placeholder="0.00" />
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

export const Disabled: InputStory = {
  render(args) {
    return (
      <div className="flex flex-col gap-4">
        <ArkField.Root disabled className="space-y-1">
          <Input.Root {...args}>
            <Input.Control>
              <Input.TextField placeholder="Disabled empty input" disabled />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>

        <ArkField.Root disabled className="space-y-1">
          <Input.Root {...args}>
            <Input.Control>
              <Input.Icon as={RiUser6Line} />
              <Input.TextField placeholder="Disabled with value" defaultValue="john.doe" disabled />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>

        <ArkField.Root disabled className="space-y-1">
          <Input.Root {...args}>
            <Input.AddonPrefix>https://</Input.AddonPrefix>
            <Input.Control>
              <Input.TextField placeholder="Disabled with addon" disabled />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>
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

export const Invalid: InputStory = {
  render(args) {
    return (
      <ArkField.Root invalid className="space-y-1">
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Asterisk />
        </Label.Root>

        <Input.Root {...args}>
          <Input.Control>
            <Input.Icon as={RiMailLine} />
            <Input.TextField
              placeholder="you@example.com"
              defaultValue="invalid-email"
              aria-describedby="email-error"
            />
          </Input.Control>
        </Input.Root>

        <HintText leftIcon>Please enter a valid email address.</HintText>
      </ArkField.Root>
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

export const AllSizes: InputStory = {
  render() {
    const sizes: InputRootProps['size'][] = ['md', 'sm', 'xs']

    return (
      <div className="flex items-end gap-4">
        {sizes.map(size => (
          <ArkField.Root key={size} className="flex-1 space-y-1">
            <Label.Root>
              <Label.Text>Size: {size}</Label.Text>
            </Label.Root>

            <Input.Root size={size}>
              <Input.Control>
                <Input.Icon as={RiSearchLine} />
                <Input.TextField placeholder="Search..." />
              </Input.Control>
            </Input.Root>
          </ArkField.Root>
        ))}
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

export const CompleteFormField: InputStory = {
  render(args) {
    return (
      <ArkField.Root className="space-y-1">
        <Label.Root>
          <Label.Text>Username</Label.Text>
          <Label.Asterisk />
          <Label.SubText>(Required)</Label.SubText>
          <Label.Info />
        </Label.Root>

        <Input.Root {...args}>
          <Input.Control>
            <Input.Icon as={RiAtLine} />
            <Input.TextField placeholder="Enter your username" autoComplete="username" />
          </Input.Control>
        </Input.Root>

        <HintText leftIcon>
          Your username must be unique and contain only letters and numbers.
        </HintText>
      </ArkField.Root>
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

export const InputVariations: InputStory = {
  render() {
    return (
      <div className="flex flex-col gap-6">
        <ArkField.Root className="space-y-1">
          <Label.Root>
            <Label.Text>Email</Label.Text>
          </Label.Root>
          <Input.Root>
            <Input.Control>
              <Input.Icon as={RiMailLine} />
              <Input.TextField placeholder="you@example.com" autoComplete="email" />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>

        <ArkField.Root className="space-y-1">
          <Label.Root>
            <Label.Text>Website</Label.Text>
          </Label.Root>
          <Input.Root>
            <Input.AddonPrefix>https://</Input.AddonPrefix>
            <Input.Control>
              <Input.TextField placeholder="www.yoursite.com" />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>

        <ArkField.Root className="space-y-1">
          <Label.Root>
            <Label.Text>Price</Label.Text>
          </Label.Root>
          <Input.Root>
            <Input.Control>
              <Input.AddonInlinePrefix>$</Input.AddonInlinePrefix>
              <Input.TextField placeholder="99.00" />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>

        <ArkField.Root className="space-y-1">
          <Label.Root>
            <Label.Text>Search</Label.Text>
          </Label.Root>
          <Input.Root>
            <Input.Control>
              <Input.Icon as={RiSearchLine} />
              <Input.TextField placeholder="Search for anything..." />
            </Input.Control>
          </Input.Root>
        </ArkField.Root>
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
