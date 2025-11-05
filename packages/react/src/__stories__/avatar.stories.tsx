import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, type AvatarRootProps, getInitials } from '@/components/avatar'
// import addSvg from '@/components/avatar/assets/add.svg'
// import favoriteSvg from '@/components/avatar/assets/favorite.svg'
// import pinSvg from '@/components/avatar/assets/pin.svg'
// import removeSvg from '@/components/avatar/assets/remove.svg'
import verifiedSvg from '@/components/avatar/assets/verified.svg'

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

      <Avatar.Positioner placement="top">
        <Avatar.Badge src={verifiedSvg} alt="Verified" />
      </Avatar.Positioner>
    </Avatar.Root>
  ),
}
