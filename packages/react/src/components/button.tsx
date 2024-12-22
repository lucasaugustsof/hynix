import { type VariantProps, tv } from 'tailwind-variants'

import { Slot } from '@/registry/components/slot'

const buttonVariants = tv({
  base: [
    'inset-ring-1 isolate inline-flex items-center justify-center gap-3 rounded-3xl font-display font-semibold outline-brand-selected outline-offset-2 transition-colors ease-out',
    'focus-visible:outline-2',
  ],
  variants: {
    appearance: {
      primary: [
        'inset-ring-brand whitespace-nowrap bg-brand text-fg-2',
        'enabled:active:bg-brand-selected enabled:not-active:hover:bg-brand-hover',
      ],
      secondary: [
        'inset-ring-border bg-surface-2 text-fg-1 [&_svg]:text-fill-5',
        'enabled:active:bg-fill-1 enabled:not-active:hover:bg-fill-2',
      ],
      ghost: [
        'bg-transparent text-brand transition-shadow',
        'enabled:active:text-brand enabled:not-active:hover:inset-ring-2 enabled:not-active:hover:inset-ring-brand-hover enabled:not-active:hover:text-brand-hover',
      ],
      destructive: [
        'inset-ring-transparent bg-danger text-fg-2',
        'enabled:active:bg-danger enabled:not-active:hover:bg-danger-hover',
      ],
    },
    size: {
      sm: 'h-9 gap-1 px-3 text-sm leading-snug [&_svg]:size-5',
      md: 'h-11 gap-2 px-4 text-base [&_svg]:size-6',
      lg: 'h-11 px-4 text-lg [&_svg]:size-7',
      xl: 'h-14 px-6 text-xl leading-8 [&_svg]:size-8',
    },
    disabled: {
      true: 'inset-ring-transparent cursor-not-allowed bg-fill-1 text-disabled',
      false: 'cursor-pointer',
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
  },
  defaultVariants: {
    appearance: 'primary',
    size: 'md',
    disabled: false,
  },
})

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  appearance,
  size,
  disabled,
  iconOnly,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  if (iconOnly && !props['aria-label']) {
    console.warn(
      'Icon-only button requires an aria-label for better accessibility.',
    )
  }

  return (
    <Comp
      {...props}
      className={buttonVariants({
        appearance,
        size,
        disabled,
        iconOnly,
        className,
      })}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
