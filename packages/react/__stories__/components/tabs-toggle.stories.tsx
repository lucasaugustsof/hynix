import type { Meta, StoryObj } from '@storybook/react'

import {
  TabsToggle,
  TabsToggleList,
  type TabsToggleProps,
  TabsToggleTrigger,
} from '@r/components/tabs-toggle'

const meta: Meta<TabsToggleProps> = {
  title: 'components/TabsToggle',
  component(args) {
    return (
      <TabsToggle {...args} defaultValue="overview">
        <TabsToggleList>
          <TabsToggleTrigger value="overview">Overview</TabsToggleTrigger>
          <TabsToggleTrigger value="analytics">Analytics</TabsToggleTrigger>
          <TabsToggleTrigger value="team">Team</TabsToggleTrigger>
          <TabsToggleTrigger value="billing">Billing</TabsToggleTrigger>
          <TabsToggleTrigger value="settings">Settings</TabsToggleTrigger>
        </TabsToggleList>
      </TabsToggle>
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
