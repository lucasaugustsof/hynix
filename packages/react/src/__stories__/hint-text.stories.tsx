import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiMailLine } from '@remixicon/react'
import { Field } from '@/components/field'
import { HintText, type HintTextProps } from '@/components/hint-text'

export default {
  title: 'Components/HintText',
  component: HintText,
  argTypes: {
    leftIcon: {
      control: 'boolean',
      description: 'Displays an information icon to the left of the hint text',
      table: {
        category: 'Appearance',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    children: {
      control: 'text',
      description: 'The hint text content to display',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  args: {
    leftIcon: false,
    children: 'This is a hint text to help user.',
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Field.Root>
          <Story />
        </Field.Root>
      </div>
    ),
  ],
} satisfies Meta<HintTextProps>

type HintTextStory = StoryObj<HintTextProps>

export const Default: HintTextStory = {
  args: {
    children: 'This is a hint text to help user.',
  },
}

export const WithIcon: HintTextStory = {
  render() {
    return (
      <Field.Root>
        <HintText leftIcon>This is a hint text with an icon.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithoutIcon: HintTextStory = {
  render() {
    return (
      <Field.Root>
        <HintText>This is a hint text without an icon.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const ErrorState: HintTextStory = {
  render() {
    return (
      <Field.Root invalid>
        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>
          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
        <HintText>Please enter a valid email address.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const ErrorStateWithIcon: HintTextStory = {
  render() {
    return (
      <Field.Root invalid>
        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>
          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
        <HintText leftIcon>Please enter a valid email address.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const DisabledState: HintTextStory = {
  render() {
    return (
      <Field.Root disabled>
        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>
          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
        <HintText leftIcon>This field is currently disabled.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithField: HintTextStory = {
  render() {
    return (
      <Field.Root>
        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>
          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
        <HintText leftIcon>We'll never share your email with anyone else.</HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const MultilineText: HintTextStory = {
  render() {
    return (
      <Field.Root>
        <Field.Control>
          <Field.Input type="password" placeholder="Enter password" />
        </Field.Control>
        <HintText leftIcon>
          Must be 8+ characters with uppercase, lowercase, number, and special character.
        </HintText>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const Variations: HintTextStory = {
  render() {
    return (
      <div className="flex flex-col gap-y-6">
        <Field.Root>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
          <HintText>Simple helper text without icon.</HintText>
        </Field.Root>

        <Field.Root>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
          <HintText leftIcon>Helper text with information icon.</HintText>
        </Field.Root>

        <Field.Root invalid>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
          <HintText>This field has an error.</HintText>
        </Field.Root>

        <Field.Root invalid>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
          <HintText leftIcon>This field has an error with icon.</HintText>
        </Field.Root>

        <Field.Root disabled>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
          <HintText leftIcon>This field is disabled.</HintText>
        </Field.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}
