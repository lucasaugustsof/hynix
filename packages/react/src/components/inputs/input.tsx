// Hynix: Input [v0.1.0]

import { Field as ArkField } from '@ark-ui/react/field'
import { type VariantProps, cva } from 'class-variance-authority'

import { cx } from '@/registry/utils/cx'

type AddonElement = React.ReactElement | string | number

export type InputProps = Omit<React.ComponentPropsWithRef<'input'>, 'size'> &
  VariantProps<typeof inputStyles> & {
    prefixElement?: AddonElement
    suffixElement?: AddonElement
  }

const inputStyles = cva(['inline-flex min-w-60 overflow-hidden'], {
  variants: {
    variant: {
      subtle: [
        'inset-ring-border rounded-3xl bg-surface-1',
        // Focused
        'focus-within:inset-ring-2 focus-within:inset-ring-brand',
        // Invalid
        '[&:has(input[data-invalid]):hover]:bg-surface-1 [&:has(input[data-invalid])]:inset-ring-2 [&:has(input[data-invalid])]:inset-ring-danger',
      ],
      flushed: [],
      'combo-box': [],
    },
    size: {
      sm: [
        'h-9',
        '[&_input]:pr-2.5 [&_input]:pl-3 [&_input]:text-sm [&_input]:leading-snug',
      ],
      md: ['h-11', '[&_input]:pr-3 [&_input]:pl-4 [&_input]:text-base'],
      lg: [
        'h-14',
        '[&_input]:pr-5 [&_input]:pl-5 [&_input]:text-lg [&_input]:text-lg [&_input]:leading-7',
      ],
    },
    disabled: {
      true: 'cursor-not-allowed bg-fill-1',
      false: 'inset-ring-1',
    },
  },
  compoundVariants: [
    {
      variant: 'subtle',
      disabled: false,
      class: [
        // Hover
        'not-focus-within:hover:inset-ring-2 not-focus-within:hover:bg-fill-1',
      ],
    },
  ],
  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
    disabled: false,
  },
})

export function Input({
  className,
  variant,
  size,
  disabled,
  ...props
}: InputProps) {
  return (
    <div
      className={cx(
        inputStyles({
          className,
          variant,
          size,
          disabled,
        }),
      )}
    >
      <ArkField.Input
        {...props}
        className={cx(
          'w-full cursor-text bg-transparent font-display text-fg-1 caret-brand outline-none placeholder:text-fg-1/70',
          'disabled:cursor-not-allowed disabled:text-disabled disabled:placeholder:text-disabled',
        )}
        disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      />
    </div>
  )
}
