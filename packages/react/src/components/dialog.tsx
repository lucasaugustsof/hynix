// Hynix: Dialog [v1.0.0]

import { Dialog as BaseDialog } from '@base-ui-components/react/dialog'

import { cn } from '@/registry/utils/cn'

/* ----------------------------------
 * Dialog Root Component
 * Acts as the main container for the dialog system
 * ---------------------------------- */
export const DialogRoot = BaseDialog.Root

/* ----------------------------------
 * Dialog Trigger Component
 * Used to open the dialog
 * ---------------------------------- */
export const DialogTrigger = BaseDialog.Trigger

/* ----------------------------------
 * Dialog Portal Component
 * Manages rendering inside a separate DOM tree
 * ---------------------------------- */
export const DialogPortal = BaseDialog.Portal

/* ----------------------------------
 * Dialog Close Component
 * Used to close the dialog
 * ---------------------------------- */
export const DialogClose = BaseDialog.Close

type DialogPopupProps = React.ComponentPropsWithRef<typeof BaseDialog.Popup>

/* ----------------------------------
 * Dialog Popup Component
 * Represents the main dialog container
 * ---------------------------------- */
export function DialogPopup({ className, ...props }: DialogPopupProps) {
  return (
    <BaseDialog.Popup
      {...props}
      role="alertdialog"
      className={cn(
        '-mt-8 -translate-y-1/2 -translate-x-1/2 fixed top-1/2 left-1/2 w-80 max-w-[calc(100vw-1rem)] rounded-3xl border border-border bg-surface-1 p-4 shadow-xs transition-all duration-150 ease-out',
        'data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:blur-md data-[starting-style]:blur-sm',
        'md:min-w-96 md:p-6 lg:min-w-lg lg:px-8 lg:pt-6 lg:pb-8',
        className,
      )}
      aria-modal
    />
  )
}

/* ----------------------------------
 * Dialog Backdrop Component
 * Provides a background overlay when the dialog is open
 * ---------------------------------- */
export function DialogBackdrop() {
  return (
    <BaseDialog.Backdrop
      role="presentation"
      className={cn(
        'fixed inset-0 bg-black opacity-20 transition-[opacity] duration-150',
        'data-[ending-style]:opacity-0 data-[starting-style]:opacity-0',
      )}
      aria-hidden
    />
  )
}

/* ----------------------------------
 * Dialog Title Component
 * Represents the title of the dialog
 * ---------------------------------- */
type DialogTitleProps = React.ComponentPropsWithRef<typeof BaseDialog.Title>

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      {...props}
      className={cn(
        'font-sans font-semibold text-fg-1 text-lg leading-7',
        'md:text-xl md:leading-8 lg:text-2xl lg:leading-[2.375rem]',
        className,
      )}
    />
  )
}

/* ----------------------------------
 * Dialog Description Component
 * Provides additional context for the dialog
 * ---------------------------------- */
type DialogDescriptionProps = React.ComponentPropsWithRef<
  typeof BaseDialog.Description
>

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      {...props}
      className={cn(
        'font-normal font-sans text-fg-1/70 text-sm leading-snug',
        'md:text-base lg:text-lg lg:leading-7',
        className,
      )}
    />
  )
}
