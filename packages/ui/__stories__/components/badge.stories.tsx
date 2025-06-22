import type { Meta, StoryObj } from '@storybook/react-vite'
import { RiCheckLine, RiAlertLine } from '@remixicon/react'

import { Badge, type BadgeProps } from '@r/components/badge'

const meta: Meta<BadgeProps> = {
  title: 'components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    appearance: 'default',
    isActive: false,
    children: 'Active',
  },
  argTypes: {
    appearance: {
      description: 'Defines the visual style of the badge.',
      table: {
        category: 'Style',
      },
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'warning', 'success', 'danger'],
    },
    isActive: {
      description: 'Controls the badge state: active or inactive.',
      table: {
        category: 'State',
      },
      control: {
        type: 'boolean',
      },
    },
    children: {
      description: 'Content displayed inside the badge.',
      table: {
        category: 'Content',
      },
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type BadgeStory = StoryObj<BadgeProps>

export const Basic: BadgeStory = {
  name: 'Basic',
  parameters: {
    docs: {
      description: {
        story: 'A basic badge used to highlight statuses or labels.',
      },
    },
  },
}

export const PaymentStatus: BadgeStory = {
  name: 'Payment status (success)',
  args: {
    appearance: 'success',
    children: 'Paid',
    isActive: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a success badge to indicate a completed payment in dashboards or invoices.',
      },
    },
  },
}

export const WarningQuota: BadgeStory = {
  name: 'Storage warning (inactive)',
  args: {
    appearance: 'warning',
    children: '90% used',
    isActive: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a warning badge to alert users when they are reaching usage limits, such as storage capacity.',
      },
    },
  },
}

export const AccountDisabled: BadgeStory = {
  name: 'Account disabled (danger)',
  args: {
    appearance: 'danger',
    children: 'Disabled',
    isActive: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use a danger badge to indicate critical states, such as account suspension or error messages.',
      },
    },
  },
}

export const ApprovedWithIcon: BadgeStory = {
  name: 'Approval status with icon',
  args: {
    appearance: 'success',
    isActive: true,
    children: (
      <>
        <RiCheckLine aria-hidden="true" />
        Approved
      </>
    ),
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
    docs: {
      description: {
        story:
          'Use a success badge with a check icon to represent approved items, like form submissions or registrations.',
      },
    },
  },
}

export const WarningWithIcon: BadgeStory = {
  name: 'Warning status with icon',
  args: {
    appearance: 'warning',
    isActive: false,
    children: (
      <>
        <RiAlertLine aria-hidden="true" />
        Warning
      </>
    ),
  },
  parameters: {
    controls: {
      exclude: ['children'],
    },
    docs: {
      description: {
        story:
          'Use a warning badge with an alert icon to notify users about potential issues or attention-required content.',
      },
    },
  },
}
