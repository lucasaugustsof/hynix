import type { Meta, StoryObj } from '@storybook/react'

import {
  TextField,
  type TextFieldProps,
} from '@/registry/components/text-field'

import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react'

export default {
  title: 'components/TextField',
  component: ({ ...args }) => {
    return (
      <TextField {...args}>
        <TextField.Label>Label</TextField.Label>
        <TextField.Input placeholder="E-mail" />

        <TextField.HelperText>Please enter your E-Mail</TextField.HelperText>
      </TextField>
    )
  },
  args: {
    size: 'md',
    errorText: 'Required field',
    disabled: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Sets the size of the text field.',
    },
    errorText: {
      description: 'Sets the error message to display below the input field.',
    },
    disabled: {
      description:
        'Disables the text field, making it non-editable and non-interactive.',
    },
    invalid: {
      description:
        'Indicates if the input field is in an invalid state, often used for form validation.',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<TextFieldProps>

export const Basic: StoryObj<TextFieldProps> = {}

export const WithoutHelperText: StoryObj<TextFieldProps> = {
  render({ ...args }) {
    return (
      <TextField {...args}>
        <TextField.Label>Label</TextField.Label>

        <TextField.Input placeholder="E-mail" />
      </TextField>
    )
  },
}

export const WithLeftIcon: StoryObj<TextFieldProps> = {
  render({ ...args }) {
    return (
      <TextField {...args}>
        <TextField.Label>Label</TextField.Label>

        <TextField.Input
          placeholder="E-mail"
          leftElement={<RiArrowLeftLine />}
        />

        <TextField.HelperText>Please enter your E-Mail</TextField.HelperText>
      </TextField>
    )
  },
}

export const WithRightIcon: StoryObj<TextFieldProps> = {
  render({ ...args }) {
    return (
      <TextField {...args}>
        <TextField.Label>Label</TextField.Label>

        <TextField.Input
          placeholder="E-mail"
          rightElement={<RiArrowRightLine />}
        />

        <TextField.HelperText>Please enter your E-Mail</TextField.HelperText>
      </TextField>
    )
  },
}

export const WithBothIcon: StoryObj<TextFieldProps> = {
  render({ ...args }) {
    return (
      <TextField {...args}>
        <TextField.Label>Label</TextField.Label>

        <TextField.Input
          placeholder="E-mail"
          leftElement={<RiArrowLeftLine />}
          rightElement={<RiArrowRightLine />}
        />

        <TextField.HelperText>Please enter your E-Mail</TextField.HelperText>
      </TextField>
    )
  },
}
