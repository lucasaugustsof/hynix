import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '@/components/avatar'
import { Badge } from '@/components/badge'
import { ContentLabel, type ContentLabelProps } from '@/components/content-label'

export default {
  title: 'Components/Data Display/ContentLabel',
  component: ContentLabel,
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Size of the label',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    editLabel: {
      control: 'text',
      description: 'The main label text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    editSublabel: {
      control: 'text',
      description: 'Optional secondary label text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    editDescription: {
      control: 'text',
      description: 'The description text for the label',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    startSlot: {
      control: false,
      description: 'Content to render before the label',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    endSlot: {
      control: false,
      description: 'Content to render after the label',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  args: {
    size: 'md',
    editLabel: 'Label',
    editSublabel: '(Sublabel)',
    editDescription: 'Insert the content description here.',
  },
} satisfies Meta<ContentLabelProps>

type ContentLabelStory = StoryObj<ContentLabelProps>

export const Default: ContentLabelStory = {
  args: {
    editLabel: 'Lucas Augusto',
    editSublabel: '(Developer)',
    editDescription: 'Full-stack developer with expertise in React and TypeScript.',
  },
}

export const AllSizes: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with expertise in React and TypeScript."
      />
      <ContentLabel
        size="lg"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with expertise in React and TypeScript."
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithoutSublabel: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editDescription="Full-stack developer with expertise in React and TypeScript."
      />
      <ContentLabel
        size="lg"
        editLabel="Lucas Augusto"
        editDescription="Full-stack developer with expertise in React and TypeScript."
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithAvatar: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with expertise in React and TypeScript."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
            <Avatar.Fallback>LA</Avatar.Fallback>
          </Avatar.Root>
        }
      />
      <ContentLabel
        size="lg"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with expertise in React and TypeScript."
        startSlot={
          <Avatar.Root size="48">
            <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
            <Avatar.Fallback>LA</Avatar.Fallback>
          </Avatar.Root>
        }
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithBadge: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editDescription="Full-stack developer with expertise in React and TypeScript."
        endSlot={
          <Badge.Root variant="lighter" color="blue">
            Developer
          </Badge.Root>
        }
      />
      <ContentLabel
        size="lg"
        editLabel="Lucas Augusto"
        editDescription="Full-stack developer with expertise in React and TypeScript."
        endSlot={
          <Badge.Root variant="lighter" color="green">
            Active
          </Badge.Root>
        }
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const MultipleVariants: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="John Doe"
        editDescription="Product Manager at Tech Corp with 5 years of experience."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="John Doe" />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
        }
        endSlot={
          <Badge.Root variant="lighter" color="purple">
            Manager
          </Badge.Root>
        }
      />

      <ContentLabel
        size="md"
        editLabel="Jane Smith"
        editSublabel="(Designer)"
        editDescription="UX/UI Designer specializing in design systems and user research."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://i.pravatar.cc/150?img=47" alt="Jane Smith" />
            <Avatar.Fallback>JS</Avatar.Fallback>
          </Avatar.Root>
        }
        endSlot={
          <Badge.Root variant="lighter" color="pink">
            Designer
          </Badge.Root>
        }
      />

      <ContentLabel
        size="md"
        editLabel="Bob Johnson"
        editSublabel="(Senior Engineer)"
        editDescription="Backend engineer with expertise in distributed systems and cloud architecture."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://i.pravatar.cc/150?img=33" alt="Bob Johnson" />
            <Avatar.Fallback>BJ</Avatar.Fallback>
          </Avatar.Root>
        }
        endSlot={
          <Badge.Root variant="lighter" color="orange">
            Senior
          </Badge.Root>
        }
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithAvatarStatus: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editDescription="Full-stack developer with expertise in React and TypeScript."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
            <Avatar.Fallback>LA</Avatar.Fallback>
            <Avatar.Positioner>
              <Avatar.Status type="online" />
            </Avatar.Positioner>
          </Avatar.Root>
        }
      />
      <ContentLabel
        size="md"
        editLabel="John Doe"
        editDescription="Product Manager at Tech Corp with 5 years of experience."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://i.pravatar.cc/150?img=12" alt="John Doe" />
            <Avatar.Fallback>JD</Avatar.Fallback>
            <Avatar.Positioner>
              <Avatar.Status type="busy" />
            </Avatar.Positioner>
          </Avatar.Root>
        }
      />
      <ContentLabel
        size="md"
        editLabel="Jane Smith"
        editDescription="UX/UI Designer specializing in design systems and user research."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://i.pravatar.cc/150?img=47" alt="Jane Smith" />
            <Avatar.Fallback>JS</Avatar.Fallback>
            <Avatar.Positioner>
              <Avatar.Status type="away" />
            </Avatar.Positioner>
          </Avatar.Root>
        }
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const LongDescription: ContentLabelStory = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ContentLabel
        size="md"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with extensive expertise in React, TypeScript, Node.js, and modern web technologies. Passionate about creating accessible and performant user interfaces."
        startSlot={
          <Avatar.Root size="40">
            <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
            <Avatar.Fallback>LA</Avatar.Fallback>
          </Avatar.Root>
        }
      />
      <ContentLabel
        size="lg"
        editLabel="Lucas Augusto"
        editSublabel="(Developer)"
        editDescription="Full-stack developer with extensive expertise in React, TypeScript, Node.js, and modern web technologies. Passionate about creating accessible and performant user interfaces that delight users."
        startSlot={
          <Avatar.Root size="48">
            <Avatar.Image src="https://github.com/lucasaugustsof.png" alt="Lucas Augusto" />
            <Avatar.Fallback>LA</Avatar.Fallback>
          </Avatar.Root>
        }
      />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
}
