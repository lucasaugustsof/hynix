import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformation2Fill,
  RiCloseLine,
  RiMessage3Line,
} from '@remixicon/react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@r/components/button'
import { Toast, useToast } from '@r/components/toast'
import { Avatar, getInitialLetters } from '@r/components/avatar'

const meta: Meta = {
  title: 'components/Toast',
  parameters: {
    layout: 'centered',
  },
}

export default meta

function ToastDemo({
  icon,
}: {
  icon?: React.ReactNode
}) {
  const toast = useToast(({ id, title, description }) => (
    <Toast.Root
      className="flex items-start"
      aria-labelledby={`toast-title-${id}`}
      aria-describedby={`toast-desc-${id}`}
    >
      {icon}

      <div className="mr-1.5 ml-2.5 flex-1">
        <Toast.Title id={`toast-title-${id}`}>{title}</Toast.Title>
        <Toast.Description id={`toast-desc-${id}`}>
          {description}
        </Toast.Description>
      </div>

      <Button
        type="button"
        size="sm"
        className="mt-auto"
        onClick={() => toast.dismiss({ id })}
      >
        OK
      </Button>
    </Toast.Root>
  ))

  return (
    <>
      <Button
        variant="secondary"
        onClick={() =>
          toast.show({
            title: 'Toast',
            description: 'Placeholder for toast text',
          })
        }
      >
        Show Toast
      </Button>
      <Toast.Toaster />
    </>
  )
}

export const Basic: StoryObj = {
  render: () => <ToastDemo />,
}

export const Info: StoryObj = {
  render: () => (
    <ToastDemo icon={<RiInformation2Fill className="size-5 fill-fill-5" />} />
  ),
}

export const Success: StoryObj = {
  render: () => (
    <ToastDemo
      icon={<RiCheckboxCircleFill className="size-5 fill-success" />}
    />
  ),
}

export const Warning: StoryObj = {
  render: () => (
    <ToastDemo icon={<RiErrorWarningFill className="size-5 fill-danger" />} />
  ),
}

export const Slot: StoryObj = {
  render() {
    const toast = useToast(({ id, title, description }) => (
      <Toast.Root>
        <header className="flex items-center justify-between">
          <Toast.Title className="text-sm/5.5">{title}</Toast.Title>

          <Button
            variant="ghost"
            size="sm"
            className="inset-ring-transparent"
            iconOnly
            onClick={() =>
              toast.dismiss({
                id,
              })
            }
          >
            <RiCloseLine />
          </Button>
        </header>

        <div className="flex flex-1 items-center gap-x-3">
          <div className="relative">
            <Avatar
              src="https://i.pravatar.cc/300"
              size="lg"
              fallback={getInitialLetters('John Doe')}
              altText="John Doe"
            />

            <span className="absolute right-0 bottom-0 inline-flex size-5 rounded-full bg-orange-50 p-1 dark:bg-orange-950">
              <RiMessage3Line className="size-full fill-orange-500" />
            </span>
          </div>

          <div>
            <span className="font-medium text-fg-1 text-sm/5.5">John Doe</span>
            <Toast.Description>{description}</Toast.Description>

            <small className="font-normal text-orange-500 text-xs/4.5">
              a few seconds ago
            </small>
          </div>
        </div>
      </Toast.Root>
    ))

    return (
      <>
        <Button
          variant="secondary"
          onClick={() =>
            toast.show({
              title: 'New notification',
              description: 'commented on your photo',
            })
          }
        >
          Show Toast
        </Button>
        <Toast.Toaster duration={5000} expand />
      </>
    )
  },
}
