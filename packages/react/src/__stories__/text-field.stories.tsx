import type { Meta, StoryObj } from '@storybook/react'

import { RiAccountBox2Line, RiUser2Line } from '@remixicon/react'
import { TextField, type TextFieldProps } from '../components/text-field'

export default {
  title: 'components/TextField',
  component: ({ ...args }) => {
    return (
      <TextField
        startElement={<RiUser2Line />}
        endElement={<RiAccountBox2Line />}
        {...args}
      >
        <TextField.Input />
      </TextField>
    )
  },
  args: {
    disabled: false,
    invalid: false,
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<TextFieldProps>

export const Basic: StoryObj = {}
