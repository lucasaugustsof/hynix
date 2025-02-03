import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { Input, type InputProps } from '@/registry/components/inputs/input'
import { InputGroup } from '@/registry/components/inputs/input-group'

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

type ArgumentType<T> = T & {
  'data-invalid': boolean
}

const meta: Meta<InputProps> = {
  title: 'components/Inputs/Input',
  component: Input,
  args: {
    size: 'md',
    placeholder: 'Enter text here',
    disabled: false,
    onChange: action('onChange event was called'),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Sets the input size (small, medium, or large).',
      table: {
        category: 'Appearance',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Text displayed when the input is empty.',
      table: {
        category: 'Content',
        defaultValue: {
          summary: '""',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input, preventing user interaction.',
      table: {
        category: 'State',
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called when the input value changes.',
      table: {
        category: 'Events',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: StoryObj<InputProps> = {
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByRole('textbox')

    await userEvent.type(sut, 'Typed text')

    expect(args.onChange).toBeCalled()
  },
}

export const WithPrefix: StoryObj<InputProps> = {
  render({ placeholder, ...args }) {
    return (
      <InputGroup {...args} prefixElement={<RiArrowLeftLine />}>
        <Input placeholder={placeholder} />
      </InputGroup>
    )
  },
}

export const WithSuffix: StoryObj<InputProps> = {
  render({ placeholder, ...args }) {
    return (
      <InputGroup {...args} suffixElement={<RiArrowRightLine />}>
        <Input placeholder={placeholder} />
      </InputGroup>
    )
  },
}

export const Disabled: StoryObj<InputProps> = {
  args: {
    onFocus: fn(),
    disabled: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
    onFocus: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByRole('textbox')

    await userEvent.click(sut)

    expect(sut.ariaDisabled).toBeTruthy()
    expect(args.onFocus).not.toHaveBeenCalled()
  },
}

export const Invalid: StoryObj<ArgumentType<InputProps>> = {
  args: {
    'data-invalid': true,
    disabled: false,
  },
  argTypes: {
    'data-invalid': {
      control: false,
      table: {
        disable: true,
      },
    },
    disabled: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const sut = canvas.getByRole('textbox')

    expect(sut).toHaveAttribute('data-invalid')
  },
}
