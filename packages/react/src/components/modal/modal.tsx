import type * as React from 'react'
import {
  Dialog as ArkDialog,
  type DialogBackdropProps as ArkDialogBackdropProps,
  type DialogCloseTriggerProps as ArkDialogCloseTriggerProps,
  type DialogContentProps as ArkDialogContentProps,
  type DialogDescriptionProps as ArkDialogDescriptionProps,
  type DialogRootProps as ArkDialogRootProps,
  type DialogRootProviderProps as ArkDialogRootProviderProps,
  type DialogTitleProps as ArkDialogTitleProps,
  type DialogTriggerProps as ArkDialogTriggerProps,
} from '@ark-ui/react/dialog'
import { ark } from '@ark-ui/react/factory'
import { Portal as ArkPortal } from '@ark-ui/react/portal'

import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react'
import { cn } from '@/lib/cn'

const MODAL_ROOT_PROVIDER_NAME = 'Modal.RootProvider'
const MODAL_ROOT_NAME = 'Modal.Root'
const MODAL_TRIGGER_NAME = 'Modal.Trigger'
const MODAL_OVERLAY_NAME = 'Modal.Overlay'
const MODAL_CONTENT_NAME = 'Modal.Content'
const MODAL_HEADER_NAME = 'Modal.Header'
const MODAL_TITLE_NAME = 'Modal.Title'
const MODAL_DESCRIPTION_NAME = 'Modal.Description'
const MODAL_BODY_NAME = 'Modal.Body'
const MODAL_FOOTER_NAME = 'Modal.Footer'
const MODAL_ACTIONS_NAME = 'Modal.Actions'
const MODAL_CLOSE_TRIGGER_NAME = 'Modal.CloseTrigger'
const MODAL_STATUS_NAME = 'Modal.Status'

////////////////////////////////////////////////////////////////////////////////////

export interface ModalRootProviderProps extends ArkDialogRootProviderProps {}

export function ModalRootProvider(props: ModalRootProviderProps) {
  return <ArkDialog.RootProvider {...props} data-scope="modal" data-part="root" />
}

ModalRootProvider.displayName = MODAL_ROOT_PROVIDER_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalRootProps extends ArkDialogRootProps {}

export function ModalRoot({ children, ...props }: ModalRootProps) {
  return (
    <ArkDialog.Root {...props} data-scope="modal" data-part="root">
      <ArkPortal>{children}</ArkPortal>
    </ArkDialog.Root>
  )
}

ModalRoot.displayName = MODAL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalTriggerProps extends ArkDialogTriggerProps {}

export function ModalTrigger(props: ModalTriggerProps) {
  return <ArkDialog.Trigger {...props} />
}

ModalTrigger.displayName = MODAL_TRIGGER_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalOverlayProps extends ArkDialogBackdropProps {}

export function ModalOverlay({ className, ...props }: ModalOverlayProps) {
  return (
    <ArkDialog.Backdrop
      {...props}
      className={cn(
        'fixed inset-0 z-40 h-screen bg-black/40 backdrop-blur-xs duration-200',
        'motion-reduce:backdrop-blur-none motion-reduce:transition-none',
        // open
        'data-[state=open]:fade-in-0 data-[state=open]:animate-in',
        // closed
        'data-[state=closed]:fade-out-0 data-[state=closed]:animate-out',
        className
      )}
      data-scope="modal"
      data-part="overlay"
    />
  )
}

ModalOverlay.displayName = MODAL_OVERLAY_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalContentProps extends ArkDialogContentProps {}

export function ModalContent({ className, ...props }: ModalContentProps) {
  return (
    <ArkDialog.Positioner className={cn('motion-reduce:transform-none')}>
      <ArkDialog.Content
        {...props}
        className={cn(
          '-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 max-w-[calc(100vw_-_--spacing(6))] origin-center overflow-hidden rounded-[1.25rem] border shadow-black/6 shadow-lg duration-150 ease-in-out',
          // open
          'data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:animate-in',
          // closed
          'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out',
          className
        )}
        data-scope="modal"
        data-part="content"
      />
    </ArkDialog.Positioner>
  )
}

ModalContent.displayName = MODAL_CONTENT_NAME

////////////////////////////////////////////////////////////////////////////////////

type ModalHeaderType = 'default' | 'error' | 'warning' | 'success' | 'information'

export interface ModalHeaderProps extends React.ComponentProps<'header'> {
  type?: ModalHeaderType
  size?: 'sm' | 'md'
  leftIcon?: React.ReactNode
  closeLabel?: string
}

export function ModalHeader({
  children,
  className,
  type = 'default',
  size = 'sm',
  leftIcon,
  closeLabel,
  ...props
}: ModalHeaderProps) {
  const iconByType = {
    default: leftIcon,
    error: <RiErrorWarningFill />,
    warning: <RiAlertFill />,
    success: <RiCheckboxCircleFill />,
    information: <RiInformationFill />,
  } as const

  const iconColorByType = {
    default: '[--icon-color:var(--color-fill-5)]',
    error: '[--icon-color:var(--color-danger)]',
    warning: '[--icon-color:var(--color-warning)]',
    success: '[--icon-color:var(--color-success)]',
    information: '[--icon-color:var(--color-information)]',
  } as const

  const currentIcon = iconByType[type]
  const shouldShowIcon = leftIcon || type !== 'default'

  const iconColorVar = iconColorByType[type]
  const isLargeSize = size === 'md'
  const isDefaultType = type === 'default'

  return (
    <header
      {...props}
      className={cn('flex items-start gap-x-1 border-b bg-surface-1 py-4 pr-4 pl-5', className)}
      data-scope="modal"
      data-part="header"
    >
      <div className={cn('flex flex-1 items-center gap-x-3', isLargeSize && 'gap-x-3.5')}>
        {shouldShowIcon && (
          <div
            className={cn(
              'shrink-0 [&_svg]:size-5 [&_svg]:fill-(--icon-color)',
              isDefaultType
                ? 'inset-ring-1 inset-ring-border bg-surface-2'
                : 'bg-(--icon-color)/12',
              isLargeSize ? 'rounded-full p-2.5' : 'bg-transparent',
              iconColorVar
            )}
            aria-hidden
          >
            {currentIcon}
          </div>
        )}

        <div className={cn('space-y-1 font-sans')}>{children}</div>
      </div>

      <ArkDialog.CloseTrigger
        type="button"
        aria-label={closeLabel || 'Close modal'}
        className={cn(
          'group inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.375rem] p-0.5 outline-hidden transition-colors',
          'enabled:hover:bg-fill-1'
        )}
      >
        <RiCloseLine
          className={cn('size-5 fill-fill-5 transition-colors group-hover:fill-fg-1')}
          aria-hidden
        />
      </ArkDialog.CloseTrigger>
    </header>
  )
}

ModalHeader.displayName = MODAL_HEADER_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalTitleProps extends ArkDialogTitleProps {}

export function ModalTitle({ className, ...props }: ModalTitleProps) {
  return (
    <ArkDialog.Title
      {...props}
      className={cn(
        'line-clamp-2 font-medium text-fg-1 text-sm/5 tracking-[-0.00525rem]',
        className
      )}
      data-scope="modal"
      data-part="title"
    />
  )
}

ModalTitle.displayName = MODAL_TITLE_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalDescriptionProps extends ArkDialogDescriptionProps {}

export function ModalDescription({ className, ...props }: ModalDescriptionProps) {
  return (
    <ArkDialog.Description
      {...props}
      className={cn('font-normal text-fg-1/70 text-xs/4', className)}
      data-scope="modal"
      data-part="description"
    />
  )
}

ModalDescription.displayName = MODAL_DESCRIPTION_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalBodyProps extends React.ComponentProps<typeof ark.div> {}

export function ModalBody({ className, ...props }: ModalBodyProps) {
  return (
    <ark.div
      {...props}
      className={cn('bg-surface-1 p-5', className)}
      data-scope="modal"
      data-part="body"
    />
  )
}

ModalBody.displayName = MODAL_BODY_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalFooterProps extends React.ComponentProps<'footer'> {}

export function ModalFooter({ className, ...props }: ModalFooterProps) {
  return (
    <footer
      {...props}
      className={cn('flex border-t bg-surface-1 px-5 py-4', className)}
      data-scope="modal"
      data-part="footer"
    />
  )
}

ModalFooter.displayName = MODAL_FOOTER_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalActionsProps extends React.ComponentProps<typeof ark.div> {}

export function ModalActions({ className, ...props }: ModalActionsProps) {
  return (
    <ark.div
      {...props}
      className={cn('flex flex-1 items-center justify-end gap-x-3', className)}
      data-scope="modal"
      data-part="actions"
    />
  )
}

ModalActions.displayName = MODAL_ACTIONS_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalCloseTriggerProps extends ArkDialogCloseTriggerProps {}

export function ModalCloseTrigger(props: ModalCloseTriggerProps) {
  return <ArkDialog.CloseTrigger {...props} data-scope="modal" data-part="close-trigger" />
}

ModalCloseTrigger.displayName = MODAL_CLOSE_TRIGGER_NAME

////////////////////////////////////////////////////////////////////////////////////

type ModalStatusIconType = 'error' | 'warning' | 'success' | 'information'

export interface ModalStatusProps extends React.ComponentProps<'div'> {
  type?: ModalStatusIconType
}

export function ModalStatus({ className, type = 'information' }: ModalStatusProps) {
  const iconByType = {
    error: <RiErrorWarningFill />,
    warning: <RiAlertFill />,
    success: <RiCheckboxCircleFill />,
    information: <RiInformationFill />,
  } as const

  const iconColorByType = {
    error: '[--icon-color:var(--color-danger)]',
    warning: '[--icon-color:var(--color-warning)]',
    success: '[--icon-color:var(--color-success)]',
    information: '[--icon-color:var(--color-information)]',
  } as const

  const currentIcon = iconByType[type]
  const iconColorVar = iconColorByType[type]

  return (
    <div
      role="presentation"
      className={cn(
        iconColorVar,
        'inline-block rounded-[--spacing(2.5)] bg-(--icon-color)/12 p-2 [&_svg]:fill-(--icon-color)',
        className
      )}
      aria-hidden
      data-scope="modal"
      data-part="status"
    >
      {currentIcon}
    </div>
  )
}

ModalStatus.displayName = MODAL_STATUS_NAME
