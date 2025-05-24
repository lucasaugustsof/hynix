import type { Meta, StoryObj } from '@storybook/react'

import { TabsToggle, type TabsToggleProps } from '@r/components/tabs-toggle'

const meta: Meta<TabsToggleProps> = {
  title: 'components/TabsToggle',
  component(args) {
    return (
      <TabsToggle.Root {...args} defaultValue="overview">
        <TabsToggle.List>
          <TabsToggle.Trigger value="overview">Overview</TabsToggle.Trigger>
          <TabsToggle.Trigger value="analytics">Analytics</TabsToggle.Trigger>
          <TabsToggle.Trigger value="team">Team</TabsToggle.Trigger>
          <TabsToggle.Trigger value="billing">Billing</TabsToggle.Trigger>
          <TabsToggle.Trigger value="settings">Settings</TabsToggle.Trigger>
        </TabsToggle.List>
      </TabsToggle.Root>
    )
  },
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the toggle buttons',
      table: {
        category: 'Visual',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type TabsToggleStory = StoryObj<TabsToggleProps>

export const Default: TabsToggleStory = {}
