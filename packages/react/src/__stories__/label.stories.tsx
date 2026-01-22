import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { RiMailLine } from '@remixicon/react'
import { Field } from '@/components/field'
import { Label } from '@/components/label'
import { LinkButton } from '@/components/link-button'

type LabelProps = React.ComponentProps<typeof Label.Root>

export default {
  title: 'Components/Forms/Label',
  component: Label.Root,
  argTypes: {
    children: {
      control: false,
      description: 'Label content including Text, Asterisk, SubText, Info, and Button components',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<LabelProps>

type LabelStory = StoryObj<LabelProps>

export const Default: LabelStory = {
  render() {
    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Label</Label.Text>
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithAsterisk: LabelStory = {
  render() {
    return (
      <Field.Root required>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Asterisk />
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithSubText: LabelStory = {
  render() {
    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.SubText>(Optional)</Label.SubText>
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithInfo: LabelStory = {
  render() {
    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Info aria-label="More information about email" />
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithButton: LabelStory = {
  render() {
    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Password</Label.Text>
          <LinkButton.Root onClick={action('Help clicked!')} href="#">
            Help?
          </LinkButton.Root>
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const Complete: LabelStory = {
  render() {
    return (
      <Field.Root required>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Asterisk />
          <Label.SubText>(Optional)</Label.SubText>
          <Label.Info aria-label="More information about email" />
          <LinkButton.Root onClick={action('Help clicked!')} href="#">
            Help?
          </LinkButton.Root>
        </Label.Root>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithField: LabelStory = {
  render() {
    return (
      <Field.Root required>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Asterisk />
          <Label.SubText>(Required)</Label.SubText>
          <Label.Info aria-label="We'll never share your email" />
          <LinkButton.Root onClick={action('Why do we need this?')} href="#">
            Why?
          </LinkButton.Root>
        </Label.Root>

        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>

          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const DisabledState: LabelStory = {
  render() {
    return (
      <Field.Root disabled>
        <Label.Root>
          <Label.Text>Email</Label.Text>
          <Label.Asterisk />
          <Label.SubText>(Disabled)</Label.SubText>
          <Label.Info aria-label="This field is disabled" />
          <LinkButton.Root href="#" disabled>
            Why?
          </LinkButton.Root>
        </Label.Root>

        <Field.Control>
          <Field.Icon asChild>
            <RiMailLine />
          </Field.Icon>
          <Field.Input type="email" placeholder="john@example.com" />
        </Field.Control>
      </Field.Root>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const Variations: LabelStory = {
  render() {
    return (
      <div className="flex flex-col gap-y-6">
        <Field.Root>
          <Label.Root>
            <Label.Text>Simple Label</Label.Text>
          </Label.Root>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
        </Field.Root>

        <Field.Root required>
          <Label.Root>
            <Label.Text>Required Field</Label.Text>
            <Label.Asterisk />
          </Label.Root>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
        </Field.Root>

        <Field.Root>
          <Label.Root>
            <Label.Text>With Helper Info</Label.Text>
            <Label.Info aria-label="Additional information" />
          </Label.Root>
          <Field.Control>
            <Field.Input type="text" placeholder="Enter text" />
          </Field.Control>
        </Field.Root>

        <Field.Root>
          <Label.Root>
            <Label.Text>With Action Button</Label.Text>
            <LinkButton.Root onClick={action('Forgot password?')} href="#">
              Forgot?
            </LinkButton.Root>
          </Label.Root>
          <Field.Control>
            <Field.Input type="password" placeholder="Enter password" />
          </Field.Control>
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
