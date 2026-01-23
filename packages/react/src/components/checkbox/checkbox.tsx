'use client'

import type { Assign } from '@ark-ui/react'
import {
  Checkbox as ArkCheckbox,
  type CheckboxCheckedState,
  useCheckboxContext,
} from '@ark-ui/react/checkbox'

import { motion } from 'motion/react'
import { cn } from '@/utils/cn'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const CHECKBOX_ROOT_PROVIDER_NAME = 'Checkbox.RootProvider'
const CHECKBOX_ROOT_NAME = 'Checkbox.Root'
const CHECKBOX_CONTROL_NAME = 'Checkbox.Control'
const CHECKBOX_LABEL_NAME = 'Checkbox.Label'
const CHECKBOX_GROUP_PROVIDER_NAME = 'Checkbox.GroupProvider'
const CHECKBOX_GROUP_NAME = 'Checkbox.Group'

const checkboxVariants = tv({
  slots: {
    root: 'inline-block w-fit',
    control: [
      'group grid cursor-pointer place-items-center outline-hidden [grid-area:1/1]',
      // disabled
      'data-disabled:cursor-not-allowed',
    ],
    controlBox: [
      'relative inline-flex shrink-0 overflow-hidden rounded-sm bg-fill-2 [transition:background-color_0.2s]',
      'before:-translate-y-1/2 before:-translate-x-1/2 before:absolute before:top-1/2 before:left-1/2',
      'before:bg-surface-2 before:content-[""]',
      'before:shadow-[0_2px_2px_0] before:shadow-black/12',
      // hover
      'group-not-focus-visible:group-not-data-disabled:group-data-hover:bg-fill-3',
      // focus
      'group-focus-visible:bg-brand',
      // disabled
      'group-data-disabled:bg-fill-1 group-data-disabled:before:hidden',
    ],
  },
  variants: {
    size: {
      md: {
        control: 'size-5',
        controlBox: [
          'size-4',
          'before:size-[calc(--spacing(3.5)-1px)] before:rounded-[calc(--spacing(0.5)+0.6px)]',
        ],
      },
      sm: {
        control: 'size-4',
        controlBox: [
          'size-3.5',
          'before:size-[calc(--spacing(3)-1px)] before:rounded-[calc(--spacing(0.5)+0.6px)]',
        ],
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const {
  root: rootClasses,
  control: controlClasses,
  controlBox: controlBoxClasses,
} = checkboxVariants()

type CheckboxSharedProps = VariantProps<typeof checkboxVariants>

////////////////////////////////////////////////////////////////////////////////////

export function CheckboxRootProvider({
  children,
  className,
  size,
  ...props
}: Assign<ArkCheckbox.RootProviderProps, CheckboxSharedProps>) {
  return (
    <ArkCheckbox.RootProvider
      {...props}
      className={rootClasses({
        className,
        size,
      })}
    >
      {renderChildren({
        children,
        props: {
          size,
        },
        displayNames: [CHECKBOX_CONTROL_NAME],
      })}
    </ArkCheckbox.RootProvider>
  )
}

CheckboxRootProvider.displayName = CHECKBOX_ROOT_PROVIDER_NAME

////////////////////////////////////////////////////////////////////////////////////

export function CheckboxRoot({
  children,
  className,
  size,
  ...props
}: Assign<ArkCheckbox.RootProps, CheckboxSharedProps>) {
  return (
    <ArkCheckbox.Root
      {...props}
      className={rootClasses({
        className,
        size,
      })}
    >
      {renderChildren({
        children,
        props: {
          size,
        },
        displayNames: [CHECKBOX_CONTROL_NAME],
      })}
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  )
}

CheckboxRoot.displayName = CHECKBOX_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function CheckboxControl({
  className,
  size,
  ...props
}: Assign<ArkCheckbox.ControlProps, CheckboxSharedProps>) {
  const { checkedState } = useCheckboxContext()

  return (
    <ArkCheckbox.Control
      {...props}
      className={controlClasses({
        className,
        size,
      })}
    >
      <div
        className={controlBoxClasses({
          size,
        })}
      >
        {checkedState && <CheckboxIndicator checkedState={checkedState} />}
      </div>
    </ArkCheckbox.Control>
  )
}

CheckboxControl.displayName = CHECKBOX_CONTROL_NAME

interface CheckboxIndicatorProps {
  checkedState: CheckboxCheckedState
}

function CheckboxIndicator({ checkedState }: CheckboxIndicatorProps) {
  const CHECK_PATH = 'M5 13 L10 18 L20 6'
  const INDETERMINATE_PATH = 'M6 12 H18'

  const svgPath = checkedState === 'indeterminate' ? INDETERMINATE_PATH : CHECK_PATH

  return (
    <div
      className={cn(
        'absolute inset-0 bg-brand [transition:background-color_0.2s] hover:bg-[color-mix(in_oklch,var(--color-brand)_100%,black_20%)]'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('shrink-0 scale-65 stroke-4 stroke-fg-2')}
      >
        <motion.path
          d={svgPath}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          exit={{
            pathLength: 0,
          }}
          transition={{
            ease: [0.785, 0.135, 0.15, 0.86],
            duration: 0.3,
          }}
        />
      </svg>
    </div>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxLabel = ArkCheckbox.Label
CheckboxLabel.displayName = CHECKBOX_LABEL_NAME

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxGroupProvider = ArkCheckbox.GroupProvider
CheckboxGroupProvider.displayName = CHECKBOX_GROUP_PROVIDER_NAME

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxGroup = ArkCheckbox.Group
CheckboxGroup.displayName = CHECKBOX_GROUP_NAME
