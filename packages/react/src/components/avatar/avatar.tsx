'use client'

import * as React from 'react'
import type { Assign } from '@ark-ui/react'
import {
  Avatar as ArkAvatar,
  type AvatarFallbackProps as ArkAvatarFallbackProps,
  type AvatarImageProps as ArkAvatarImageProps,
  type AvatarRootProps as ArkAvatarRootProps,
} from '@ark-ui/react/avatar'
import { ark } from '@ark-ui/react/factory'

import { cn } from '@/utils/cn'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const AVATAR_ROOT_PROVIDER_NAME = 'Avatar.RootProvider'
const AVATAR_ROOT_NAME = 'Avatar.Root'
const AVATAR_IMAGE_NAME = 'Avatar.Image'
const AVATAR_FALLBACK_NAME = 'Avatar.Fallback'
const AVATAR_POSITIONER_NAME = 'Avatar.Positioner'
const AVATAR_STATUS_NAME = 'Avatar.Status'
const AVATAR_BADGE_NAME = 'Avatar.Badge'
const AVATAR_NOTIFICATION_NAME = 'Avatar.Notification'

const avatarVariants = tv({
  slots: {
    root: 'relative inline-flex shrink-0',
    image: 'size-full rounded-full object-cover',
    fallback: ['grid flex-1 place-items-center rounded-full bg-brand', 'text-fg-2 uppercase'],
    positioner: 'absolute grid size-8 shrink-0 place-items-center drop-shadow-xs',
  },
  variants: {
    size: {
      '80': {
        root: 'size-20',
        fallback: 'text-title-h5',
      },
      '72': {
        root: 'size-18',
        fallback: 'text-title-h5',
      },
      '64': {
        root: 'size-16',
        fallback: 'text-title-h5',
      },
      '56': {
        root: 'size-14',
        fallback: 'text-label-lg',
      },
      '48': {
        root: 'size-12',
        fallback: 'text-label-lg',
      },
      '40': {
        root: 'size-10',
        fallback: 'text-label-md',
      },
      '32': {
        root: 'size-8',
        fallback: 'text-label-sm',
      },
      '24': {
        root: 'size-6',
        fallback: 'text-label-xs',
      },
      '20': {
        root: 'size-5',
        fallback: 'text-label-xs',
      },
    },
  },
  compoundVariants: [
    {
      size: ['80', '72'],
      class: {
        positioner: '-right-2',
      },
    },
    {
      size: '64',
      class: {
        positioner: '-right-2 scale-[.875]',
      },
    },
    {
      size: '56',
      class: {
        positioner: '-right-1.5 scale-75',
      },
    },
    {
      size: '48',
      class: {
        positioner: '-right-1.5 scale-[.625]',
      },
    },
    {
      size: '40',
      class: {
        positioner: '-right-1.5 scale-[.5625]',
      },
    },
    {
      size: '32',
      class: {
        positioner: '-right-1.5 scale-50',
      },
    },
    {
      size: '24',
      class: {
        positioner: '-right-1 scale-[.375]',
      },
    },
    {
      size: '20',
      class: {
        positioner: '-right-1 scale-[.3125]',
      },
    },
  ],
  defaultVariants: {
    size: '56',
  },
})

const {
  root: rootClasses,
  image: imageClasses,
  fallback: fallbackClasses,
  positioner: positionerClasses,
} = avatarVariants()

type AvatarSharedProps = VariantProps<typeof avatarVariants>

////////////////////////////////////////////////////////////////////////////////////

export const AvatarRootProvider = ArkAvatar.RootProvider
AvatarRootProvider.displayName = AVATAR_ROOT_PROVIDER_NAME

interface AvatarRootProps extends Assign<ArkAvatarRootProps, AvatarSharedProps> {}

export function AvatarRoot({ children, className, size, ...props }: AvatarRootProps) {
  return (
    <ArkAvatar.Root
      className={rootClasses({
        className,
        size,
      })}
      {...props}
    >
      {renderChildren({
        children,
        displayNames: [AVATAR_IMAGE_NAME, AVATAR_FALLBACK_NAME, AVATAR_POSITIONER_NAME],
        props: {
          size,
        },
      })}
    </ArkAvatar.Root>
  )
}

AvatarRoot.displayName = AVATAR_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarImageProps extends Assign<ArkAvatarImageProps, AvatarSharedProps> {
  showPlaceholder?: boolean
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, size, src, showPlaceholder = false, ...props }, ref) => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false)

    React.useEffect(() => {
      if (typeof document === 'undefined') return

      const theme = document.documentElement.getAttribute('data-theme')
      setIsDarkTheme(theme === 'dark')

      const observer = new MutationObserver(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme')
        setIsDarkTheme(currentTheme === 'dark')
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      })

      return () => observer.disconnect()
    }, [])

    const placeholderImgSrc = `https://storybook.hynix.cc/images/placeholder-${isDarkTheme ? 'dark' : 'light'}.png`

    return (
      <ArkAvatar.Image
        ref={ref}
        className={imageClasses({
          className,
          size,
        })}
        src={showPlaceholder ? placeholderImgSrc : src}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = AVATAR_IMAGE_NAME

////////////////////////////////////////////////////////////////////////////////////

export function AvatarFallback({
  children,
  className,
  size = '80',
  ...props
}: Assign<ArkAvatarFallbackProps, AvatarSharedProps>) {
  let fallbackContent = children

  if (typeof children === 'string' && Number(size) <= 24) {
    fallbackContent = children.charAt(0).toUpperCase()
  }

  return (
    <ArkAvatar.Fallback
      className={fallbackClasses({
        className,
        size,
      })}
      {...props}
    >
      {fallbackContent}
    </ArkAvatar.Fallback>
  )
}

AvatarFallback.displayName = AVATAR_FALLBACK_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarPositionerProps extends Assign<React.ComponentProps<'div'>, AvatarSharedProps> {
  placement?: 'top' | 'bottom'
}

export function AvatarPositioner({
  children,
  className,
  placement = 'bottom',
  size,
  ...props
}: AvatarPositionerProps) {
  return (
    <div
      className={cn(
        positionerClasses({
          className:
            placement === 'bottom' ? 'bottom-0 origin-bottom-right' : 'top-0 origin-top-right',
          size,
        }),
        className
      )}
      data-scope="avatar"
      data-part="positioner"
      {...props}
    >
      {children}
    </div>
  )
}

AvatarPositioner.displayName = AVATAR_POSITIONER_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarStatusProps extends React.ComponentProps<'span'> {
  type?: 'online' | 'offline' | 'busy' | 'away'
}

export function AvatarStatus({ className, type = 'offline', ...props }: AvatarStatusProps) {
  const STATUS_COLOR_MAP = {
    online: '[--avatar-status-color:var(--color-success)]',
    offline: '[--avatar-status-color:var(--color-fill-5)]',
    busy: '[--avatar-status-color:var(--color-danger)]',
    away: '[--avatar-status-color:var(--color-warning)]',
  }

  const STATUS_LABEL_MAP = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    away: 'Away',
  }

  return (
    <span
      role="status"
      className={cn(
        'relative block size-5 rounded-full bg-surface-1',
        'before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-3 before:rounded-[inherit] before:bg-(--avatar-status-color) before:content-[""]',
        STATUS_COLOR_MAP[type],
        className
      )}
      data-scope="avatar"
      data-part="status"
      aria-label={STATUS_LABEL_MAP[type]}
      aria-hidden
      {...props}
    />
  )
}

AvatarStatus.displayName = AVATAR_STATUS_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarBadgeProps extends React.ComponentProps<typeof ark.img> {
  decorative?: boolean
}

export function AvatarBadge({ alt, decorative: isDecorative = false, ...props }: AvatarBadgeProps) {
  return (
    <ark.img
      role="img"
      alt={isDecorative ? '' : alt}
      data-scope="avatar"
      data-part="badge"
      aria-hidden={isDecorative}
      {...props}
    />
  )
}

AvatarBadge.displayName = AVATAR_BADGE_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarNotificationProps extends React.ComponentProps<'span'> {}

export function AvatarNotification({
  className,
  'aria-label': ariaLabel = 'Unread notifications',
  ...props
}: AvatarNotificationProps) {
  return (
    <span
      role="status"
      className={cn(
        'relative block size-4 rounded-full bg-surface-1',
        'before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-3 before:rounded-[inherit] before:bg-danger before:content-[""]',
        className
      )}
      data-scope="avatar"
      data-part="notification"
      aria-label={ariaLabel}
      aria-hidden
      {...props}
    />
  )
}

AvatarNotification.displayName = AVATAR_NOTIFICATION_NAME

////////////////////////////////////////////////////////////////////////////////////

export function getInitials(name: string): string {
  if (!name || typeof name !== 'string') return ''

  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''

  const initials = words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')

  return initials
}
