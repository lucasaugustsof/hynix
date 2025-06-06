import type { Meta, StoryObj } from '@storybook/react'

import { PreviewComponent } from '@repo/sb-shared/components'
import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import {
  Avatar,
  type AvatarProps,
  getInitialLetters,
} from '@r/components/avatar'

import AvatarRaw from '@r/components/avatar?raw'

const meta: Meta<AvatarProps> = {
  title: 'components/Avatar',
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(AvatarRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type AvatarStory = StoryObj<AvatarProps>

export const Basic: AvatarStory = {
  render: () => (
    <Avatar
      src="https://i.pravatar.cc/300"
      fallback={getInitialLetters('John Doe')}
      altText="John Doe"
    />
  ),
  decorators: [
    Story => (
      <PreviewComponent title="Basic Avatar">
        <Story />
      </PreviewComponent>
    ),
  ],
}

export const Fallback: AvatarStory = {
  render: () => (
    <Avatar
      src=""
      fallback={getInitialLetters('John Doe')}
      altText="John Doe"
    />
  ),
  decorators: [
    Story => (
      <PreviewComponent title="Avatar with Fallback">
        <Story />
      </PreviewComponent>
    ),
  ],
}

export const Sizes: AvatarStory = {
  render: () => (
    <div className="flex items-center gap-x-4">
      <Avatar
        size="sm"
        src="https://i.pravatar.cc/100"
        fallback={getInitialLetters('John Doe')}
        altText="John Doe"
      />
      <Avatar
        size="md"
        src="https://i.pravatar.cc/150"
        fallback={getInitialLetters('John Doe')}
        altText="John Doe"
      />
      <Avatar
        size="lg"
        src="https://i.pravatar.cc/200"
        fallback={getInitialLetters('John Doe')}
        altText="John Doe"
      />
      <Avatar
        size="xl"
        src="https://i.pravatar.cc/250"
        fallback={getInitialLetters('John Doe')}
        altText="John Doe"
      />

      <Avatar
        size="2xl"
        src="https://i.pravatar.cc/300"
        fallback={getInitialLetters('John Doe')}
        altText="John Doe"
      />
    </div>
  ),
  decorators: [
    Story => (
      <PreviewComponent title="Sizes">
        <Story />
      </PreviewComponent>
    ),
  ],
}

export const Persona: AvatarStory = {
  render: () => {
    const personas = [
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
        name: 'Aline Torres',
        email: 'aline.torres@example.com',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
        name: 'Carlos Henrique',
        email: 'carlos.henrique@example.com',
      },
      {
        avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
        name: 'Juliana Prado',
        email: 'juliana.prado@example.com',
      },
    ]

    return (
      <div className="flex flex-col space-y-4">
        {personas.map(({ avatarUrl, name, email }) => (
          <div key={email} className="inline-flex items-center gap-x-4">
            <Avatar
              src={avatarUrl}
              altText={name}
              fallback={getInitialLetters(name)}
            />
            <div className="flex flex-col">
              <span className="mb-px font-medium font-sans text-base text-fg-1">
                {name}
              </span>
              <small className="font-normal font-sans text-fg-1/70 text-sm/5.5">
                {email}
              </small>
            </div>
          </div>
        ))}
      </div>
    )
  },
  decorators: [
    Story => (
      <PreviewComponent title="Persona">
        <Story />
      </PreviewComponent>
    ),
  ],
}
