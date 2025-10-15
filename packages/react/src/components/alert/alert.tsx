import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'

import { X } from 'lucide-react'
import { useCloneChildren } from '@/hooks/use-clone-children'
import type { VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'
import { alert } from './alert-slots'

const ALERT_ROOT_NAME = 'Alert.Root'
const ALERT_ICON_NAME = 'Alert.Icon'
const ALERT_TITLE_NAME = 'Alert.Title'
const ALERT_LINK_BUTTON_NAME = 'Alert.LinkButton'
const ALERT_CLOSE_NAME = 'Alert.Close'

type AlertSharedProps = VariantProps<typeof alert.root>

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
      className={alert.root({
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

export function AlertIcon<T extends React.ElementType = typeof ark.div>({
  as,
  className,
  status,
  variant,
  size,
  ...props
}: PolymorphicProps<T> & AlertSharedProps) {
  const Component = as || ark.div

  return (
    <Component
      {...props}
      className={alert.icon({
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
      className={alert.title({
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
      className={alert.close({
        className,
        status,
        variant,
        size,
      })}
    >
      <X />
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
      className={alert.linkButton({
        className,
        status,
        variant,
        size,
      })}
    />
  )
}

AlertLinkButton.displayName = ALERT_LINK_BUTTON_NAME
