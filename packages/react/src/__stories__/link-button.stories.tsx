import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiArrowLeftSLine, RiArrowRightSLine, RiExternalLinkLine } from '@remixicon/react'
import { LinkButton, type LinkButtonRootProps } from '@/components/link-button'

export default {
  title: 'Components/Actions/LinkButton',
  component: LinkButton.Root,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the link button affecting text and icon size',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'sm',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the link button, preventing navigation and interaction',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    href: {
      control: 'text',
      description: 'URL for the link',
      table: {
        category: 'Navigation',
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      control: 'text',
      description: 'Link button content (text, icons, or any React node)',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  args: {
    children: 'Link Button',
    size: 'sm',
    disabled: false,
    href: '#',
  },
} satisfies Meta<LinkButtonRootProps>

type LinkButtonStory = StoryObj<LinkButtonRootProps>

export const Default: LinkButtonStory = {
  args: {
    children: 'Link Button',
    href: '#',
  },
}

export const AllSizes: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Small Link
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Medium Link
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithLeftIcon: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Go Back
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Go Back
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithRightIcon: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#">
          Continue
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#">
          Continue
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const WithBothIcons: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Link Button
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#">
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Link Button
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const ExternalLink: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="https://example.com" target="_blank" rel="noopener">
          External Link
          <LinkButton.Icon asChild>
            <RiExternalLinkLine />
          </LinkButton.Icon>
        </LinkButton.Root>

        <LinkButton.Root size="md" href="https://example.com" target="_blank" rel="noopener">
          External Link
          <LinkButton.Icon asChild>
            <RiExternalLinkLine />
          </LinkButton.Icon>
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const DisabledState: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#" disabled>
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Disabled Link
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#" disabled>
          <LinkButton.Icon asChild>
            <RiArrowLeftSLine />
          </LinkButton.Icon>
          Disabled Link
          <LinkButton.Icon asChild>
            <RiArrowRightSLine />
          </LinkButton.Icon>
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const TextOnly: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-wrap items-center gap-6">
        <LinkButton.Root size="sm" href="#">
          Simple Link
        </LinkButton.Root>

        <LinkButton.Root size="md" href="#">
          Simple Link
        </LinkButton.Root>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}

export const Variations: LinkButtonStory = {
  render() {
    return (
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <span className="font-medium text-fg-1 text-sm">Navigation Links</span>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton.Root href="#">
              <LinkButton.Icon asChild>
                <RiArrowLeftSLine />
              </LinkButton.Icon>
              Back
            </LinkButton.Root>

            <LinkButton.Root href="#">
              Next
              <LinkButton.Icon asChild>
                <RiArrowRightSLine />
              </LinkButton.Icon>
            </LinkButton.Root>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="font-medium text-fg-1 text-sm">External Links</span>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton.Root href="https://example.com" target="_blank" rel="noopener">
              Documentation
              <LinkButton.Icon asChild>
                <RiExternalLinkLine />
              </LinkButton.Icon>
            </LinkButton.Root>

            <LinkButton.Root href="https://example.com" target="_blank" rel="noopener">
              GitHub
              <LinkButton.Icon asChild>
                <RiExternalLinkLine />
              </LinkButton.Icon>
            </LinkButton.Root>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="font-medium text-fg-1 text-sm">Text Only</span>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton.Root href="#">Learn more</LinkButton.Root>
            <LinkButton.Root href="#">View details</LinkButton.Root>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="font-medium text-fg-1 text-sm">Disabled State</span>
          <div className="flex flex-wrap items-center gap-4">
            <LinkButton.Root href="#" disabled>
              <LinkButton.Icon asChild>
                <RiArrowLeftSLine />
              </LinkButton.Icon>
              Can't click
            </LinkButton.Root>

            <LinkButton.Root href="#" disabled>
              Unavailable
            </LinkButton.Root>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
}
