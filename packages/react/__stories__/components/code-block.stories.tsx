import type { Meta, StoryObj } from '@storybook/react'

import { CodeBlock } from 'registry/components/code-block'

const meta: Meta = {
  title: 'lab/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Default: StoryObj = {}
