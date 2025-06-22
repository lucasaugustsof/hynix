import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton, type SkeletonProps } from '@r/components/skeleton'

const meta: Meta<SkeletonProps> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    shape: 'square',
  },
  argTypes: {
    shape: {
      description: 'Defines the shape of the skeleton element.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['square', 'circle'],
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    'aria-label': {
      description: 'Accessibility label for assistive technologies.',
      table: {
        category: 'Accessibility',
      },
      control: false,
    },
  },
}

export default meta

type SkeletonStory = StoryObj<SkeletonProps>

export const Basic: SkeletonStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A simple skeleton block used to represent loading content.',
      },
    },
  },
}

export const AvatarPlaceholder: SkeletonStory = {
  name: 'Avatar placeholder',
  args: {
    shape: 'circle',
    className: 'w-14 h-14',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Circular skeleton used as a loading placeholder for user avatars.',
      },
    },
  },
}

export const ParagraphPlaceholder: SkeletonStory = {
  name: 'Paragraph placeholder',
  args: {
    className: 'w-full h-4',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Skeleton bar styled to represent a line of text. Can be stacked for paragraphs.',
      },
    },
  },
}

export const ThumbnailPlaceholder: SkeletonStory = {
  name: 'Thumbnail placeholder',
  args: {
    className: 'w-full h-48 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Larger rectangular skeleton used to mimic image or video thumbnails.',
      },
    },
  },
}

export const CardPlaceholder: SkeletonStory = {
  name: 'Card UI placeholder',
  render: () => (
    <div className="w-72 space-y-4 p-4">
      <Skeleton className="h-40 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
  parameters: {
    controls: {
      exclude: ['shape', 'className', 'aria-label'],
    },
    docs: {
      description: {
        story:
          'Example of a skeleton used to represent a loading card with image and text layout.',
      },
    },
  },
}
