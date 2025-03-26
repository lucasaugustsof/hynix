import type { Meta, StoryObj } from '@storybook/react'

import { Kbd, type KbdProps } from 'registry/components/kbd'

type KbdStory = StoryObj<KbdProps>

const meta: Meta<KbdProps> = {
  title: 'typography/Kbd',
  component(args) {
    return (
      <p data-typography="body">
        To open the developer console, press <Kbd {...args}>Ctrl</Kbd> +{' '}
        <Kbd {...args}>Shift</Kbd> + <Kbd {...args}>I</Kbd>
      </p>
    )
  },
  args: {
    children: 'Ctrl',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    children: {
      name: 'Text',
      control: 'text',
      description:
        'The keyboard key or combination of keys to display inside the <Kbd> component.',
      table: {
        category: 'Content',
      },
    },
    variant: {
      name: 'Variant',
      control: 'inline-radio',
      description:
        'Visual style of the component. Allows for different visual treatments depending on usage context.',
      options: ['primary', 'secondary'],
      table: {
        category: 'Appearance',
      },
    },
    size: {
      name: 'Size',
      control: 'inline-radio',
      description:
        'Controls the size (padding and font) of the key representation. Useful for matching typography scale.',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['new'],
}

export const Default: KbdStory = {}

export default meta
