import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  ModalConfirm,
  type ModalConfirmProps,
} from '@/registry/components/modal-confirm'

const meta: Meta<ModalConfirmProps> = {
  title: 'Components/ModalConfirm',
  component: ModalConfirm,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Complete this action?',
    description: 'You can’t undo this action later.',
    actions: [
      {
        label: 'Cancel',
      },
      {
        label: 'Confirm',
        onClick: action('Triggered when the confirm button is clicked.'),
      },
    ],
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Defines the title of the confirmation modal.',
      table: {
        category: 'Content',
      },
    },
    description: {
      control: 'text',
      description:
        'Provides additional context for the user before confirming the action.',
      table: {
        category: 'Content',
      },
    },
    actions: {
      control: false,
      description: 'Defines the action buttons available in the modal.',
      table: {
        category: 'Actions',
        disable: true,
      },
    },
  },
}

export default meta

export const Default: StoryObj<ModalConfirmProps> = {}
