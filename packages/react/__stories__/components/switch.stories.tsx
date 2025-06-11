import type { Meta, StoryObj } from '@storybook/react'

import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import { Switch, type SwitchProps } from '@r/components/switch'
import SwitchRaw from '@r/components/switch?raw'

const meta: Meta<SwitchProps> = {
  title: 'components/Switch',
  component: Switch.Root,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(SwitchRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type SwitchStory = StoryObj<SwitchProps>

export const Basic: SwitchStory = {
  name: 'Basic',
  render: () => (
    <Switch.Root>
      <Switch.Control />
    </Switch.Root>
  ),
}

export const Checked: SwitchStory = {
  name: 'Checked',
  render: () => (
    <Switch.Root defaultChecked>
      <Switch.Control />
      <Switch.Label>Dark mode</Switch.Label>
    </Switch.Root>
  ),
}

export const Disabled: SwitchStory = {
  name: 'Disabled',
  render: () => (
    <Switch.Root disabled>
      <Switch.Control />
      <Switch.Label>Auto-sync</Switch.Label>
    </Switch.Root>
  ),
}

export const CheckedDisabled: SwitchStory = {
  name: 'Checked and Disabled',
  render: () => (
    <Switch.Root defaultChecked disabled>
      <Switch.Control />
      <Switch.Label>Premium enabled</Switch.Label>
    </Switch.Root>
  ),
}

export const Sizes: SwitchStory = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <Switch.Root size="sm">
        <Switch.Control />
        <Switch.Label>Small</Switch.Label>
      </Switch.Root>

      <Switch.Root size="md">
        <Switch.Control />
        <Switch.Label>Medium</Switch.Label>
      </Switch.Root>

      <Switch.Root size="lg">
        <Switch.Control />
        <Switch.Label>Large</Switch.Label>
      </Switch.Root>

      <Switch.Root size="xl">
        <Switch.Control />
        <Switch.Label>Extra Large</Switch.Label>
      </Switch.Root>
    </div>
  ),
}

export const AccountSettingsExample: SwitchStory = {
  name: 'Account Settings Example',
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch.Root defaultChecked>
        <Switch.Control />
        <Switch.Label>Two-factor authentication</Switch.Label>
      </Switch.Root>

      <Switch.Root>
        <Switch.Control />
        <Switch.Label>Show activity status</Switch.Label>
      </Switch.Root>

      <Switch.Root disabled>
        <Switch.Control />
        <Switch.Label>Public profile (locked)</Switch.Label>
      </Switch.Root>
    </div>
  ),
}
