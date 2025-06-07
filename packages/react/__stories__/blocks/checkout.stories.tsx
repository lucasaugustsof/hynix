import type { Meta, StoryObj } from '@storybook/react'

import { Checkout01 } from '@r/blocks/checkout/checkout-01'

const meta: Meta = {
  title: 'blocks/Checkout',
  parameters: {
    layout: 'centered',
  },
}

export default meta

export const Layout01: StoryObj = {
  render: () => <Checkout01 />,
}
