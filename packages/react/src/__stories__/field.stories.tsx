import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiInformation2Fill, RiUser6Line } from '@remixicon/react'
import { Field } from '@/components/field'

export default {
  title: 'Components/Field',
  component: () => (
    <Field.Root>
      <Field.Control>
        <Field.Icon as={RiUser6Line} />
        <Field.Input placeholder="Placeholder text..." />
        <Field.Icon as={RiInformation2Fill} />
      </Field.Control>
    </Field.Root>
  ),
} as Meta

export const Default: StoryObj = {}
