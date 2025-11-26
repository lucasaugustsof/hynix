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

/**
 * Modal root provider component for advanced use cases requiring external state management.
 * Built on Ark UI Dialog.RootProvider with `useDialog` hook for programmatic control.
 * Use this when you need to control modal state from outside the component tree.
 * For most cases, use Modal.Root instead.
 *
 * Important: Never mix Modal.Root and Modal.RootProvider - choose one based on your needs.
 *
 * @example
 * ```tsx
 * import { useDialog } from '@ark-ui/react/dialog'
 *
 * // Programmatic control from outside
 * function UserProfile() {
 *   const dialog = useDialog()
 *
 *   const handleError = () => {
 *     dialog.setOpen(true) // Open modal programmatically
 *   }
 *
 *   return (
 *     <>
 *       <button onClick={handleError}>Show Error</button>
 *       <button onClick={() => dialog.setOpen(true)}>Open Settings</button>
 *
 *       <Modal.RootProvider value={dialog}>
 *         <Modal.Overlay />
 *         <Modal.Content>
 *           <Modal.Header type="error">
 *             <Modal.Title>Error Occurred</Modal.Title>
 *             <Modal.Description>Please try again later</Modal.Description>
 *           </Modal.Header>
 *           <Modal.Body>
 *             <p>Details about the error...</p>
 *           </Modal.Body>
 *           <Modal.Footer>
 *             <Modal.Actions>
 *               <Button.Root onClick={() => dialog.setOpen(false)}>
 *                 Close
 *               </Button.Root>
 *             </Modal.Actions>
 *           </Modal.Footer>
 *         </Modal.Content>
 *       </Modal.RootProvider>
 *     </>
 *   )
 * }
 * ```
 */
export interface ModalRootProviderProps extends ArkDialogRootProviderProps {}

export function ModalRootProvider(props: ModalRootProviderProps) {
  return <ArkDialog.RootProvider {...props} data-scope="modal" data-part="root" />
}

ModalRootProvider.displayName = MODAL_ROOT_PROVIDER_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Modal root component that wraps the entire modal composition.
 * Built on Ark UI Dialog with proper accessibility and focus management.
 * Automatically renders content in a portal at the end of document body.
 * Supports controlled and uncontrolled modes, focus trap, and initial focus.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Modal.Root>
 *   <Modal.Trigger>Open</Modal.Trigger>
 *   <Modal.Overlay />
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Confirm Action</Modal.Title>
 *     </Modal.Header>
 *   </Modal.Content>
 * </Modal.Root>
 *
 * // Controlled with initial focus
 * const inputRef = useRef(null)
 *
 * <Modal.Root
 *   open={isOpen}
 *   onOpenChange={({ open }) => setIsOpen(open)}
 *   initialFocusEl={() => inputRef.current}
 * >
 *   <Modal.Content>
 *     <input ref={inputRef} />
 *   </Modal.Content>
 * </Modal.Root>
 * ```
 */
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

/**
 * Modal trigger component that opens the modal when activated.
 * Renders as a button by default, but can be used with `asChild` for custom elements.
 * Automatically handles click events and accessibility attributes.
 *
 * @example
 * ```tsx
 * // Default button trigger
 * <Modal.Trigger>Open Modal</Modal.Trigger>
 *
 * // Custom element trigger
 * <Modal.Trigger asChild>
 *   <Button.Root variant="primary">
 *     <Button.Icon as={SettingsIcon} />
 *     Settings
 *   </Button.Root>
 * </Modal.Trigger>
 * ```
 */
export interface ModalTriggerProps extends ArkDialogTriggerProps {}

export function ModalTrigger(props: ModalTriggerProps) {
  return <ArkDialog.Trigger {...props} />
}

ModalTrigger.displayName = MODAL_TRIGGER_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Modal overlay component that renders a semi-transparent backdrop.
 * Appears behind the modal content with blur effect and fade animations.
 * Respects prefers-reduced-motion for accessibility.
 * Clicking the overlay closes the modal by default (configurable via Modal.Root).
 *
 * @example
 * ```tsx
 * <Modal.Root>
 *   <Modal.Trigger>Open</Modal.Trigger>
 *   <Modal.Overlay />
 *   <Modal.Content>...</Modal.Content>
 * </Modal.Root>
 *
 * // Custom styling
 * <Modal.Overlay className="bg-black/60" />
 * ```
 */
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

/**
 * Modal content component that contains the main modal dialog.
 * Automatically centered on screen with zoom and fade animations.
 * Respects prefers-reduced-motion for accessibility.
 * Traps focus within the modal and restores focus on close.
 * Use `asChild` to render content with custom root element (e.g., form).
 *
 * @example
 * ```tsx
 * // Basic content
 * <Modal.Content className="w-sm">
 *   <Modal.Header>
 *     <Modal.Title>Settings</Modal.Title>
 *   </Modal.Header>
 *   <Modal.Body>Content here</Modal.Body>
 * </Modal.Content>
 *
 * // As form element
 * <Modal.Content asChild>
 *   <form onSubmit={handleSubmit}>
 *     <Modal.Header>
 *       <Modal.Title>Add User</Modal.Title>
 *     </Modal.Header>
 *     <Modal.Body>
 *       <input name="email" />
 *     </Modal.Body>
 *   </form>
 * </Modal.Content>
 * ```
 */
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

/**
 * Modal header component that displays title, description, optional icon, and close button.
 * Supports semantic variants (error, warning, success, information) with matching icons and colors.
 * Custom icons can be provided via leftIcon prop, overriding type-based icons.
 * Includes an integrated close button with customizable aria-label.
 *
 * @example
 * ```tsx
 * // Basic header
 * <Modal.Header>
 *   <Modal.Title>Settings</Modal.Title>
 *   <Modal.Description>Manage your account settings</Modal.Description>
 * </Modal.Header>
 *
 * // With semantic type
 * <Modal.Header type="error">
 *   <Modal.Title>Delete Account</Modal.Title>
 *   <Modal.Description>This action cannot be undone</Modal.Description>
 * </Modal.Header>
 *
 * // Large size with custom icon
 * <Modal.Header size="md" leftIcon={<SettingsIcon />}>
 *   <Modal.Title>Advanced Settings</Modal.Title>
 * </Modal.Header>
 *
 * // Custom close button label
 * <Modal.Header closeLabel="Close settings dialog">
 *   <Modal.Title>Settings</Modal.Title>
 * </Modal.Header>
 * ```
 */
export interface ModalHeaderProps extends React.ComponentProps<'header'> {
  /** Visual type that determines icon and color scheme. Defaults to 'default'. */
  type?: ModalHeaderType
  /** Header size affecting spacing and icon size. Defaults to 'sm'. */
  size?: 'sm' | 'md'
  /** Custom icon to display. Overrides type-based icon when provided. */
  leftIcon?: React.ReactNode
  /** Accessible label for the close button. Defaults to 'Close modal'. */
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

/**
 * Modal title component that displays the main heading of the modal.
 * Built on Ark UI Dialog.Title with automatic ARIA labeling for screen readers.
 * Automatically truncates to 2 lines with ellipsis if content overflows.
 * Typically used inside Modal.Header.
 *
 * @example
 * ```tsx
 * <Modal.Header>
 *   <Modal.Title>Email Verification</Modal.Title>
 * </Modal.Header>
 *
 * // With custom styling
 * <Modal.Title className="text-lg font-bold">
 *   Important Notice
 * </Modal.Title>
 * ```
 */
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

/**
 * Modal description component that provides additional context about the modal.
 * Built on Ark UI Dialog.Description with automatic ARIA description for screen readers.
 * Renders with smaller, muted text below the title.
 * Typically used inside Modal.Header after Modal.Title.
 *
 * @example
 * ```tsx
 * <Modal.Header>
 *   <Modal.Title>Delete Account</Modal.Title>
 *   <Modal.Description>
 *     This action cannot be undone. All your data will be permanently deleted.
 *   </Modal.Description>
 * </Modal.Header>
 * ```
 */
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

/**
 * Modal body component that contains the main content of the modal.
 * Renders as a div element with consistent padding and background.
 * Use this to wrap form fields, text content, or any other modal content.
 *
 * @example
 * ```tsx
 * <Modal.Body>
 *   <Field.Root>
 *     <Label.Root>
 *       <Label.Text>Email</Label.Text>
 *     </Label.Root>
 *     <Field.Control>
 *       <Field.Input type="email" />
 *     </Field.Control>
 *   </Field.Root>
 * </Modal.Body>
 *
 * // With custom styling
 * <Modal.Body className="space-y-4 p-6">
 *   <p>Your content here</p>
 * </Modal.Body>
 * ```
 */
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

/**
 * Modal footer component that typically contains action buttons.
 * Renders as a footer element with top border and consistent padding.
 * Use Modal.Actions inside for properly aligned button groups.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Modal.Actions>
 *     <Modal.CloseTrigger asChild>
 *       <Button.Root variant="secondary">Cancel</Button.Root>
 *     </Modal.CloseTrigger>
 *     <Button.Root>Confirm</Button.Root>
 *   </Modal.Actions>
 * </Modal.Footer>
 *
 * // Custom layout
 * <Modal.Footer className="justify-between">
 *   <Button.Root variant="outline">Help</Button.Root>
 *   <Modal.Actions>
 *     <Button.Root>Save</Button.Root>
 *   </Modal.Actions>
 * </Modal.Footer>
 * ```
 */
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

/**
 * Modal actions component for grouping action buttons in the footer.
 * Automatically aligns buttons to the right with consistent spacing.
 * Typically used inside Modal.Footer.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Modal.Actions>
 *     <Modal.CloseTrigger asChild>
 *       <Button.Root variant="secondary">Cancel</Button.Root>
 *     </Modal.CloseTrigger>
 *     <Button.Root>Save Changes</Button.Root>
 *   </Modal.Actions>
 * </Modal.Footer>
 *
 * // Custom layout with grid
 * <Modal.Actions className="grid grid-cols-2">
 *   <Button.Root>Back</Button.Root>
 *   <Button.Root>Next</Button.Root>
 * </Modal.Actions>
 * ```
 */
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

/**
 * Modal close trigger component that closes the modal when activated.
 * Can be used anywhere inside Modal.Root to provide additional close actions.
 * Renders as a button by default, but supports `asChild` for custom elements.
 * Note: Modal.Header already includes a close button, use this for additional triggers.
 *
 * @example
 * ```tsx
 * // In footer actions
 * <Modal.Footer>
 *   <Modal.Actions>
 *     <Modal.CloseTrigger asChild>
 *       <Button.Root variant="secondary">Cancel</Button.Root>
 *     </Modal.CloseTrigger>
 *     <Button.Root>Confirm</Button.Root>
 *   </Modal.Actions>
 * </Modal.Footer>
 *
 * // As default button
 * <Modal.CloseTrigger>Close</Modal.CloseTrigger>
 *
 * // Custom close trigger in body
 * <Modal.Body>
 *   <p>Content here</p>
 *   <Modal.CloseTrigger asChild>
 *     <Button.Root variant="outline">Maybe Later</Button.Root>
 *   </Modal.CloseTrigger>
 * </Modal.Body>
 * ```
 */
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

/**
 * Displays a colored status icon for modals.
 *
 * @param type - The status type: 'error', 'warning', 'success', or 'information'. Defaults to 'information'.
 * @param className - Additional CSS classes to apply.
 *
 * @example
 * ```tsx
 * <Modal.Status type="error" />
 * <Modal.Status type="success" />
 * ```
 */
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
