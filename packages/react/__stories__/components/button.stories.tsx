import type { Meta, StoryObj } from '@storybook/react'
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiGithubFill,
  RiGoogleFill,
  RiAppleFill,
  RiTwitterXFill,
  RiFacebookFill,
  RiMicrosoftFill,
} from '@remixicon/react'

import { PreviewComponent } from '@repo/sb-shared/components'
import { replaceAliasWithRawImport } from '@repo/sb-shared/utilities'

import { Button, type ButtonProps } from '@r/components/button'
import ButtonRaw from '@r/components/button?raw'

const meta: Meta<ButtonProps> = {
  title: 'components/Button',
  component: Button,
  parameters: {
    docs: {
      codePanel: true,
      source: {
        code: replaceAliasWithRawImport(ButtonRaw),
        language: 'tsx',
      },
    },
  },
}

export default meta

type ButtonStory = StoryObj<ButtonProps>

export const Basic: ButtonStory = {
  name: 'Basic',
  decorators: [
    Story => (
      <PreviewComponent title="Basic Button">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => <Button>Button</Button>,
}

export const WithLeftIcon: ButtonStory = {
  name: 'With Left Icon',
  decorators: [
    Story => (
      <PreviewComponent title="With Left Icon">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <Button>
      <RiArrowLeftLine />
      Button
    </Button>
  ),
}

export const WithRightIcon: ButtonStory = {
  name: 'With Right Icon',
  decorators: [
    Story => (
      <PreviewComponent title="With Right Icon">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <Button>
      Button
      <RiArrowRightLine />
    </Button>
  ),
}

export const IconOnly: ButtonStory = {
  name: 'Icon Only',
  decorators: [
    Story => (
      <PreviewComponent title="Icon Only">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-x-4">
      <Button aria-label="Left" iconOnly>
        <RiArrowLeftLine />
      </Button>
      <Button aria-label="Right" iconOnly>
        <RiArrowRightLine />
      </Button>
    </div>
  ),
}

export const Variants: ButtonStory = {
  name: 'Variants',
  decorators: [
    Story => (
      <PreviewComponent title="Variants">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-x-4">
      {(['primary', 'secondary', 'ghost', 'destructive'] as const).map(
        variant => (
          <Button key={variant} variant={variant}>
            Button
          </Button>
        ),
      )}
    </div>
  ),
}

export const Sizes: ButtonStory = {
  name: 'Sizes',
  decorators: [
    Story => (
      <PreviewComponent title="Sizes">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="flex items-center gap-x-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Button key={size} size={size}>
          Button
        </Button>
      ))}
    </div>
  ),
}

export const Disabled: ButtonStory = {
  name: 'Disabled',
  decorators: [
    Story => (
      <PreviewComponent title="Disabled">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => <Button disabled>Button</Button>,
}

export const FullWidth: ButtonStory = {
  name: 'Full Width',
  decorators: [
    Story => (
      <PreviewComponent title="Full Width">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => <Button className="w-full">Button</Button>,
}

export const SocialLogins: ButtonStory = {
  name: 'Social Logins',
  decorators: [
    Story => (
      <PreviewComponent title="Social Logins">
        <Story />
      </PreviewComponent>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="secondary">
        <RiGithubFill />
        Sign in with GitHub
      </Button>

      <Button variant="secondary">
        <RiGoogleFill />
        Sign in with Google
      </Button>

      <Button variant="secondary">
        <RiAppleFill />
        Sign in with Apple
      </Button>

      <Button variant="secondary">
        <RiTwitterXFill />
        Sign in with Twitter
      </Button>

      <Button variant="secondary">
        <RiFacebookFill />
        Sign in with Facebook
      </Button>

      <Button variant="secondary">
        <RiMicrosoftFill />
        Sign in with Microsoft
      </Button>
    </div>
  ),
}
