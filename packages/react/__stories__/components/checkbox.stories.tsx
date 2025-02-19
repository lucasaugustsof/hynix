import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import {
  // expect,
  // userEvent,
  // within,
  fn,
} from '@storybook/test'

import { Checkbox, type CheckboxProps } from '@/registry/components/checkbox'

const meta: Meta<CheckboxProps> = {
  title: 'components/Checkbox',
  component: ({ ...args }) => (
    <Checkbox {...args} data-testid="checkbox-component" aria-label="Label" />
  ),
  args: {
    size: 'md',
    disabled: false,
    labelText: '',
    labelDirection: 'left',
    onCheckedChange: action('Call to onCheckedChange'),
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description:
        'Sets the size of the checkbox. It can be small (sm), medium (md) or large (lg).',
      table: {
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction with the checkbox.',
      table: {
        category: 'State',
      },
    },
    labelText: {
      control: 'text',
      description: 'Sets the label text associated with the checkbox.',
      table: {
        category: 'Content',
      },
    },
    labelDirection: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description:
        'Defines the position of the label in relation to the checkbox. It can be on the left or right.',
      table: {
        category: 'Content',
      },
    },
    onCheckedChange: {
      control: false,
      table: {
        category: 'Callback',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Basic: StoryObj<CheckboxProps> = {
  args: {
    onCheckedChange: fn(),
  },
  // play: async ({ canvasElement, args }) => {
  //   const canvas = within(canvasElement)

  //   const sut = canvas.getByTestId('checkbox-component')

  //   await userEvent.click(sut)

  //   expect(args.onCheckedChange).toHaveBeenCalledWith({
  //     checked: true,
  //   })
  // },
}

export const Indeterminate: StoryObj<CheckboxProps> = {
  args: {
    checked: 'indeterminate',
  },
  argTypes: {
    checked: {
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
}

export const Controlled: StoryObj<CheckboxProps> = {
  args: {
    checked: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description:
        'Indicates whether the checkbox is checked (true) or unchecked (false).',
      table: {
        category: 'State',
      },
    },
  },
}
