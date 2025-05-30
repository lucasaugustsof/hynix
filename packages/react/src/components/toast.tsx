import { ark } from '@ark-ui/react/factory'
import { Toaster, toast as sonnerToast } from 'sonner'

import { cn } from '@r/utilities/cn'

type ToastProps = React.ComponentPropsWithRef<'div'>

function ToastRoot({ className, ...props }: ToastProps) {
  return (
    <div
      {...props}
      role="alert"
      className={cn(
        'min-w-80 rounded-xl border border-black/10 bg-surface-1 p-3 shadow-black/8 shadow-xs dark:border-white/10 dark:shadow-white/8',
        className,
      )}
    />
  )
}

function ToastTitle({
  className,
  ...props
}: React.CustomComponentPropsWithRef<typeof ark.h3>) {
  return (
    <ark.h3
      {...props}
      className={cn('font-semibold text-base text-fg-1', className)}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: React.CustomComponentPropsWithRef<typeof ark.p>) {
  return (
    <ark.p
      {...props}
      className={cn(
        'line-clamp-2 font-normal text-fg-1/70 text-sm/5.5',
        className,
      )}
    />
  )
}

const Toast = {
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Toaster,
}

type ToastHandlerProps = {
  id: string | number
  title: string
  description?: string
}

type ToastComponent = (props: ToastHandlerProps) => React.ReactElement

function useToast(toastComponent: ToastComponent) {
  return {
    show(props: Omit<ToastHandlerProps, 'id'>) {
      return sonnerToast.custom(id => toastComponent({ ...props, id }))
    },
    dismiss({ id }: Pick<ToastHandlerProps, 'id'>) {
      sonnerToast.dismiss(id)
    },
  }
}

export { Toast, useToast }
