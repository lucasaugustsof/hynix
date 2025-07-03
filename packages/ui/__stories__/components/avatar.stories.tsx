import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, type AvatarProps } from '@r/components/avatar'

export default {
  title: 'components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: 'https://i.pravatar.cc/300',
    altText: 'John Doe',
    size: 'md',
    fallback: 'JD',
  },
  argTypes: {
    src: {
      description: 'URL of the avatar image displayed as the primary content',
      table: {
        category: 'Avatar',
      },
      control: {
        type: 'text',
      },
    },
    altText: {
      description: 'Alternative text for accessibility and fallback',
      table: {
        category: 'Accessibility',
      },
      control: {
        type: 'text',
      },
    },
    size: {
      description: 'Defines the size of the avatar',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    fallback: {
      description:
        'Fallback content shown when the image is unavailable (e.g. initials)',
      table: {
        category: 'Fallback',
      },
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<AvatarProps>

type AvatarStory = StoryObj<AvatarProps>

export const Basic: AvatarStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story:
          'A basic avatar displaying a profile picture or fallback initials.',
      },
    },
  },
}
