// Hynix: Input [v1.0.0]

import { Field as ArkField } from '@ark-ui/react/field'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type InputProps = Omit<
  React.ComponentPropsWithRef<typeof ArkField.Input>,
  'size'
> &
  VariantProps<typeof inputStyles>

const inputStyles = cva(
  [
    'inline-flex min-w-60 shrink-0 cursor-text overflow-hidden rounded-3xl border border-border bg-surface-1 font-medium font-sans caret-brand outline-none ring-offset-2 ring-offset-surface-1 transition-[colors_shadow] ease-out',
    // focus-visible
    'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand-selected/40',
    // invalid
    'data-invalid:border-danger data-invalid:ring-2 data-invalid:ring-danger-selected/40 data-invalid:hover:bg-surface-1',
    // disabled
    'not-disabled:not-focus-visible:hover:bg-fill-1 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-fill-1 disabled:text-disabled',
    // placeholder
    'placeholder:text-fg-1/70 disabled:placeholder:text-disabled',
  ],
  {
    variants: {
      size: {
        sm: ['h-9 pr-2.5 pl-3 text-sm leading-snug'],
        md: ['h-11 pr-3 pl-4 text-base'],
        lg: ['h-14 pr-5 pl-5 text-lg leading-7'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export function Input({ className, size, ...props }: InputProps) {
  return (
    <ArkField.Input
      {...props}
      className={cn(
        inputStyles({
          className,
          size,
        }),
      )}
    />
  )
}
