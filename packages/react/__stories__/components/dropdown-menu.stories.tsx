import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import {
  DropdownMenu,
  type DropdownMenuProps,
} from '@r/components/dropdown-menu'
import { Button } from '@r/components/button'
import { Kbd } from '@r/components/kbd'

import { RiEditLine } from '@remixicon/react'

const meta: Meta<DropdownMenuProps> = {
  title: 'components/DropdownMenu',
  component(args) {
    return (
      <DropdownMenu.Root {...args}>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary" size="sm">
            Edit
            <RiEditLine />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item value="new-file" suffix={<Kbd size="sm">⌘N</Kbd>}>
            New File
          </DropdownMenu.Item>

          <DropdownMenu.Item
            value="new-window"
            suffix={<Kbd size="sm">⇧⌘N</Kbd>}
          >
            New Window
          </DropdownMenu.Item>

          <DropdownMenu.Item value="open" suffix={<Kbd size="sm">⌘O</Kbd>}>
            Open...
          </DropdownMenu.Item>

          <DropdownMenu.Item value="save" suffix={<Kbd size="sm">⌘S</Kbd>}>
            Save
          </DropdownMenu.Item>

          <DropdownMenu.Item value="save-as" suffix={<Kbd size="sm">⇧⌘S</Kbd>}>
            Save As...
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  },
  args: {
    onOpenChange: fn(),
    onSelect: fn(),
  },
  argTypes: {
    onOpenChange: {
      control: false,
    },
    onSelect: {
      control: false,
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type DropdownMenuStory = StoryObj<DropdownMenuProps>

export const Default: DropdownMenuStory = {}
