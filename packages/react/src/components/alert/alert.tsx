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
import { useCloneChildren } from '@/hooks/use-clone-children'
import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const ALERT_ROOT_NAME = 'Alert.Root'
const ALERT_ICON_NAME = 'Alert.Icon'
const ALERT_TITLE_NAME = 'Alert.Title'
const ALERT_LINK_BUTTON_NAME = 'Alert.LinkButton'
const ALERT_CLOSE_NAME = 'Alert.Close'

const createAlertRecipe = tv({
  slots: {
    root: 'inline-flex items-center gap-x-2 rounded-lg font-sans',
    icon: '',
    title: 'line-clamp-2 flex-1 overflow-ellipsis',
    linkButton: 'font-medium underline underline-offset-2',
    close: 'cursor-pointer opacity-72',
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
        icon: 'fill-danger',
        close: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'danger',
      class: {
        root: 'bg-danger/15 text-fg-1',
        icon: 'fill-danger',
        close: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'danger',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'fill-danger',
        close: 'opacity-40',
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
        icon: 'fill-success',
        close: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'success',
      class: {
        root: 'bg-success/15 text-fg-1',
        icon: 'fill-success',
        close: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'success',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'fill-success',
        close: 'opacity-40',
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
        icon: 'fill-warning',
        close: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'warning',
      class: {
        root: 'bg-warning/15 text-fg-1',
        icon: 'fill-warning',
        close: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'warning',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'fill-warning',
        close: 'opacity-40',
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
        icon: 'fill-information',
        close: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'information',
      class: {
        root: 'bg-information/15 text-fg-1',
        icon: 'fill-information',
        close: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'information',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'fill-information',
        close: 'opacity-40',
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
        icon: 'fill-fill-5',
        close: 'opacity-40',
      },
    },
    {
      variant: 'lighter',
      status: 'feature',
      class: {
        root: 'bg-fill-5/15 text-fg-1',
        icon: 'fill-fill-5',
        close: 'opacity-40',
      },
    },
    {
      variant: 'stroke',
      status: 'feature',
      class: {
        root: 'inset-ring-1 inset-ring-border bg-surface-2 text-fg-1 shadow-xs',
        icon: 'fill-fill-5',
        close: 'opacity-40',
      },
    },
    // #region end: feature
  ],
  compoundSlots: [
    {
      slots: ['title', 'linkButton'],
      size: 'xs',
      class: 'text-xs/4',
    },
    {
      slots: ['title', 'linkButton'],
      size: 'sm',
      class: 'text-sm/5 tracking-[-0.00525rem]',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    status: 'information',
    size: 'xs',
  },
})

const alertRecipe = createAlertRecipe()

type AlertSharedProps = VariantProps<typeof createAlertRecipe>

interface AlertRootProps extends Assign<React.ComponentProps<'div'>, AlertSharedProps> {}

export function AlertRoot({
  children,
  className,
  status,
  variant,
  size,
  ...props
}: AlertRootProps) {
  const { id, cloneChildren } = useCloneChildren({
    props: {
      status,
      variant,
      size,
    },
    children,
    idPrefix: 'alert',
    targets: [ALERT_ICON_NAME, ALERT_TITLE_NAME, ALERT_LINK_BUTTON_NAME, ALERT_CLOSE_NAME],
  })

  return (
    <div
      {...props}
      role="alert"
      className={alertRecipe.root({
        className,
        status,
        variant,
        size,
      })}
      id={id}
    >
      {cloneChildren(children)}
    </div>
  )
}

AlertRoot.displayName = ALERT_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function AlertIcon<T extends React.ElementType = RemixiconComponentType>({
  as,
  className,
  status = 'information',
  variant,
  size,
  ...props
}: PolymorphicProps<T> & AlertSharedProps) {
  const alertIconMap: Record<typeof status, RemixiconComponentType> = {
    danger: RiErrorWarningFill,
    success: RiCheckboxCircleFill,
    warning: RiAlertFill,
    information: RiInformationFill,
    feature: RiMagicFill,
  }

  const Component = as || alertIconMap[status]

  return (
    <Component
      {...props}
      className={alertRecipe.icon({
        className,
        status,
        variant,
        size,
      })}
    />
  )
}

AlertIcon.displayName = ALERT_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertTitleProps extends Assign<React.ComponentProps<typeof ark.h2>, AlertSharedProps> {}

export function AlertTitle({ className, variant, status, size, ...props }: AlertTitleProps) {
  return (
    <ark.h2
      {...props}
      className={alertRecipe.title({
        className,
        variant,
        status,
        size,
      })}
    />
  )
}

AlertTitle.displayName = ALERT_TITLE_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertCloseProps extends React.ComponentProps<'button'>, AlertSharedProps {}

export function AlertClose({ className, status, variant, size }: AlertCloseProps) {
  return (
    <button
      type="button"
      className={alertRecipe.close({
        className,
        status,
        variant,
        size,
      })}
    >
      <RiCloseLine />
    </button>
  )
}

AlertClose.displayName = ALERT_CLOSE_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AlertLinkButtonProps extends React.ComponentProps<typeof ark.a>, AlertSharedProps {}

export function AlertLinkButton({
  className,
  status,
  variant,
  size,
  ...props
}: AlertLinkButtonProps) {
  return (
    <ark.a
      {...props}
      className={alertRecipe.linkButton({
        className,
        status,
        variant,
        size,
      })}
    />
  )
}

AlertLinkButton.displayName = ALERT_LINK_BUTTON_NAME
