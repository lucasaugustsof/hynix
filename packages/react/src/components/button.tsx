// Hynix: Button [v1.0.0]

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof buttonStyles>

const buttonStyles = cva(
  [
    'isolate inline-flex items-center justify-center whitespace-nowrap rounded-3xl font-sans font-semibold transition-colors ease-in-out',
    'focus-visible:outline-3 focus-visible:outline-brand-selected',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'inset-ring-brand bg-brand text-fg-2',
          'enabled:hover:bg-brand-hover',
        ],
        secondary: [
          'inset-ring-border bg-surface-2 text-fg-1',
          'enabled:hover:bg-fill-2',
          '[&_svg]:text-fill-5',
        ],
        ghost: [
          'inset-ring-brand bg-transparent text-brand',
          'enabled:hover:bg-brand/8',
        ],
        destructive: [
          'inset-ring-0 bg-danger text-fg-2',
          'enabled:hover:bg-danger-hover',
        ],
      },
      size: {
        sm: [
          'h-9 min-h-9 gap-1 px-3 text-sm leading-snug',
          'only:[&_svg]:size-5',
        ],
        md: ['h-11 min-h-11 gap-2 px-4 text-base', 'only:[&_svg]:size-6'],
        lg: [
          'h-11 min-h-11 gap-3 px-4 text-lg leading-7',
          'only:[&_svg]:size-7',
        ],
        xl: [
          'h-14 min-h-14 gap-3 px-6 text-xl leading-8',
          'only:[&_svg]:size-8',
        ],
      },
      disabled: {
        true: [
          'cursor-not-allowed bg-fill-1 text-disabled',
          '[&_svg]:text-disabled',
        ],
        false: 'inset-ring-1 cursor-pointer',
      },
      iconOnly: {
        true: 'aspect-square px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      disabled: false,
      iconOnly: false,
    },
  },
)

export function Button({
  className,
  variant,
  size,
  disabled,
  iconOnly,
  ...props
}: ButtonProps) {
  if (iconOnly && !props['aria-label']) {
    console.warn(
      'Button: `aria-label` prop is required when `iconOnly` is true',
    )
  }

  return (
    <button
      {...props}
      className={cn(
        buttonStyles({
          className,
          variant,
          size,
          iconOnly,
          disabled,
        }),
      )}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    />
  )
}
