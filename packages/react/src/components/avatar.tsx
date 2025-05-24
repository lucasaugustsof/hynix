import type { Assign } from '@ark-ui/react'
import { Avatar as ArkAvatar, useAvatar } from '@ark-ui/react/avatar'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const avatarVariantsSlots = tv({
  slots: {
    root: 'relative inline-flex aspect-square shrink-0 select-none overflow-hidden rounded-full border border-border',
    fallback:
      'absolute grid size-full place-items-center whitespace-nowrap bg-brand font-sans font-semibold text-fg-2',
    image: 'pointer-events-none object-cover',
  },
  variants: {
    size: {
      xs: {
        root: 'h-7',
      },
      sm: {
        root: 'h-8',
      },
      md: {
        root: 'h-10',
        fallback: 'text-sm/5.5',
      },
      lg: {
        root: 'h-11',
        fallback: 'text-lg/7',
      },
      xl: {
        root: 'h-14',
        fallback: 'text-xl/8',
      },
      '2xl': {
        root: 'h-18',
        fallback: 'text-2xl/9.5',
      },
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm'],
      class: {
        fallback: 'text-xs/4.5',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})

type AvatarProps = Assign<
  React.CustomComponentPropsWithRef<typeof ArkAvatar.Root>,
  VariantProps<typeof avatarVariantsSlots>
> & {
  src: string
  altText: string
  fallback?: React.ReactNode
}

function Avatar({
  className,
  size,
  src,
  altText,
  fallback: renderFallback,
  ...props
}: AvatarProps) {
  const { root, fallback, image } = avatarVariantsSlots({
    size,
  })

  return (
    <ArkAvatar.Root
      {...props}
      className={cn(
        root({
          className,
        }),
      )}
    >
      {renderFallback && (
        <ArkAvatar.Fallback className={cn(fallback())}>
          {renderFallback}
        </ArkAvatar.Fallback>
      )}

      <ArkAvatar.Image className={cn(image())} src={src} alt={altText} />
    </ArkAvatar.Root>
  )
}

Avatar.displayName = 'Avatar'

function getInitialLetters(altText: string) {
  return altText
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

export { Avatar, useAvatar, getInitialLetters }
export type { AvatarProps }
