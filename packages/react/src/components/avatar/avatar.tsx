import * as React from 'react'
import type { Assign } from '@ark-ui/react'
import {
  Avatar as ArkAvatar,
  type AvatarFallbackProps as ArkAvatarFallbackProps,
  type AvatarImageProps as ArkAvatarImageProps,
  type AvatarRootProps as ArkAvatarRootProps,
} from '@ark-ui/react/avatar'
import { ark } from '@ark-ui/react/factory'

import { useCloneChildren } from '@/hooks/use-clone-children'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from '@/lib/tv'

const AVATAR_ROOT_NAME = 'Avatar.Root'
const AVATAR_IMAGE_NAME = 'Avatar.Image'
const AVATAR_FALLBACK_NAME = 'Avatar.Fallback'
const AVATAR_POSITIONER_NAME = 'Avatar.Positioner'
const AVATAR_STATUS_NAME = 'Avatar.Status'
const AVATAR_BADGE_NAME = 'Avatar.Badge'

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
    size: '80',
  },
})

const avatarRecipe = createAvatarRecipe()

type AvatarSharedProps = VariantProps<typeof createAvatarRecipe>

////////////////////////////////////////////////////////////////////////////////////

export interface AvatarRootProps extends Assign<ArkAvatarRootProps, AvatarSharedProps> {}

export function AvatarRoot({ children, className, size, ...props }: AvatarRootProps) {
  const { id, cloneChildren } = useCloneChildren({
    props: {
      size,
    },
    idPrefix: 'avatar',
    targets: [AVATAR_IMAGE_NAME, AVATAR_FALLBACK_NAME, AVATAR_POSITIONER_NAME],
    children,
  })

  return (
    <ArkAvatar.Root
      {...props}
      id={id}
      className={avatarRecipe.root({
        className,
        size,
      })}
    >
      {cloneChildren()}
    </ArkAvatar.Root>
  )
}

AvatarRoot.displayName = AVATAR_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  Assign<ArkAvatarImageProps, AvatarSharedProps>
>(({ className, size, ...props }, ref) => {
  return (
    <ArkAvatar.Image
      {...props}
      ref={ref}
      className={avatarRecipe.image({
        className,
        size,
      })}
    />
  )
})

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

interface AvatarPositionerProps extends AvatarSharedProps {
  children: React.ReactNode
  placement?: 'top' | 'bottom'
}

export function AvatarPositioner({ children, placement = 'bottom', size }: AvatarPositionerProps) {
  return (
    <div
      className={avatarRecipe.positioner({
        className:
          placement === 'bottom' ? 'bottom-0 origin-bottom-right' : 'top-0 origin-top-right',
        size,
      })}
      data-scope="avatar"
      data-part="positioner"
    >
      {children}
    </div>
  )
}

AvatarPositioner.displayName = AVATAR_POSITIONER_NAME

////////////////////////////////////////////////////////////////////////////////////

interface AvatarStatusProps extends React.AriaAttributes {
  type?: 'online' | 'offline' | 'busy' | 'away'
}

export function AvatarStatus({ type = 'offline', ...props }: AvatarStatusProps) {
  const STATUS_COLOR_MAP = {
    online: '[--avatar-status-color:var(--color-success)]',
    offline: '[--avatar-status-color:var(--color-fill-5)]',
    busy: '[--avatar-status-color:var(--color-danger)]',
    away: '[--avatar-status-color:var(--color-warning)]',
  } as Record<typeof type, string>

  return (
    <div
      {...props}
      role="status"
      className={cn('inline-flex shrink-0 items-center justify-center', STATUS_COLOR_MAP[type])}
      data-scope="avatar"
      data-part="status"
    >
      <span
        className={cn(
          'relative block size-5 rounded-full bg-surface-1',
          'before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-3 before:rounded-[inherit] before:bg-(--avatar-status-color) before:content-[""]'
        )}
        aria-hidden
      />
    </div>
  )
}

AvatarStatus.displayName = AVATAR_STATUS_NAME

////////////////////////////////////////////////////////////////////////////////////

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

export function getInitials(name: string) {
  const words = name.split(' ')
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('')

  return initials
}
