import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton, type SkeletonProps } from '@r/components/skeleton'

const meta: Meta<SkeletonProps> = {
  title: 'components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type SkeletonStory = StoryObj<SkeletonProps>

export const Default: SkeletonStory = {
  args: {
    shape: 'square',
  },
  argTypes: {
    shape: {
      name: 'Shape',
      control: 'inline-radio',
      options: ['square', 'circle'],
      table: {
        category: 'Layout',
      },
      description:
        'Use "square" for rectangular blocks and "circle" for circular elements, such as avatars or icons.',
    },
  },
}

export const ContentPlaceholder: SkeletonStory = {
  argTypes: {
    shape: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  render() {
    return (
      <article className="w-90 space-y-4 *:w-full">
        <header>
          <Skeleton className="mb-3 h-50 w-full" />

          <div className="flex-1 space-y-3 *:h-4 *:w-full *:last:w-65">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </header>

        <div className="flex items-center gap-4">
          <Skeleton shape="circle" className="size-15" />

          <div className="flex-1 space-y-3 *:h-4 *:w-full *:last:w-65">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </article>
    )
  },
}
