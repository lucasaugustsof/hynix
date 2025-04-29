import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@r/components/button'
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  type CardProps,
  CardTitle,
} from '@r/components/card'

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component(args) {
    const { size } = args
    const actionButtonSize = size === 'lg' ? 'md' : 'sm'

    return (
      <Card {...args}>
        <CardBody>
          <CardTitle>Design faster. Together.</CardTitle>

          <CardDescription>
            Bring your team into a real-time collaborative design workspace.
            Sketch, comment, and prototype all in one place.
          </CardDescription>
        </CardBody>

        <CardFooter>
          <Button size={actionButtonSize}>Start for free</Button>

          <Button variant="secondary" size={actionButtonSize}>
            Watch demo
          </Button>
        </CardFooter>
      </Card>
    )
  },
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      description: 'Controls the padding and spacing of the card.',
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'inline-radio',
      },
      table: {
        category: 'Visual',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
}

export default meta

type CardStory = StoryObj<CardProps>

export const Default: CardStory = {}
