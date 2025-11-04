import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, type AvatarRootProps, getInitials } from '@/components/avatar'

export default {
  title: 'Components/Avatar',
  component: Avatar.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['80', '72', '64', '56', '48', '40', '32', '24', '20'],
      description: 'Size of the avatar in pixels',
      table: {
        category: 'Appearance',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '80',
        },
      },
    },
  },
  args: {
    size: '80',
  },
} satisfies Meta<AvatarRootProps>

type AvatarStory = StoryObj<AvatarRootProps>

export const Default: AvatarStory = {
  render: args => (
    <Avatar.Root {...args}>
      <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
      <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />

      <Avatar.Positioner>
        <Avatar.Status />
      </Avatar.Positioner>
    </Avatar.Root>
  ),
}
