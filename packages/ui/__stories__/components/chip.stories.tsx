import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiCheckboxCircleFill } from '@remixicon/react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'

import * as Chip from '@r/components/chip'
import type { ChipProps } from '@r/components/chip'

import { Avatar } from '@r/components/avatar'

import { cn } from '@r/utilities/cn'

export default {
  title: 'components/Chip',
  component: Chip.Root,
  tags: ['autodocs'],
  args: {
    children: 'Label',
    size: 'md',
    isActive: false,
  },
  argTypes: {
    size: {
      description: 'Controls the size of the chip.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    isActive: {
      description: 'Visually highlights the chip as active.',
      table: {
        category: 'State',
      },
      control: {
        type: 'boolean',
      },
    },
    children: {
      description:
        'Defines the inner content of the chip including text and optional delete trigger.',
      table: {
        category: 'Data',
      },
      control: 'text',
    },
  },
} satisfies Meta<ChipProps>

type ChipStory = StoryObj<ChipProps>

export const Basic: ChipStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the Chip component with a text label and a delete action.',
      },
    },
  },
  render: args => (
    <Chip.Root>
      <Chip.Text>{args.children}</Chip.Text>
      <Chip.DeleteTrigger onClick={() => alert('Chip deleted')} />
    </Chip.Root>
  ),
}

export const ActiveChip: ChipStory = {
  name: 'Active Chip',
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    isActive: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'An example of an active chip used to highlight a selected state such as an active filter.',
      },
    },
    controls: {
      exclude: ['children', 'isActive'],
    },
  },
  render: args => (
    <Chip.Root {...args} isActive>
      <Chip.Text>Selected Tag</Chip.Text>
      <Chip.DeleteTrigger onClick={() => alert('Tag removed')} />
    </Chip.Root>
  ),
}

export const TagWithoutDelete: ChipStory = {
  name: 'Tag Without Delete',
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'A read-only chip typically used in passive displays like labels or badges without user interaction.',
      },
    },
  },
  render: args => (
    <Chip.Root {...args}>
      <Chip.Text>Readonly</Chip.Text>
    </Chip.Root>
  ),
}

export const WithAvatar: ChipStory = {
  name: 'With Avatar',
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    size: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Represents assigned users in a task manager or chat participant list using avatars and names.',
      },
    },
    controls: {
      exclude: ['size', 'children'],
    },
  },
  render: args => (
    <div className="flex flex-col gap-2">
      <Chip.Root {...args} className="py-0.5 pl-0.5">
        <Avatar
          src="https://randomuser.me/api/portraits/men/1.jpg"
          altText="John Doe"
          fallback="JD"
          size="md"
        />
        <Chip.Text>John Doe</Chip.Text>
        <Chip.DeleteTrigger />
      </Chip.Root>

      <Chip.Root {...args} className="py-0.5 pl-0.5">
        <Avatar
          src="https://randomuser.me/api/portraits/women/2.jpg"
          altText="Jane Smith"
          fallback="JS"
          size="md"
        />
        <Chip.Text>Jane Smith</Chip.Text>
        <Chip.DeleteTrigger />
      </Chip.Root>

      <Chip.Root {...args} className="py-0.5 pl-0.5">
        <Avatar
          src="https://randomuser.me/api/portraits/men/3.jpg"
          altText="Robert Johnson"
          fallback="RJ"
          size="md"
        />
        <Chip.Text>Robert Johnson</Chip.Text>
        <Chip.DeleteTrigger />
      </Chip.Root>
    </div>
  ),
}

export const WithAnimation: ChipStory = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the Chip component in a multi-option selection scenario with animated transitions using Motion. When a chip is selected, it visually highlights with animated layout changes and an icon, simulating a dynamic and interactive filter or category selection behavior.',
      },
    },
    controls: {
      disable: true,
    },
  },
  render: () => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry']
    const [selectedFruit, setSelectedFruit] = React.useState(fruits[0])

    return (
      <MotionConfig
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.2,
        }}
      >
        <div className="flex flex-wrap items-center gap-3">
          {fruits.map(fruit => {
            const isSelected = selectedFruit === fruit

            return (
              <Chip.Root
                key={fruit}
                className={cn(
                  'cursor-pointer',
                  isSelected &&
                    'inset-ring-highlight/20 bg-highlight/10 hover:bg-highlight/10',
                )}
                onClick={() => {
                  setSelectedFruit(isSelected ? '' : fruit)
                }}
                asChild
              >
                <motion.div
                  layout
                  layoutId={`chip-container-${fruit}`}
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="flex items-center px-4 py-2"
                >
                  <Chip.Text
                    className={cn(
                      'select-none whitespace-nowrap',
                      isSelected && 'text-highlight',
                    )}
                    asChild
                  >
                    <motion.span layout layoutId={`text-${fruit}`}>
                      {fruit}
                    </motion.span>
                  </Chip.Text>

                  <motion.div
                    className="grid place-items-center"
                    animate={{
                      width: isSelected ? 'auto' : 0,
                      opacity: isSelected ? 1 : 0,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.2,
                        delay: isSelected ? 0.1 : 0,
                      },
                    }}
                    layout
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isSelected && (
                        <motion.div
                          key={`icon-${fruit}-${isSelected}`}
                          initial={{
                            scale: 0.6,
                            x: -12,
                          }}
                          animate={{
                            scale: 1,
                            x: 0,
                          }}
                          exit={{
                            scale: 0.6,
                            x: -12,
                          }}
                          transition={{
                            scale: {
                              duration: 0.2,
                            },
                          }}
                        >
                          <RiCheckboxCircleFill className="fill-highlight" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </Chip.Root>
            )
          })}
        </div>
      </MotionConfig>
    )
  },
}
