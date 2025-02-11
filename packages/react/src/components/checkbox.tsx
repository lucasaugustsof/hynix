// Hynix: Checkbox [v0.1.0]

import { forwardRef } from 'react'

import { ark } from '@ark-ui/react'
import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'

import { RiCheckLine, RiSubtractLine } from '@remixicon/react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cx } from '@/registry/utils/cx'

type CheckboxProps = Omit<
  React.ComponentProps<typeof ArkCheckbox.Root>,
  'children'
> &
  VariantProps<typeof checkboxStyles> & {
    labelText?: string
    labelDirection?: 'left' | 'right'
  }

const DISPLAY_NAME = 'Checkbox'

const checkboxStyles = cva(
  [
    'shrink-0 overflow-hidden bg-fill-1 outline-brand-selected/70',
    'data-focus:outline-3',
  ],
  {
    variants: {
      size: {
        sm: 'size-[1.375rem] rounded-xl',
        md: 'size-6 rounded-2xl',
        lg: 'size-8 rounded-3xl',
      },
      disabled: {
        true: 'cursor-not-allowed bg-disabled',
        false: [
          'inset-ring-2 inset-ring-border cursor-pointer',
          'data-[state=unchecked]:shadow-xs',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  },
)

const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  ({ size, labelText = '', labelDirection = 'left', ...props }, ref) => {
    const { disabled, checked } = props

    const LABEL_SIZE = {
      sm: 'text-sm leading-snug',
      md: 'text-base',
      lg: 'text-lg leading-7',
    } as const

    const isAccessible =
      labelText.length === 0 &&
      (props['aria-label'] || props['aria-labelledby'])

    if (!isAccessible) {
      console.warn(
        `${DISPLAY_NAME}: No label option. Consider adding a description to improve accessibility.`,
      )
    }

    return (
      <ArkCheckbox.Root
        {...props}
        ref={ref}
        className={cx(
          'flex items-center',
          labelDirection === 'right' && 'flex-row-reverse',
          size !== 'lg' ? 'gap-3' : 'gap-4',
        )}
        aria-checked={checked !== 'indeterminate'}
        aria-disabled={disabled}
      >
        {!!labelText && (
          <ArkCheckbox.Label
            className={cx(
              'font-display font-medium',
              disabled ? 'text-disabled' : 'text-fg-1',
              LABEL_SIZE[size!],
            )}
          >
            {labelText}
          </ArkCheckbox.Label>
        )}

        <ArkCheckbox.Control
          className={cx(
            checkboxStyles({
              size,
              disabled,
            }),
          )}
        >
          <ArkCheckbox.Indicator
            className={cx(
              'flex size-full items-center justify-center bg-brand text-surface-1 transition-colors ease-in-out',
              'data-hover:bg-brand-hover',
            )}
            indeterminate={checked === 'indeterminate'}
            aria-live="polite"
          >
            <ark.span
              className={cx(
                'zoom-in-75 fade-in size-full animate-in duration-200 ease-in-out',
              )}
              asChild
            >
              {checked === 'indeterminate' ? (
                <RiSubtractLine />
              ) : (
                <RiCheckLine />
              )}
            </ark.span>
          </ArkCheckbox.Indicator>
        </ArkCheckbox.Control>

        <ArkCheckbox.HiddenInput />
      </ArkCheckbox.Root>
    )
  },
)

Checkbox.displayName = DISPLAY_NAME

export { Checkbox }
export type { CheckboxProps }
