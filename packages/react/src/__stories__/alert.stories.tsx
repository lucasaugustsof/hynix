import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert, type AlertRootProps } from '@/components/alert'
import { cn } from '@/lib/cn'

export default {
  title: 'Components/Alert',
  component: Alert.Root,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'light', 'lighter', 'stroke'],
      description: 'Visual style variant of the alert',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'filled',
        },
      },
    },
    status: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'information', 'feature'],
      description: 'Status type affecting color scheme',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'information',
        },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm'],
      description: 'Size of the alert affecting icon and text size',
      table: {
        category: 'Appearance',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'sm',
        },
      },
    },
    'aria-live': {
      control: false,
      table: {
        disable: true,
      },
    },
    'aria-atomic': {
      control: false,
      table: {
        disable: true,
      },
    },
  },
  args: {
    variant: 'filled',
    status: 'information',
    size: 'sm',
  },
  decorators: [
    Story => (
      <div className="w-md">
        <Story />
      </div>
    ),
  ],
} as Meta<AlertRootProps>

type AlertStory = StoryObj<AlertRootProps>

export const Default: AlertStory = {
  render(args) {
    return (
      <Alert.Root {...args}>
        <Alert.Icon />
        <Alert.Title>Insert your alert title here!</Alert.Title>
        <Alert.LinkButton href="/">Upgrade</Alert.LinkButton>
        <Alert.Close />
      </Alert.Root>
    )
  },
}

export const Large: AlertStory = {
  args: {
    size: 'lg',
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  render(args) {
    return (
      <Alert.Root {...args}>
        <Alert.Icon />
        <div className="space-y-2.5">
          <hgroup>
            <Alert.Title>Insert your alert title here!</Alert.Title>
            <Alert.Description>
              Insert the alert description here. It would look better as two lines of text.
            </Alert.Description>
          </hgroup>

          <div className="flex items-center gap-x-2">
            <Alert.LinkButton>Upgrade</Alert.LinkButton>
            <span
              className={cn(
                'inline size-0.5 rounded-full bg-fg-2/40',
                args.variant === 'stroke' && 'bg-fg-1/40'
              )}
            />
            <Alert.LinkButton className="no-underline">Learn More</Alert.LinkButton>
          </div>
        </div>

        <Alert.Close />
      </Alert.Root>
    )
  },
}
