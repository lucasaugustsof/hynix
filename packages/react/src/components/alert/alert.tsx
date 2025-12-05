import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'

import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiMagicFill,
} from '@remixicon/react'
import { cloneChildrenWithProps } from '@/lib/clone-children-with-props'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from '@/lib/tv'

const ALERT_ROOT_NAME = 'Alert.Root'
const ALERT_ICON_NAME = 'Alert.Icon'
const ALERT_TITLE_NAME = 'Alert.Title'
const ALERT_DESCRIPTION_NAME = 'Alert.Description'
const ALERT_ACTIONS_NAME = 'Alert.Actions'
const ALERT_CLOSE_TRIGGER_NAME = 'Alert.CloseTrigger'

const createAlertRecipe = tv({
  slots: {
    root: [
      'inline-flex w-full items-center gap-x-2 rounded-lg font-sans',
      '[&_[data-scope=link-button][data-part=root]]:text-inherit',
    ],
    icon: 'shrink-0',
    title: 'line-clamp-2 flex-1 overflow-ellipsis',
    description: 'mt-1',
    closeTrigger: 'focus-visible:focus-outline cursor-pointer opacity-72 [&_svg]:shrink-0',
  },
  variants: {
    variant: {
      filled: {},
      light: {},
      lighter: {},
      stroke: {},
    },
    status: {
      danger: {},
      warning: {},
      success: {},
      information: {},
      feature: {},
    },
    size: {
      xs: {
        root: 'p-2 [&_svg]:size-4',
      },
      sm: {
        root: 'px-2.5 py-2 [&_svg]:size-5',
      },
      lg: {
        root: 'items-start p-3.5 pb-4 [&_svg]:size-5',
        title: 'font-medium',
      },
    },
  },
  compoundVariants: [
    // #region start: danger
    {
      variant: 'filled',
      status: 'danger',
      class: {
        root: 'bg-danger text-fg-2',
      },
    },
    {
      variant: 'light',
      status: 'danger',
      class: {
        root: 'bg-danger/30 text-fg-1',
        icon: 'text-danger',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'danger',
      class: {
        root: 'bg-danger/15 text-fg-1',
        icon: 'text-danger',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'danger',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'text-danger',
        closeTrigger: 'opacity-40',
      },
    },
    // #region end: danger

    // #region start: success
    {
      variant: 'filled',
      status: 'success',
      class: {
        root: 'bg-success text-fg-2',
      },
    },
    {
      variant: 'light',
      status: 'success',
      class: {
        root: 'bg-success/30 text-fg-1',
        icon: 'text-success',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'success',
      class: {
        root: 'bg-success/15 text-fg-1',
        icon: 'text-success',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'success',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'text-success',
        closeTrigger: 'opacity-40',
      },
    },
    // #region end: success

    // #region start: warning
    {
      variant: 'filled',
      status: 'warning',
      class: {
        root: 'bg-warning text-fg-2',
      },
    },
    {
      variant: 'light',
      status: 'warning',
      class: {
        root: 'bg-warning/30 text-fg-1',
        icon: 'text-warning',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'warning',
      class: {
        root: 'bg-warning/15 text-fg-1',
        icon: 'text-warning',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'warning',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'text-warning',
        closeTrigger: 'opacity-40',
      },
    },
    // #region end: warning

    // #region start: information
    {
      variant: 'filled',
      status: 'information',
      class: {
        root: 'bg-information text-fg-2',
      },
    },
    {
      variant: 'light',
      status: 'information',
      class: {
        root: 'bg-information/30 text-fg-1',
        icon: 'text-information',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'information',
      class: {
        root: 'bg-information/15 text-fg-1',
        icon: 'text-information',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'information',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'text-information',
        closeTrigger: 'opacity-40',
      },
    },
    // #region end: information

    // #region start: feature
    {
      variant: 'filled',
      status: 'feature',
      class: {
        root: 'bg-fill-5 text-fg-2',
      },
    },
    {
      variant: 'light',
      status: 'feature',
      class: {
        root: 'bg-fill-5/30 text-fg-1',
        icon: 'text-fill-5',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'feature',
      class: {
        root: 'bg-fill-5/15 text-fg-1',
        icon: 'text-fill-5',
        closeTrigger: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'feature',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'text-fill-5',
        closeTrigger: 'opacity-40',
      },
    },
    // #region end: feature
  ],
  compoundSlots: [
    {
      slots: ['title'],
      size: 'xs',
      class: 'text-xs/4',
    },
    {
      slots: ['title', 'description'],
      size: ['sm', 'lg'],
      class: 'text-sm/5 tracking-[-0.00525rem]',
    },
  ],
})

const alertRecipe = createAlertRecipe()

type AlertSharedProps = VariantProps<typeof createAlertRecipe>

/**
 * Alert root component that wraps the entire alert composition.
 * Automatically injects status, variant, and size props to child components.
 * Includes proper ARIA attributes for screen reader announcements.
 *
 * @example
 * ```tsx
 * <Alert.Root status="success" variant="filled" size="sm">
 *   <Alert.Icon />
 *   <Alert.Title>Success</Alert.Title>
 *   <Alert.Description>Your changes have been saved.</Alert.Description>
 * </Alert.Root>
 * ```
 */
export interface AlertRootProps extends Assign<React.ComponentProps<'div'>, AlertSharedProps> {}

export function AlertRoot({
  children,
  className,
  status = 'information',
  variant = 'filled',
  size = 'sm',
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
  ...props
}: AlertRootProps) {
  const clonedChildren = cloneChildrenWithProps(children, {
    keyPrefix: 'Alert',
    props: {
      status,
      variant,
      size,
    },
    targetDisplayNames: [
      ALERT_ICON_NAME,
      ALERT_TITLE_NAME,
      ALERT_CLOSE_TRIGGER_NAME,
      ALERT_DESCRIPTION_NAME,
    ],
  })

  const computedAriaLive = ariaLive ?? (status === 'danger' ? 'assertive' : 'polite')

  return (
    <div
      role="alert"
      className={alertRecipe.root({
        className,
        status,
        variant,
        size,
      })}
      data-scope="alert"
      data-part="root"
      aria-live={computedAriaLive}
      aria-atomic={ariaAtomic}
      {...props}
    >
      {clonedChildren}
    </div>
  )
}

AlertRoot.displayName = ALERT_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Alert icon component that displays a status-specific icon.
 * Automatically selects the appropriate icon based on the status prop:
 * - danger: Error warning icon
 * - success: Checkbox circle icon
 * - warning: Alert icon
 * - information: Information icon
 * - feature: Magic icon
 *
 * Supports custom icons via the `as` prop for polymorphic rendering.
 *
 * @example
 * ```tsx
 * <Alert.Icon />
 * <Alert.Icon status="success" />
 * <Alert.Icon asChild>
 *  <CustomIcon />
 * </Alert.Icon>
 * ```
 */
export interface AlertIconProps extends React.ComponentProps<typeof ark.div>, AlertSharedProps {}

export function AlertIcon({
  children,
  className,
  status = 'information',
  variant,
  size,
  ...props
}: AlertIconProps) {
  let leftIcon: React.ReactNode

  switch (status) {
    case 'danger':
      leftIcon = <RiErrorWarningFill />
      break
    case 'success':
      leftIcon = <RiCheckboxCircleFill />
      break
    case 'warning':
      leftIcon = <RiAlertFill />
      break
    case 'information':
      leftIcon = <RiInformationFill />
      break
    case 'feature':
      leftIcon = <RiMagicFill />
      break
    default:
      leftIcon = null
  }

  const content = props.asChild ? children : leftIcon

  return (
    <ark.div
      className={alertRecipe.icon({
        className,
        status,
        variant,
        size,
      })}
      aria-hidden
      data-scope="alert"
      data-part="icon"
      {...props}
    >
      {content}
    </ark.div>
  )
}

AlertIcon.displayName = ALERT_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Alert title component that displays the main heading of the alert.
 * Renders as an h2 element and is used for the primary alert message.
 * Automatically linked via aria-labelledby from the root component.
 *
 * @example
 * ```tsx
 * <Alert.Title>Operation successful</Alert.Title>
 * <Alert.Title>Warning: Disk space low</Alert.Title>
 * ```
 */
export interface AlertTitleProps
  extends Assign<React.ComponentProps<typeof ark.h2>, AlertSharedProps> {}

export function AlertTitle({ className, variant, status, size, ...props }: AlertTitleProps) {
  return (
    <ark.h2
      className={alertRecipe.title({
        className,
        variant,
        status,
        size,
      })}
      data-scope="alert"
      data-part="title"
      {...props}
    />
  )
}

AlertTitle.displayName = ALERT_TITLE_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Alert description component that provides additional context to the alert.
 * Renders as a paragraph element below the title for extended information.
 * Automatically linked via aria-describedby from the root component.
 *
 * @example
 * ```tsx
 * <Alert.Description>Your changes have been saved successfully.</Alert.Description>
 * <Alert.Description>Please free up space before continuing.</Alert.Description>
 * ```
 */
export interface AlertDescriptionProps
  extends Assign<React.ComponentProps<'p'>, AlertSharedProps> {}

export function AlertDescription({ className, size, ...props }: AlertDescriptionProps) {
  return (
    <p
      className={alertRecipe.description({
        className,
        size,
      })}
      data-scope="alert"
      data-part="description"
      {...props}
    />
  )
}

AlertDescription.displayName = ALERT_DESCRIPTION_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Alert actions component that provides a container for action buttons or links.
 * Displays children in a horizontal flex layout with consistent spacing.
 * Commonly used with LinkButton or Button components for alert actions.
 *
 * @example
 * ```tsx
 * <Alert.Actions>
 *   <LinkButton href="/details">View Details</LinkButton>
 *   <LinkButton href="/dismiss">Dismiss</LinkButton>
 * </Alert.Actions>
 * ```
 */
export interface AlertActionsProps extends React.ComponentProps<'div'> {}

export function AlertActions({ className, ...props }: AlertActionsProps) {
  return (
    <div
      className={cn('flex items-center gap-x-2', className)}
      data-scope="alert"
      data-part="actions"
      {...props}
    />
  )
}

AlertActions.displayName = ALERT_ACTIONS_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Alert close button component that allows users to dismiss the alert.
 * Displays a close icon (X) button with proper accessibility attributes.
 *
 * @example
 * ```tsx
 * <Alert.Close />
 * <Alert.Close aria-label="Dismiss notification" />
 * ```
 */
export interface AlertCloseTriggerProps extends React.ComponentProps<'button'>, AlertSharedProps {}

export function AlertCloseTrigger({
  className,
  status,
  variant,
  size,
  'aria-label': ariaLabel = 'Close',
  ...props
}: AlertCloseTriggerProps) {
  return (
    <button
      type="button"
      className={alertRecipe.closeTrigger({
        className,
        status,
        variant,
        size,
      })}
      data-scope="alert"
      data-part="close"
      aria-label={ariaLabel}
      {...props}
    >
      <RiCloseLine aria-hidden />
    </button>
  )
}

AlertCloseTrigger.displayName = ALERT_CLOSE_TRIGGER_NAME
