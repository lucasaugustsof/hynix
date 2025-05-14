import * as React from 'react'

import type { Assign } from '@ark-ui/react'
import {
  Checkbox as ArkCheckbox,
  useCheckbox,
  useCheckboxContext,
} from '@ark-ui/react/checkbox'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

import { motion } from 'motion/react'

import { Label, type LabelProps } from '@r/components/label'

const CHECKBOX_PARTS = {
  Root: 'Checkbox.Root',
  Control: 'Checkbox.Control',
  Provider: 'Checkbox.Provider',
  Group: 'Checkbox.Group',
  Label: 'Checkbox.Label',
}

const checkboxVariantsSlots = tv({
  slots: {
    root: 'group inline-flex items-center gap-3 outline-hidden',
    control: [
      'relative inset-ring-[1.5px] inset-ring-border inline-block cursor-pointer overflow-hidden bg-fill-1 shadow-black/4 shadow-xs dark:shadow-white/4',
      'group-has-disabled:inset-ring-0 group-has-disabled:cursor-not-allowed group-has-disabled:bg-disabled group-has-disabled:shadow-none',
    ],
    indicator: [
      'flex size-full items-center justify-center bg-brand transition-colors duration-200 ease-out',
      // hover
      'hover:bg-brand/90',
    ],
  },
  variants: {
    size: {
      sm: {
        control: 'size-5.5 rounded-lg',
        indicator: '[&_svg]:size-4',
      },
      md: {
        control: 'size-6 rounded-[calc(var(--radius-lg)_+_var(--radius-xs))]',
        indicator: '[&_svg]:size-5',
      },
      lg: {
        root: 'gap-4',
        control: 'size-8 rounded-xl',
        indicator: '[&_svg]:size-6',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const { root, control, indicator } = checkboxVariantsSlots()

type CheckboxSharedProps = VariantProps<typeof checkboxVariantsSlots>

type CheckboxProps = Assign<
  React.CustomComponentPropsWithRef<typeof ArkCheckbox.Root>,
  CheckboxSharedProps
>

function CheckboxRoot({ className, children, size, ...props }: CheckboxProps) {
  const keyPrefix = React.useId()

  const extendedChildrenWithInjectedProps = recursiveClone(children, {
    inject: {
      size,
    },
    match: [CHECKBOX_PARTS.Control, CHECKBOX_PARTS.Label],
    keyPrefix,
  })

  return (
    <ArkCheckbox.Root
      {...props}
      className={root({
        className,
        size,
      })}
    >
      {extendedChildrenWithInjectedProps}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

CheckboxRoot.displayName = CHECKBOX_PARTS.Root

function CheckIcon({
  type,
}: {
  type: 'check' | 'indeterminate'
}) {
  const CHECK_PATH = 'M5 13 L10 18 L20 6'
  const INDETERMINATE_PATH = 'M6 12 H18'

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn('shrink-0 stroke-4 stroke-fg-2')}
    >
      <title>Check</title>

      <motion.path
        d={type === 'check' ? CHECK_PATH : INDETERMINATE_PATH}
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
  )
}

function CheckboxControl({
  size,
  ...props
}: Assign<
  React.CustomComponentPropsWithRef<typeof ArkCheckbox.Control>,
  CheckboxSharedProps
>) {
  const { checkedState, indeterminate: isIndeterminate } = useCheckboxContext()

  return (
    <ArkCheckbox.Control
      {...props}
      className={cn(
        control({
          size,
        }),
      )}
      data-focusable
    >
      <ArkCheckbox.Indicator
        className="absolute inset-0"
        indeterminate={isIndeterminate}
      >
        <div
          className={cn(
            indicator({
              size,
            }),
          )}
        >
          {isIndeterminate ? (
            <CheckIcon type="indeterminate" />
          ) : (
            checkedState && <CheckIcon type="check" />
          )}
        </div>
      </ArkCheckbox.Indicator>
    </ArkCheckbox.Control>
  )
}

CheckboxControl.displayName = CHECKBOX_PARTS.Control

const CheckboxProvider = ArkCheckbox.RootProvider
CheckboxProvider.displayName = CHECKBOX_PARTS.Provider

const CheckboxGroup = ArkCheckbox.Group
CheckboxGroup.displayName = CHECKBOX_PARTS.Group

function CheckboxLabel(props: LabelProps) {
  return (
    <ArkCheckbox.Label asChild>
      <Label {...props} />
    </ArkCheckbox.Label>
  )
}

CheckboxLabel.displayName = CHECKBOX_PARTS.Label

const Checkbox = {
  Root: CheckboxRoot,
  Control: CheckboxControl,
  Provider: CheckboxProvider,
  Group: CheckboxGroup,
  Label: CheckboxLabel,
}

export { Checkbox, useCheckbox }
export type { CheckboxProps }
