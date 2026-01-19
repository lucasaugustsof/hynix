import type { Meta, StoryObj } from '@storybook/react-vite'

export default {
  title: 'components/Hello',
  component: () => (
    <h1 className="font-sans text-label-xl">The quick brown fox jumps over the lazy dog.</h1>
  ),
} satisfies Meta

export const Default: StoryObj = {}
