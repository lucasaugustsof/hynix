import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'

import {
  type RemixiconComponentType,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiMagicFill,
} from '@remixicon/react'
import { cn } from '@/utils/cn'
import type { PolymorphicProps } from '@/utils/polymorphic'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const ALERT_ROOT_NAME = 'Alert.Root'
const ALERT_ICON_NAME = 'Alert.Icon'
const ALERT_TITLE_NAME = 'Alert.Title'
const ALERT_DESCRIPTION_NAME = 'Alert.Description'
const ALERT_ACTIONS_NAME = 'Alert.Actions'
const ALERT_CLOSE_TRIGGER_NAME = 'Alert.CloseTrigger'

const alertVariants = tv({
  slots: {
    root: [
      'inline-flex w-full items-center gap-x-2 rounded-lg',
      '[&_[data-scope=link-button][data-part=root]]:text-inherit',
    ],
    icon: 'shrink-0',
    title: 'line-clamp-2 flex-1 overflow-ellipsis',
    description: 'mt-1 text-paragraph-sm',
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
        root: 'p-2',
        title: 'text-paragraph-xs',
        icon: 'size-4',
        closeTrigger: '[&_svg]:size-4',
      },
      sm: {
        root: 'px-2.5 py-2',
        title: 'text-paragraph-sm',
        icon: 'size-5',
        closeTrigger: '[&_svg]:size-5',
      },
      lg: {
        root: 'items-start p-3.5 pb-4',
        title: 'text-label-sm',
        icon: 'size-5',
        closeTrigger: '[&_svg]:size-5',
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
})

const {
  root: rootClasses,
  icon: iconClasses,
  title: titleClasses,
  description: descriptionClasses,
  closeTrigger: closeTriggerClasses,
} = alertVariants()

type AlertSharedProps = VariantProps<typeof alertVariants>

interface AlertRootProps extends Assign<React.ComponentProps<'div'>, AlertSharedProps> {}

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
  const computedAriaLive = ariaLive ?? (status === 'danger' ? 'assertive' : 'polite')

  return (
    <div
      {...props}
      role="alert"
      className={rootClasses({
        className,
        status,
        variant,
        size,
      })}
      data-scope="alert"
      data-part="root"
      aria-live={computedAriaLive}
      aria-atomic={ariaAtomic}
    >
      {renderChildren({
        children,
        props: {
          status,
          variant,
          size,
        },
        displayNames: [
          ALERT_ICON_NAME,
          ALERT_TITLE_NAME,
          ALERT_CLOSE_TRIGGER_NAME,
          ALERT_DESCRIPTION_NAME,
        ],
      })}
    </div>
  )
}

AlertRoot.displayName = ALERT_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function AlertIcon<T extends React.ElementType = RemixiconComponentType>({
  as,
  children,
  className,
  status = 'information',
  variant,
  size,
  ...props
}: PolymorphicProps<T, AlertSharedProps>) {
  const statusIconMap = {
    danger: RiErrorWarningFill,
    success: RiCheckboxCircleFill,
    warning: RiAlertFill,
    information: RiInformationFill,
    feature: RiMagicFill,
  } as Record<typeof status, RemixiconComponentType>

  const Component = as || statusIconMap[status]

  return (
    <Component
      {...props}
      className={iconClasses({
        className,
        status,
        variant,
        size,
      })}
      aria-hidden
      data-scope="alert"
      data-part="icon"
    />
  )
}

AlertIcon.displayName = ALERT_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertTitleProps extends Assign<React.ComponentProps<typeof ark.span>, AlertSharedProps> {}

export function AlertTitle({ className, variant, status, size, ...props }: AlertTitleProps) {
  return (
    <ark.span
      {...props}
      className={titleClasses({
        className,
        variant,
        status,
        size,
      })}
      data-scope="alert"
      data-part="title"
    />
  )
}

AlertTitle.displayName = ALERT_TITLE_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertDescriptionProps extends Assign<React.ComponentProps<'p'>, AlertSharedProps> {}

export function AlertDescription({ className, size, ...props }: AlertDescriptionProps) {
  return (
    <p
      {...props}
      className={descriptionClasses({
        className,
        size,
      })}
      data-scope="alert"
      data-part="description"
    />
  )
}

AlertDescription.displayName = ALERT_DESCRIPTION_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertActionsProps extends React.ComponentProps<'div'> {}

export function AlertActions({ className, ...props }: AlertActionsProps) {
  return (
    <div
      {...props}
      className={cn('flex items-center gap-x-2', className)}
      data-scope="alert"
      data-part="actions"
    />
  )
}

AlertActions.displayName = ALERT_ACTIONS_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertCloseTriggerProps extends React.ComponentProps<'button'>, AlertSharedProps {}

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
      {...props}
      type="button"
      className={closeTriggerClasses({
        className,
        status,
        variant,
        size,
      })}
      data-scope="alert"
      data-part="close"
      aria-label={ariaLabel}
    >
      <RiCloseLine aria-hidden />
    </button>
  )
}

AlertCloseTrigger.displayName = ALERT_CLOSE_TRIGGER_NAME
