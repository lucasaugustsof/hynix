// Hynix: Input [v1.0.0]

import { Input as BaseInput } from '@base-ui-components/react/input'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type InputProps = Omit<
  React.ComponentPropsWithRef<typeof BaseInput>,
  'size'
> &
  VariantProps<typeof inputStyles>

const inputStyles = cva(
  [
    'inline-flex min-w-60 shrink-0 cursor-text overflow-hidden rounded-3xl border border-border bg-surface-1 font-medium font-sans caret-brand outline-none ring-offset-2 ring-offset-surface-1 transition-[colors_shadow] ease-out',
    'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand-selected/40',
    'data-invalid:border-danger data-invalid:ring-2 data-invalid:ring-danger-selected/40 data-invalid:hover:bg-surface-1',
    'placeholder:text-fg-1/70',
  ],
  {
    variants: {
      size: {
        sm: ['h-9 pr-2.5 pl-3 text-sm leading-snug'],
        md: ['h-11 pr-3 pl-4 text-base'],
        lg: ['h-14 pr-5 pl-5 text-lg leading-7'],
      },
      disabled: {
        true: 'cursor-not-allowed border-transparent bg-fill-1 text-disabled placeholder:text-disabled',
      },
    },
    compoundVariants: [
      {
        disabled: false,
        class: ['not-focus-visible:hover:bg-fill-1'],
      },
    ],
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

export function Input({ className, size, disabled, ...props }: InputProps) {
  return (
    <BaseInput
      {...props}
      className={cn(
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
}
