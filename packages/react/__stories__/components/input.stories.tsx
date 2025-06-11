import type { Meta, StoryObj } from '@storybook/react'

import { RiSearchLine, RiEyeLine } from '@remixicon/react'

import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import { Input, type InputProps } from '@r/components/input'
import InputRaw from '@r/components/input?raw'

const meta: Meta<InputProps> = {
  title: 'components/Input',
  component: Input,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(InputRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type InputStory = StoryObj<InputProps>

export const Basic: InputStory = {
  name: 'Basic',
  render: () => <Input placeholder="Enter your email" />,
}

export const Sizes: InputStory = {
  name: 'Sizes',
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const WithPrefix: InputStory = {
  name: 'With Prefix (Icon)',
  render: () => (
    <Input prefix={<RiSearchLine />} placeholder="Search products" />
  ),
}

export const WithSuffix: InputStory = {
  name: 'With Suffix (Icon)',
  render: () => (
    <Input
      type="password"
      suffix={<RiEyeLine />}
      placeholder="Enter password"
    />
  ),
}

export const WithBothAddon: InputStory = {
  name: 'With Prefix and Suffix (Text)',
  render: () => (
    <Input
      prefix="@"
      suffix=".com"
      prefixStyling
      suffixStyling
      placeholder="yourname"
    />
  ),
}

export const Invalid: InputStory = {
  name: 'Invalid State',
  render: () => <Input invalid placeholder="This field is invalid" />,
}

export const UsernamePrefix: InputStory = {
  name: 'With Prefix (Text)',
  render: () => <Input prefix="@" placeholder="yourname" />,
}

export const EmailSuffix: InputStory = {
  name: 'With Suffix (Text)',
  render: () => <Input suffix="@gmail.com" placeholder="username" />,
}

export const SearchIconPrefix: InputStory = {
  name: 'Search Example',
  render: () => <Input prefix={<RiSearchLine />} placeholder="Search..." />,
}

export const Disabled: InputStory = {
  name: 'Disabled',
  render: () => <Input disabled placeholder="This field is disabled" />,
}
