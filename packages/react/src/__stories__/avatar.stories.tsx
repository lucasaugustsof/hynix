import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { Avatar, type AvatarRootProps, getInitials } from '@/components/avatar'
import addSvg from '@/components/avatar/assets/add.svg'
import favoriteSvg from '@/components/avatar/assets/favorite.svg'
import pinSvg from '@/components/avatar/assets/pin.svg'
import removeSvg from '@/components/avatar/assets/remove.svg'
import verifiedSvg from '@/components/avatar/assets/verified.svg'

export default {
  title: 'Components/Data Display/Avatar',
  component: Avatar.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['80', '72', '64', '56', '48', '40', '32', '24', '20'],
      description: 'Size of the avatar in pixels',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '80',
        },
      },
    },
    onStatusChange: {
      action: 'onStatusChange',
      description: 'Callback when the status changes',
      table: {
        category: 'Events',
        type: {
          summary: 'function',
        },
      },
    },
  },
  args: {
    size: '56',
    onStatusChange: action('onStatusChange'),
  },
} satisfies Meta<AvatarRootProps>

type AvatarStory = StoryObj<AvatarRootProps>

export const Default: AvatarStory = {
  render: args => (
    <Avatar.Root {...args}>
      <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
      <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
    </Avatar.Root>
  ),
}

export const AllSizes: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="72">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="64">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="48">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="32">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="24">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>

      <Avatar.Root size="20">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const FallbackOnly: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Jane Smith')}</Avatar.Fallback>
      </Avatar.Root>

      <Avatar.Root size="24">
        <Avatar.Fallback>{getInitials('Bob Johnson')}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithStatus: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner>
          <Avatar.Status type="online" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/300" alt="John Doe" />
        <Avatar.Positioner>
          <Avatar.Status type="busy" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Jane Smith')}</Avatar.Fallback>
        <Avatar.Positioner>
          <Avatar.Status type="away" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="32">
        <Avatar.Fallback>{getInitials('Bob Johnson')}</Avatar.Fallback>
        <Avatar.Positioner>
          <Avatar.Status type="offline" />
        </Avatar.Positioner>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllStatusTypes: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner>
          <Avatar.Status type="online" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner>
          <Avatar.Status type="busy" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner>
          <Avatar.Status type="away" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner>
          <Avatar.Status type="offline" />
        </Avatar.Positioner>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithNotification: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Notification />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/300" alt="John Doe" />
        <Avatar.Positioner placement="top">
          <Avatar.Notification />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Jane Smith')}</Avatar.Fallback>
        <Avatar.Positioner placement="top">
          <Avatar.Notification />
        </Avatar.Positioner>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithPlaceholder: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image showPlaceholder alt="Placeholder" />
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
        <Avatar.Image showPlaceholder alt="Placeholder" />
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Jane Smith')}</Avatar.Fallback>
        <Avatar.Image showPlaceholder alt="Placeholder" />
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithBadge: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6">
      <Avatar.Root size="80">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={verifiedSvg} alt="Verified account" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
        <Avatar.Image src="https://i.pravatar.cc/300" alt="John Doe" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={pinSvg} alt="Pinned user" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="40">
        <Avatar.Fallback>{getInitials('Jane Smith')}</Avatar.Fallback>
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={favoriteSvg} alt="Favorite user" />
        </Avatar.Positioner>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const AllBadgeTypes: AvatarStory = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={verifiedSvg} alt="Verified account" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={pinSvg} alt="Pinned user" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={favoriteSvg} alt="Favorite user" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={addSvg} alt="Add user" />
        </Avatar.Positioner>
      </Avatar.Root>

      <Avatar.Root size="56">
        <Avatar.Fallback>{getInitials('Lucas Augusto')}</Avatar.Fallback>
        <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
        <Avatar.Positioner placement="top">
          <Avatar.Badge src={removeSvg} alt="Remove user" />
        </Avatar.Positioner>
      </Avatar.Root>
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
