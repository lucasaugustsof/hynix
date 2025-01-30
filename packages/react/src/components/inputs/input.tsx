// Hynix: Input [v0.1.0]

import { forwardRef } from 'react'

import { Field as ArkField } from '@ark-ui/react/field'

import { type VariantProps, cva } from 'class-variance-authority'

import { cx } from '@/registry/utils/cx'

type InputProps = Omit<
  React.ComponentPropsWithRef<typeof ArkField.Input>,
  'size'
> &
  VariantProps<typeof inputStyles>

const inputStyles = cva(
  [
    'inset-ring-border inline-flex min-w-60 cursor-text overflow-hidden rounded-3xl bg-surface-1 font-display font-medium caret-brand outline-none transition-colors ease-out',
    'placeholder:text-fg-1/70 focus-visible:inset-ring-2 focus-visible:inset-ring-brand',
    'data-[invalid]:inset-ring-2 data-[invalid]:inset-ring-danger data-[invalid]:hover:bg-surface-1',
  ],
  {
    variants: {
      size: {
        sm: ['h-9 pr-2.5 pl-3 text-sm leading-snug'],
        md: ['h-11 pr-3 pl-4 text-base'],
        lg: ['h-14 pr-5 pl-5 text-lg leading-7'],
      },
      disabled: {
        true: 'cursor-not-allowed bg-fill-1 text-disabled placeholder:text-disabled',
      },
    },
    defaultVariants: {
      size: 'md',
    },
    compoundVariants: [
      {
        disabled: false,
        class: [
          'inset-ring-1 not-focus-visible:hover:inset-ring-2 not-focus-visible:hover:bg-fill-1',
        ],
      },
    ],
  },
)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, disabled, ...props }, ref) => {
    return (
      <ArkField.Input
        {...props}
        ref={ref}
        className={cx(
          inputStyles({
            className,
            size,
            disabled,
          }),
        )}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
