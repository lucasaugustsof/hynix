import type * as React from 'react'
import {
  Dialog as ArkDialog,
  type DialogBackdropProps as ArkDialogBackdropProps,
  type DialogContentProps as ArkDialogContentProps,
  type DialogDescriptionProps as ArkDialogDescriptionProps,
  type DialogRootProps as ArkDialogRootProps,
  type DialogRootProviderProps as ArkDialogRootProviderProps,
  type DialogTitleProps as ArkDialogTitleProps,
  type DialogTriggerProps as ArkDialogTriggerProps,
} from '@ark-ui/react/dialog'
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

////////////////////////////////////////////////////////////////////////////////////

export interface ModalRootProviderProps extends ArkDialogRootProviderProps {}

export function ModalRootProvider(props: ModalRootProviderProps) {
  return <ArkDialog.RootProvider {...props} />
}

ModalRootProvider.displayName = MODAL_ROOT_PROVIDER_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalRootProps extends ArkDialogRootProps {}

export function ModalRoot({ children, ...props }: ModalRootProps) {
  return (
    <ArkDialog.Root {...props}>
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

export function ModalOverlay(props: ModalOverlayProps) {
  return <ArkDialog.Backdrop {...props} />
}

ModalOverlay.displayName = MODAL_OVERLAY_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalContentProps extends ArkDialogContentProps {}

export function ModalContent(props: ModalContentProps) {
  return (
    <ArkDialog.Positioner>
      <ArkDialog.Content {...props} />
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
}

export function ModalHeader({
  children,
  className,
  type = 'default',
  size = 'sm',
  leftIcon,
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
        {leftIcon && (
          <div
            className={cn(
              'shrink-0 [&_svg]:size-6 [&_svg]:fill-(--icon-color)',
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
        aria-label="Close modal"
        className={cn(
          'group inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[0.375rem] p-0.5 transition-colors',
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
    />
  )
}

ModalDescription.displayName = MODAL_DESCRIPTION_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalBodyProps extends React.ComponentProps<'div'> {}

export function ModalBody(props: ModalBodyProps) {
  return <div {...props} />
}

ModalBody.displayName = MODAL_BODY_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ModalFooterProps extends React.ComponentProps<'footer'> {}

export function ModalFooter(props: ModalFooterProps) {
  return <footer {...props} />
}

ModalFooter.displayName = MODAL_FOOTER_NAME
