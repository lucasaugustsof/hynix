import type { Meta, StoryObj } from '@storybook/react'

import {
  TabsToggle,
  TabsToggleList,
  TabsToggleTrigger,
} from '@r/components/tabs-toggle'

const meta: Meta = {
  title: 'components/TabsToggle',
  component() {
    return (
      <TabsToggle defaultValue="overview">
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
  parameters: {
    layout: 'centered',
  },
}

export default meta

type TabsToggleStory = StoryObj

export const Default: TabsToggleStory = {}
