// Hynix: Checkbox [v1.0.0]

import { Checkbox as ArkCheckbox } from '@ark-ui/react/checkbox'
import { RiCheckLine, RiSubtractLine } from '@remixicon/react'
import { type VariantProps, cva } from 'class-variance-authority'

import { type Variants, motion, useReducedMotion } from 'motion/react'

import { cn } from '@/registry/utils/cn'

export type CheckboxProps = React.ComponentPropsWithRef<
  typeof ArkCheckbox.Root
> &
  VariantProps<typeof checkboxVariants> & {
    labelPlacement?: 'ltr' | 'rtl'
  }

const checkboxVariants = cva(
  'inline-flex shrink-0 items-center gap-3 **:transition-[background-color_box-shadow] **:ease-out',
  {
    variants: {
      size: {
        sm: [
          // control
          '*:data-[part=control]:size-[1.375rem] *:data-[part=control]:rounded-xl',
          // label
          '*:data-[part=label]:text-sm *:data-[part=label]:leading-snug',
        ],
        md: [
          // control
          '*:data-[part=control]:size-6 *:data-[part=control]:rounded-2xl',
          // label
          '*:data-[part=label]:text-base',
        ],
        lg: [
          // label
          '*:data-[part=label]:text-lg *:data-[part=label]:leading-7',
        ],
        xl: [
          // label
          '*:data-[part=label]:text-xl *:data-[part=label]:leading-8',
        ],
      },
    },
    compoundVariants: [
      {
        size: ['sm', 'md'],
        class: [
          // control
          '*:data-[part=control]:inset-ring-2',
        ],
      },
      {
        size: ['lg', 'xl'],
        class: [
          'gap-4',
          // control
          '*:data-[part=control]:inset-ring-3 *:data-[part=control]:size-8 *:data-[part=control]:rounded-3xl',
        ],
      },
    ],
    defaultVariants: {
      size: 'lg',
    },
  },
)

const SPRING_ANIMATION_CONFIG = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 1,
}

const motionEffects: Variants = {
  checked: {
    scale: 1,
    opacity: 1,
  },
  unchecked: {
    scale: 0,
    opacity: 0,
  },
}

export function Checkbox({
  className,
  children,
  size,
  labelPlacement = 'rtl',
  ...props
}: CheckboxProps) {
  const prefersReducedMotion = useReducedMotion()
  const isIndeterminate = props.checked === 'indeterminate'

  return (
    <ArkCheckbox.Root
      {...props}
      className={cn(
        checkboxVariants({
          size,
          className,
        }),
        labelPlacement === 'ltr' && 'flex-row-reverse',
      )}
    >
      <ArkCheckbox.Control
        className={cn(
          'inset-ring-border flex outline-0 outline-brand-selected/70 outline-offset-2',
          // unchecked
          'data-[state=unchecked]:data-hover:inset-ring-brand-selected data-[state=unchecked]:bg-fill-1',
          // focus-visible
          'data-focus-visible:outline-2',
        )}
      >
        <ArkCheckbox.Indicator indeterminate={isIndeterminate} asChild>
          <ArkCheckbox.Context>
            {({ checkedState }) =>
              checkedState && (
                <motion.div
                  className={cn(
                    'flex-1 shrink-0 items-center rounded-[inherit] bg-brand',
                    // checked
                    'data-[state=checked]:data-hover:bg-brand-hover',
                    '[&_svg]:pointer-events-none [&_svg]:size-full [&_svg]:text-fg-2',
                  )}
                  variants={prefersReducedMotion ? undefined : motionEffects}
                  initial="unchecked"
                  animate="checked"
                  transition={SPRING_ANIMATION_CONFIG}
                >
                  {isIndeterminate ? <RiSubtractLine /> : <RiCheckLine />}
                </motion.div>
              )
            }
          </ArkCheckbox.Context>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {children}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

export function CheckboxLabel({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ArkCheckbox.Label>) {
  return (
    <ArkCheckbox.Label
      {...props}
      className={cn(
        'max-w-full truncate font-medium font-sans text-fg-1',
        className,
      )}
    />
  )
}
