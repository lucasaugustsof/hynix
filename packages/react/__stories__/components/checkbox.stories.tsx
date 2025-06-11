import type { Meta, StoryObj } from '@storybook/react'

import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import { Checkbox, type CheckboxProps } from '@r/components/checkbox'
import CheckboxRaw from '@r/components/checkbox?raw'

const meta: Meta<CheckboxProps> = {
  title: 'components/Checkbox',
  component: Checkbox.Root,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(CheckboxRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type CheckboxStory = StoryObj<CheckboxProps>

export const Basic: CheckboxStory = {
  name: 'Basic',
  render: () => (
    <Checkbox.Root>
      <Checkbox.Control />
    </Checkbox.Root>
  ),
}

export const Checked: CheckboxStory = {
  name: 'Checked',
  render: () => (
    <Checkbox.Root defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Subscribed to newsletter</Checkbox.Label>
    </Checkbox.Root>
  ),
}

export const Indeterminate: CheckboxStory = {
  name: 'Indeterminate',
  render: () => (
    <Checkbox.Root checked="indeterminate" defaultChecked>
      <Checkbox.Control />
      <Checkbox.Label>Select all</Checkbox.Label>
    </Checkbox.Root>
  ),
}

export const Sizes: CheckboxStory = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox.Root size="sm">
        <Checkbox.Control />
        <Checkbox.Label>Small (sm)</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root size="md">
        <Checkbox.Control />
        <Checkbox.Label>Medium (md)</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root size="lg">
        <Checkbox.Control />
        <Checkbox.Label>Large (lg)</Checkbox.Label>
      </Checkbox.Root>
    </div>
  ),
}

export const Disabled: CheckboxStory = {
  name: 'Disabled',
  render: () => (
    <Checkbox.Root disabled>
      <Checkbox.Control />
      <Checkbox.Label>Option unavailable</Checkbox.Label>
    </Checkbox.Root>
  ),
}

export const CheckedDisabled: CheckboxStory = {
  name: 'Checked and Disabled',
  render: () => (
    <Checkbox.Root defaultChecked disabled>
      <Checkbox.Control />
      <Checkbox.Label>Feature enabled by admin</Checkbox.Label>
    </Checkbox.Root>
  ),
}

export const NotificationPreferences: CheckboxStory = {
  name: 'Notification Preferences',
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox.Root defaultChecked>
        <Checkbox.Control />
        <Checkbox.Label>Email</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root>
        <Checkbox.Control />
        <Checkbox.Label>Push</Checkbox.Label>
      </Checkbox.Root>

      <Checkbox.Root disabled>
        <Checkbox.Control />
        <Checkbox.Label>SMS (unavailable)</Checkbox.Label>
      </Checkbox.Root>
    </div>
  ),
}
