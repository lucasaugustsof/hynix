import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/button'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFileCopyLine,
} from '@remixicon/react'

export default {
  title: 'components/Button',
  component: Button,
} satisfies Meta

export const Basic: StoryObj = {
  render: () => (
    <Button size="2xs">
      <RiArrowLeftSLine />
      Button
      <RiArrowRightSLine />
    </Button>
  ),
}

export const IconOnly: StoryObj = {
  render: () => (
    <Button iconOnly>
      <RiFileCopyLine />
    </Button>
  ),
}
