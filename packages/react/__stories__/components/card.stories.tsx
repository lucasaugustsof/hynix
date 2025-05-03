import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from '@r/components/badge'
import { Button } from '@r/components/button'
import { Card, type CardProps } from '@r/components/card'

import { RiDiscountPercentLine, RiShoppingBag4Line } from '@remixicon/react'

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component(args) {
    const { size } = args
    const actionButtonSize = size === 'lg' ? 'md' : 'sm'

    return (
      <Card.Root {...args}>
        <Card.Body>
          <Card.Title>Collaborate with your team</Card.Title>

          <Card.Description>
            Stay connected and design seamlessly with your team in a unified
            workspace. Get feedback, iterate, and launch faster.
          </Card.Description>
        </Card.Body>

        <Card.Footer>
          <Button size={actionButtonSize}>Get Started</Button>

          <Button variant="secondary" size={actionButtonSize}>
            Learn More
          </Button>
        </Card.Footer>
      </Card.Root>
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

export const Basic: CardStory = {}

export const ProductCard: CardStory = {
  argTypes: {
    size: {
      control: false,
    },
  },
  render(args) {
    const productImageUrl =
      'https://images.unsplash.com/photo-1599669454515-1b2e0173f302?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
      <Card.Root
        {...args}
        className="rounded-[calc(var(--radius-xl)_+_--spacing(4))]"
      >
        <figure className="group overflow-hidden rounded-t-xl border">
          <img
            className="h-auto w-full object-cover transition-transform duration-200 ease-out-quad group-hover:scale-102"
            src={productImageUrl}
            alt="Black wireless headphones resting on a wooden desk"
          />
        </figure>

        <Card.Body>
          <hgroup className="space-y-3">
            <Badge variant="success" active>
              <RiDiscountPercentLine />
              20% OFF
            </Badge>
            <Card.Title>Nova Pro Wireless Headphones</Card.Title>
          </hgroup>

          <Card.Description>
            High-fidelity sound. Sleek design. Up to 40 hours of battery life
            and adaptive noise cancellation for uninterrupted listening —
            anywhere.
          </Card.Description>
        </Card.Body>

        <Card.Footer className="mt-8 flex items-center justify-between">
          <strong className="font-sans text-fg-1 text-xl/8 tabular-nums">
            $199.99
          </strong>

          <div className="inline-flex items-center gap-2">
            <Button size="sm">
              <RiShoppingBag4Line />
              Shop Now
            </Button>

            <Button variant="secondary" size="sm">
              Add to Wishlist
            </Button>
          </div>
        </Card.Footer>
      </Card.Root>
    )
  },
}
