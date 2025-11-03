import * as React from 'react'
import type { Assign } from '@ark-ui/react'
import {
  Avatar as ArkAvatar,
  type AvatarFallbackProps as ArkAvatarFallbackProps,
  type AvatarImageProps as ArkAvatarImageProps,
  type AvatarRootProps as ArkAvatarRootProps,
} from '@ark-ui/react/avatar'

import { useCloneChildren } from '@/hooks/use-clone-children'
import { tv, type VariantProps } from '@/lib/tv'

const AVATAR_ROOT_NAME = 'Avatar.Root'
const AVATAR_IMAGE_NAME = 'Avatar.Image'
const AVATAR_FALLBACK_NAME = 'Avatar.Fallback'
const AVATAR_INDICATOR_NAME = 'Avatar.Indicator'

const createAvatarRecipe = tv({
  slots: {
    root: 'relative inline-flex shrink-0',
    image: 'size-full rounded-full object-cover',
    fallback: [
      'grid flex-1 place-items-center rounded-full bg-brand',
      'font-medium font-sans text-fg-2',
    ],
    indicator: '-right-2 absolute grid size-8 shrink-0 place-items-center',
  },
  variants: {
    size: {
      '80': {
        root: 'size-20',
      },
      '72': {
        root: 'size-18',
      },
      '64': {
        root: 'size-16',
      },
      '56': {
        root: 'size-14',
      },
      '48': {
        root: 'size-12',
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
      },
      '20': {
        root: 'size-5',
      },
    },
  },
  compoundVariants: [
    {
      size: ['80', '72', '64'],
      class: {
        fallback: 'text-2xl/8',
      },
    },
    {
      size: ['56', '48'],
      class: {
        fallback: 'text-lg/6 tracking-[-0.01688rem]',
      },
    },
    {
      size: ['24', '20'],
      class: {
        fallback: 'text-xs/4',
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
    targets: [AVATAR_IMAGE_NAME, AVATAR_FALLBACK_NAME],
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

interface AvatarIndicatorProps {
  children: React.ReactNode
  placement?: 'top' | 'bottom'
}

export function AvatarIndicator({ children, placement = 'bottom' }: AvatarIndicatorProps) {
  return (
    <div
      className={avatarRecipe.indicator({
        className: placement === 'bottom' ? '-bottom-2' : '-top-2',
      })}
      data-scope="avatar"
      data-part="indicator"
    >
      {children}
    </div>
  )
}

AvatarIndicator.displayName = AVATAR_INDICATOR_NAME

////////////////////////////////////////////////////////////////////////////////////

export function getInitials(name: string) {
  const words = name.split(' ')
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('')

  return initials
}
