'use client'

import {
  Checkbox as ArkCheckbox,
  useCheckboxContext,
} from '@ark-ui/react/checkbox'

import { motion } from 'motion/react'

import { useInjectPropsToChildren } from '@r/hooks/use-inject-props-to-children'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

////////////////////////////////////////////////////////////////////////////////////

const checkboxStyles = tv({
  slots: {
    root: ['group outline-hidden'],
    control: [
      'inline-flex shrink-0 cursor-pointer rounded-lg bg-fill-1 outline-hidden ring-border transition-shadow duration-100 ease-out',
      'not-hover:shadow-xs shadow-black/8 dark:shadow-white/8',
      // Unchecked
      'group-not-has-disabled:data-[state=unchecked]:ring-2',
      // Hover Unckecked
      'data-[state=unchecked]:hover:ring-brand/40',
      // Disabled
      'data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:shadow-none data-disabled:ring-0',
      // Indeterminate
      'data-[state=indeterminate]:ring-0',
    ],
  },
  variants: {
    size: {
      sm: {
        control: 'size-5.5',
      },
      md: {
        control: 'size-6',
      },
      lg: {
        control: 'size-8 rounded-xl',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const { root: rootStyles, control: controlStyles } = checkboxStyles()

type CheckboxSharedProps = VariantProps<typeof checkboxStyles>

////////////////////////////////////////////////////////////////////////////////////

type CheckboxRootProps = React.ComponentProps<typeof ArkCheckbox.Root> &
  CheckboxSharedProps

const CheckboxRoot = ({
  children,
  className,
  size,
  asChild,
  ...props
}: CheckboxRootProps) => {
  const extendChildren = useInjectPropsToChildren(children, {
    props: {
      size,
    },
    targets: ['CheckboxControl'],
    asChild,
  })

  return (
    <ArkCheckbox.Root
      {...props}
      className={cn(
        rootStyles({
          className,
          size,
        }),
      )}
      asChild={asChild}
    >
      {extendChildren}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

CheckboxRoot.displayName = 'Checkbox'

////////////////////////////////////////////////////////////////////////////////////

const CheckboxControl = ({
  className,
  size,
  ...props
}: React.ComponentProps<typeof ArkCheckbox.Control> & CheckboxSharedProps) => {
  const CHECK_PATH = 'M5 13 L10 18 L20 6'
  const INDETERMINATE_PATH = 'M6 12 H18'

  const { checked: isChecked, indeterminate: isIndeterminate } =
    useCheckboxContext()

  const shouldShowConfirmation = isChecked || isIndeterminate

  return (
    <ArkCheckbox.Control
      {...props}
      className={cn(
        controlStyles({
          className,
          size,
        }),
      )}
    >
      <ArkCheckbox.Indicator
        className={cn(
          'size-full rounded-[inherit] bg-brand p-0.5 hover:data-[state=checked]:bg-brand/90',
        )}
        indeterminate={isIndeterminate}
      >
        {shouldShowConfirmation && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('size-full shrink-0 stroke-4 stroke-fg-2')}
          >
            <title>Check</title>

            <motion.path
              d={isIndeterminate ? INDETERMINATE_PATH : CHECK_PATH}
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 0.3,
                ease: [0.645, 0.045, 0.355, 1],
              }}
            />
          </svg>
        )}
      </ArkCheckbox.Indicator>
    </ArkCheckbox.Control>
  )
}

CheckboxControl.displayName = 'CheckboxControl'

////////////////////////////////////////////////////////////////////////////////////

export { CheckboxRoot as Root, CheckboxControl as Control }
export type { CheckboxRootProps as CheckboxProps }
