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

import { cloneChildrenWithProps } from '@/lib/clone-children-with-props'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from '@/lib/tv'
import placeholderDark from './assets/placeholder-dark.png'
import placeholderLight from './assets/placeholder-light.png'

const AVATAR_ROOT_PROVIDER_NAME = 'Avatar.RootProvider'
const AVATAR_ROOT_NAME = 'Avatar.Root'
const AVATAR_IMAGE_NAME = 'Avatar.Image'
const AVATAR_FALLBACK_NAME = 'Avatar.Fallback'
const AVATAR_POSITIONER_NAME = 'Avatar.Positioner'
const AVATAR_STATUS_NAME = 'Avatar.Status'
const AVATAR_BADGE_NAME = 'Avatar.Badge'
const AVATAR_NOTIFICATION_NAME = 'Avatar.Notification'

const createAvatarRecipe = tv({
  slots: {
    root: 'relative inline-flex shrink-0',
    image: 'size-full rounded-full object-cover',
    fallback: [
      'grid flex-1 place-items-center rounded-full bg-brand',
      'font-medium font-sans text-fg-2 uppercase',
    ],
    positioner: 'absolute grid size-8 shrink-0 place-items-center drop-shadow-xs',
  },
  variants: {
    size: {
      '80': {
        root: 'size-20',
        fallback: 'text-2xl/8',
      },
      '72': {
        root: 'size-18',
        fallback: 'text-2xl/8',
      },
      '64': {
        root: 'size-16',
        fallback: 'text-2xl/8',
      },
      '56': {
        root: 'size-14',
        fallback: 'text-lg/6 tracking-[-0.01688rem]',
      },
      '48': {
        root: 'size-12',
        fallback: 'text-lg/6 tracking-[-0.01688rem]',
      },
      '40': {
        root: 'size-10',
        fallback: 'text-base tracking-[-0.011rem]',
      },
      '32': {
        root: 'size-8',
        fallback: 'text-sm/5 tracking-[-0.00525rem]',
      },
      '24': {
        root: 'size-6',
        fallback: 'text-xs/4',
      },
      '20': {
        root: 'size-5',
        fallback: 'text-xs/4',
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

const avatarRecipe = createAvatarRecipe()

type AvatarSharedProps = VariantProps<typeof createAvatarRecipe>

////////////////////////////////////////////////////////////////////////////////////

export const AvatarRootProvider = ArkAvatar.RootProvider
AvatarRootProvider.displayName = AVATAR_ROOT_PROVIDER_NAME

/**
 * Avatar root component that wraps the entire avatar composition.
 * Automatically injects size props to child components.
 *
 * @example
 * ```tsx
 * <Avatar.Root size="56">
 *   <Avatar.Image src="avatar.jpg" alt="User" />
 *   <Avatar.Fallback>JD</Avatar.Fallback>
 * </Avatar.Root>
 * ```
 */
export interface AvatarRootProps extends Assign<ArkAvatarRootProps, AvatarSharedProps> {}

export function AvatarRoot({ children, className, size, ...props }: AvatarRootProps) {
  const clonedChildren = cloneChildrenWithProps(children, {
    keyPrefix: 'Avatar',
    props: {
      size,
    },
    targetDisplayNames: [AVATAR_IMAGE_NAME, AVATAR_FALLBACK_NAME, AVATAR_POSITIONER_NAME],
  })

  return (
    <ArkAvatar.Root
      {...props}
      className={avatarRecipe.root({
        className,
        size,
      })}
    >
      {clonedChildren}
    </ArkAvatar.Root>
  )
}

AvatarRoot.displayName = AVATAR_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar image component that displays the user's profile picture.
 * Automatically falls back to AvatarFallback if the image fails to load.
 * Supports theme-aware placeholder images.
 *
 * @example
 * ```tsx
 * <Avatar.Image src="https://github.com/user.png" alt="User Name" />
 * <Avatar.Image showPlaceholder alt="Placeholder" />
 * ```
 */
interface AvatarImageProps extends Assign<ArkAvatarImageProps, AvatarSharedProps> {
  /**
   * If true, shows a theme-aware placeholder image instead of src
   * @default false
   */
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

    const placeholderImg = isDarkTheme ? placeholderDark : placeholderLight

    return (
      <ArkAvatar.Image
        {...props}
        ref={ref}
        className={avatarRecipe.image({
          className,
          size,
        })}
        src={showPlaceholder ? placeholderImg : src}
      />
    )
  }
)

AvatarImage.displayName = AVATAR_IMAGE_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar fallback component shown when the image fails to load.
 * Typically displays user initials or a default icon.
 * For small avatars (≤24px), automatically shows only the first character.
 *
 * @example
 * ```tsx
 * <Avatar.Fallback>JD</Avatar.Fallback>
 * <Avatar.Fallback>{getInitials('John Doe')}</Avatar.Fallback>
 * ```
 */
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
      {...props}
      className={avatarRecipe.fallback({
        className,
        size,
      })}
    >
      {fallbackContent}
    </ArkAvatar.Fallback>
  )
}

AvatarFallback.displayName = AVATAR_FALLBACK_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar positioner component for placing badges, status indicators, or notifications.
 * Automatically scales based on avatar size and supports top/bottom placement.
 *
 * @example
 * ```tsx
 * <Avatar.Positioner placement="bottom">
 *   <Avatar.Status type="online" />
 * </Avatar.Positioner>
 *
 * <Avatar.Positioner placement="top">
 *   <Avatar.Badge src="/verified.svg" alt="Verified" />
 * </Avatar.Positioner>
 * ```
 */
interface AvatarPositionerProps extends Assign<React.ComponentProps<'div'>, AvatarSharedProps> {
  /**
   * Position relative to the avatar
   * @default "bottom"
   */
  placement?: 'top' | 'bottom'
}

export function AvatarPositioner({
  children,
  className,
  placement = 'bottom',
  size,
}: AvatarPositionerProps) {
  return (
    <div
      className={cn(
        avatarRecipe.positioner({
          className:
            placement === 'bottom' ? 'bottom-0 origin-bottom-right' : 'top-0 origin-top-right',
          size,
        }),
        className
      )}
      data-scope="avatar"
      data-part="positioner"
    >
      {children}
    </div>
  )
}

AvatarPositioner.displayName = AVATAR_POSITIONER_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar status indicator component that displays user presence status.
 * Shows a colored dot indicator: green (online), gray (offline), red (busy), yellow (away).
 *
 * @example
 * ```tsx
 * <Avatar.Status type="online" />
 * <Avatar.Status type="busy" />
 * ```
 */
interface AvatarStatusProps extends React.ComponentProps<'span'> {
  /**
   * User presence status type
   * @default "offline"
   */
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
      {...props}
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
    />
  )
}

AvatarStatus.displayName = AVATAR_STATUS_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar badge component for displaying icon badges (verified, premium, etc.).
 * Supports both informative and decorative badges with proper accessibility.
 *
 * @example
 * ```tsx
 * <Avatar.Badge src="/verified.svg" alt="Verified account" />
 * <Avatar.Badge src="/premium.svg" alt="Premium member" />
 * <Avatar.Badge src="/decoration.svg" alt="" decorative />
 * ```
 */
interface AvatarBadgeProps extends React.ComponentProps<typeof ark.img> {
  /**
   * If true, marks the badge as decorative (alt="" and aria-hidden="true")
   * Use this only if the badge's meaning is conveyed elsewhere
   * @default false
   */
  decorative?: boolean
}

export function AvatarBadge({ alt, decorative: isDecorative = false, ...props }: AvatarBadgeProps) {
  return (
    <ark.img
      {...props}
      role="img"
      alt={isDecorative ? '' : alt}
      data-scope="avatar"
      data-part="badge"
      aria-hidden={isDecorative}
    />
  )
}

AvatarBadge.displayName = AVATAR_BADGE_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Avatar notification indicator component that displays an unread notification dot.
 * Shows a red dot to indicate pending notifications or alerts.
 *
 * @example
 * ```tsx
 * <Avatar.Positioner>
 *   <Avatar.Notification />
 * </Avatar.Positioner>
 * ```
 */
interface AvatarNotificationProps extends React.ComponentProps<'span'> {}

export function AvatarNotification({
  className,
  'aria-label': ariaLabel = 'Unread notifications',
  ...props
}: AvatarNotificationProps) {
  return (
    <span
      {...props}
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
    />
  )
}

AvatarNotification.displayName = AVATAR_NOTIFICATION_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function to extract initials from a full name.
 * Takes the first character of each word and returns them uppercased.
 *
 * @param name - Full name to extract initials from
 * @returns Uppercase initials string
 *
 * @example
 * ```tsx
 * getInitials('John Doe') // Returns "JD"
 * getInitials('Mary Jane Watson') // Returns "MJ"
 * getInitials('Prince') // Returns "P"
 * ```
 */
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
