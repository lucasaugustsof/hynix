import type { Meta, StoryObj } from '@storybook/react'

type TextProps = {
  size: 'sm' | 'md' | 'lg'
}

type TextStory = StoryObj<TextProps>

const meta: Meta<TextProps> = {
  title: 'typography/Text',
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description:
        'Controls the font size and line height of the text element. Each size maps to a specific typography scale defined in the design system.',
      table: {
        category: 'Appearance',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['new'],
  decorators: [Story => <div className="max-w-70">{Story()}</div>],
}

export const Title: TextStory = {
  render({ size }) {
    return (
      <>
        <h1 data-typography="title" data-size={size}>
          Title Placeholder
        </h1>
      </>
    )
  },
}

export const Body: TextStory = {
  render({ size }) {
    return (
      <>
        <p data-typography="body" data-size={size}>
          Placeholder for body text Enter text into this container
        </p>
      </>
    )
  },
}

export const Caption: TextStory = {
  render({ size }) {
    return (
      <>
        <span data-typography="caption" data-size={size}>
          Caption
        </span>
      </>
    )
  },
}

export const Tagline: TextStory = {
  render({ size }) {
    return (
      <>
        <span data-typography="tagline" data-size={size}>
          TAGLINE
        </span>
      </>
    )
  },
}

export default meta
