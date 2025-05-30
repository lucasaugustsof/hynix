import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button } from '@r/components/button'
import { Kbd } from '@r/components/kbd'
import { Menu, type MenuProps } from '@r/components/menu'

import { RiEditLine } from '@remixicon/react'

const meta: Meta<MenuProps> = {
  title: 'components/Menu',
  component(args) {
    return (
      <Menu.Root {...args}>
        <Menu.Trigger asChild>
          <Button variant="secondary" size="sm">
            Edit
            <RiEditLine />
          </Button>
        </Menu.Trigger>

        <Menu.Content>
          <Menu.Item value="new-file" suffix={<Kbd size="sm">⌘N</Kbd>}>
            New File
          </Menu.Item>

          <Menu.Item value="new-window" suffix={<Kbd size="sm">⇧⌘N</Kbd>}>
            New Window
          </Menu.Item>

          <Menu.Item value="open" suffix={<Kbd size="sm">⌘O</Kbd>}>
            Open...
          </Menu.Item>

          <Menu.Item value="save" suffix={<Kbd size="sm">⌘S</Kbd>}>
            Save
          </Menu.Item>

          <Menu.Item value="save-as" suffix={<Kbd size="sm">⇧⌘S</Kbd>}>
            Save As...
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
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

type DropdownMenuStory = StoryObj<MenuProps>

export const Default: DropdownMenuStory = {}
