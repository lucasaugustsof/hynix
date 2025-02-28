// Hynix: Checkbox [v1.0.0]

import { useId } from 'react'

import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox'
import { RiCheckLine, RiSubtractLine } from '@remixicon/react'

import { motion, useReducedMotion } from 'motion/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type CheckboxProps = React.ComponentPropsWithRef<
  typeof BaseCheckbox.Root
> &
  VariantProps<typeof checkboxStyles> & {
    labelText?: string
    labelPlacement?: 'ltr' | 'rtl'
  }

const checkboxStyles = cva(
  [
    'inset-ring-2 inset-ring-border inline-flex shrink-0 bg-fill-1 transition-shadow ease-out',
    'focus-visible:outline-2 focus-visible:outline-brand-selected/70 focus-visible:outline-offset-2',
    'enabled:data-unchecked:shadow-xs enabled:data-unchecked:hover:inset-ring-brand-selected/70',
    'data-disabled:inset-ring-0 data-disabled:cursor-not-allowed data-disabled:bg-disabled',
  ],
  {
    variants: {
      size: {
        sm: [
          'size-[1.375rem] rounded-xl',
          '**:data-[scope=indicator]:rounded-xl',
        ],
        md: ['size-6 rounded-2xl', '**:data-[scope=indicator]:rounded-2xl'],
        lg: [
          'inset-ring-3 size-8 rounded-3xl',
          '**:data-[scope=indicator]:rounded-3xl',
        ],
        xl: null,
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  },
)

export function Checkbox({
  size,
  labelText = 'Label',
  labelPlacement = 'rtl',
  ...props
}: CheckboxProps) {
  const { indeterminate, disabled } = props

  const reference = useId()
  const shouldReduceMotion = useReducedMotion()

  const mapLabelSize = {
    sm: 'text-sm leading-snug',
    md: 'text-base',
    lg: 'text-lg leading-7',
    xl: 'text-xl leading-8',
  } as const

  return (
    <label
      htmlFor={reference}
      className={cn(
        'inline-flex items-center gap-3 font-medium',
        disabled ? 'text-disabled' : 'text-fg-1',
        labelPlacement === 'ltr' && 'flex-row-reverse',
        mapLabelSize[size!],
      )}
    >
      <BaseCheckbox.Root
        {...props}
        id={reference}
        className={cn(
          checkboxStyles({
            size: size === 'xl' ? 'lg' : size,
          }),
        )}
      >
        <BaseCheckbox.Indicator>
          <motion.div
            className={cn(
              'size-full bg-brand transition-colors ease-out hover:bg-brand-hover',
              '[&_svg]:size-full [&_svg]:text-fg-2',
            )}
            initial={
              shouldReduceMotion
                ? false
                : {
                    scale: 0,
                    opacity: 0,
                  }
            }
            animate={
              shouldReduceMotion
                ? false
                : {
                    scale: 1,
                    opacity: 1,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 1,
            }}
            data-scope="indicator"
          >
            {indeterminate ? <RiSubtractLine /> : <RiCheckLine />}
          </motion.div>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>

      {!!labelText && labelText}
    </label>
  )
}
