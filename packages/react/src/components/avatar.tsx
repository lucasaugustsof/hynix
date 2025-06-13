import type { Assign } from '@ark-ui/react'
import { Avatar as ArkAvatar } from '@ark-ui/react/avatar'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

export const avatarStyles = tv({
  slots: {
    root: 'relative inline-flex aspect-square shrink-0 select-none overflow-hidden rounded-full border border-border',
    fallback:
      'absolute grid size-full place-items-center whitespace-nowrap bg-brand font-sans font-semibold text-fg-2',
    image: 'pointer-events-none flex-1 object-cover',
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

export type AvatarProps = Assign<
  React.CustomComponentPropsWithRef<typeof ArkAvatar.Root>,
  VariantProps<typeof avatarStyles>
> & {
  src: string
  altText: string
  fallback?: React.ReactNode
}

export function Avatar({
  className,
  size,
  src,
  altText,
  fallback: fallbackContent,
  ...props
}: AvatarProps) {
  const {
    root: rootClass,
    fallback: fallbackClass,
    image: imageClass,
  } = avatarStyles({ size })

  return (
    <ArkAvatar.Root {...props} className={cn(rootClass({ className }))}>
      {fallbackContent && (
        <ArkAvatar.Fallback className={cn(fallbackClass())}>
          {fallbackContent}
        </ArkAvatar.Fallback>
      )}

      <ArkAvatar.Image className={cn(imageClass())} src={src} alt={altText} />
    </ArkAvatar.Root>
  )
}

Avatar.displayName = 'Avatar'
