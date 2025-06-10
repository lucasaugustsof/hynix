import type { Meta, StoryObj } from '@storybook/react'
import { RiCheckLine, RiAlertLine, RiErrorWarningLine } from '@remixicon/react'

import { PreviewComponent } from '@repo/sb-shared/components'
import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import { Badge, type BadgeProps } from '@r/components/badge'
import BadgeRaw from '@r/components/badge?raw'

const meta: Meta = {
  title: 'components/Badge',
  component: Badge,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(BadgeRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type BadgeStory = StoryObj<BadgeProps>

export const Basic: BadgeStory = {
  name: 'Basic',
  decorators: [
    Story => (
      <PreviewComponent title="Basic Badge">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => <Badge>Badge</Badge>,
}

export const Variants: BadgeStory = {
  name: 'Variants',
  decorators: [
    Story => (
      <PreviewComponent title="Variants">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
}

export const WithIcons: BadgeStory = {
  name: 'With Icons',
  decorators: [
    Story => (
      <PreviewComponent title="With Icons">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success">
        <RiCheckLine />
        Success
      </Badge>
      <Badge variant="warning">
        <RiAlertLine />
        Warning
      </Badge>
      <Badge variant="danger">
        <RiErrorWarningLine />
        Danger
      </Badge>
    </div>
  ),
}

export const ActiveState: BadgeStory = {
  name: 'Active State',
  decorators: [
    Story => (
      <PreviewComponent title="Active State">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex gap-2">
      <Badge active>Active</Badge>
      <Badge variant="success" active>
        Success
      </Badge>
      <Badge variant="warning" active>
        Warning
      </Badge>
      <Badge variant="danger" active>
        Danger
      </Badge>
    </div>
  ),
}
