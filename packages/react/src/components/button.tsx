// Hynix: Button [v1.0.0]

import { ark } from '@ark-ui/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type ButtonProps = React.ComponentPropsWithRef<typeof ark.button> &
  VariantProps<typeof buttonStyles>

const buttonStyles = cva(
  [
    'inset-ring-1 isolate inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl font-sans font-semibold transition-colors ease-in-out',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    // focus-visible
    'focus-visible:outline-3 focus-visible:outline-brand-selected',
    // disabled
    'disabled:inset-ring-0 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
  ],
  {
    variants: {
      variant: {
        primary: [
          'inset-ring-brand bg-brand text-fg-2',
          // hover
          'enabled:hover:bg-brand-hover',
        ],
        secondary: [
          'inset-ring-border bg-surface-2 text-fg-1 [&_svg]:text-fill-5',
          // hover
          'enabled:hover:bg-fill-2',
        ],
        ghost: [
          'inset-ring-brand bg-transparent text-brand',
          // hover
          'enabled:hover:bg-brand/8',
        ],
        destructive: [
          'inset-ring-0 bg-danger text-fg-2',
          // hover
          'enabled:hover:bg-danger-hover',
        ],
      },
      size: {
        sm: ['h-9 min-h-9 gap-1 px-3 text-sm leading-snug only:[&_svg]:size-5'],
        md: ['h-11 min-h-11 gap-2 px-4 text-base only:[&_svg]:size-6'],
        lg: ['h-11 min-h-11 gap-3 px-4 text-lg leading-7 only:[&_svg]:size-7'],
        xl: ['h-14 min-h-14 gap-3 px-6 text-xl leading-8 only:[&_svg]:size-8'],
      },
      iconOnly: {
        true: 'aspect-square px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
)

export function Button({
  className,
  variant,
  size,
  iconOnly,
  ...props
}: ButtonProps) {
  return (
    <ark.button
      {...props}
      className={cn(
        buttonStyles({
          className,
          variant,
          size,
          iconOnly,
        }),
      )}
    />
  )
}
