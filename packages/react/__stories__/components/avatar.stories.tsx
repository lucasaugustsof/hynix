import type { Meta, StoryObj } from '@storybook/react'

import {
  Avatar,
  type AvatarProps,
  getInitialLetters,
} from '@r/components/avatar'

const meta: Meta<AvatarProps> = {
  title: 'components/Avatar',
  component: Avatar,
  args: {
    src: 'https://i.pravatar.cc/300',
    altText: 'John Doe',
    fallback: getInitialLetters('John Doe'),
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Controls the size of the avatar',
      table: {
        category: 'Visual',
      },
    },
    src: {
      control: 'text',
      description: 'The source URL of the avatar image',
      table: {
        category: 'Content',
      },
    },
    altText: {
      control: 'text',
      description: 'Alternative text for the image (used for accessibility)',
      table: {
        category: 'Content',
      },
    },
    fallback: {
      control: 'text',
      description: 'Fallback text to display when the image is not available',
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type AvatarStory = StoryObj<AvatarProps>

export const Basic: AvatarStory = {}

export const Fallback: AvatarStory = {
  args: {
    src: '',
  },
  argTypes: {
    src: {
      control: false,
    },
  },
}
