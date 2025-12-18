import * as React from 'react'
import {
  Checkbox as ArkCheckbox,
  type CheckboxControlProps as ArkCheckboxControlProps,
  type CheckboxRootProps as ArkCheckboxRootProps,
  useCheckboxContext,
} from '@ark-ui/react/checkbox'

import { cn } from '@/lib/cn'

const CHECKBOX_ROOT_NAME = 'Checkbox.Root'
const CHECKBOX_ROOT_PROVIDER_NAME = 'Checkbox.RootProvider'
const CHECKBOX_GROUP_PROVIDER_NAME = 'Checkbox.GroupProvider'
const CHECKBOX_GROUP_NAME = 'Checkbox.Group'
const CHECKBOX_CONTROL_NAME = 'Checkbox.Control'
const CHECKBOX_LABEL_NAME = 'Checkbox.Label'

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxRootProps extends ArkCheckboxRootProps {}

export const CheckboxRootProvider = ArkCheckbox.RootProvider
CheckboxRootProvider.displayName = CHECKBOX_ROOT_PROVIDER_NAME

export const CheckboxRoot = React.forwardRef<HTMLInputElement, CheckboxRootProps>(
  ({ children, ...props }, ref) => (
    <ArkCheckbox.Root {...props}>
      {children}
      <ArkCheckbox.HiddenInput ref={ref} />
    </ArkCheckbox.Root>
  )
)

CheckboxRoot.displayName = CHECKBOX_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxGroupProvider = ArkCheckbox.GroupProvider
CheckboxGroupProvider.displayName = CHECKBOX_GROUP_PROVIDER_NAME

export const CheckboxGroup = ArkCheckbox.Group
CheckboxGroup.displayName = CHECKBOX_GROUP_NAME

////////////////////////////////////////////////////////////////////////////////////

const CheckIcon = () => (
  <svg className={cn('w-fit pl-[0.5px]')} height="7" viewBox="0 0 10 7" fill="none" aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.06066 1.06066L3.53033 6.59099L0 3.06066L1.06066 2L3.53033 4.46967L8 0L9.06066 1.06066Z"
    />
  </svg>
)

const IndeterminateIcon = () => (
  <svg width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 1.5V0H8V1.5H0Z" />
  </svg>
)

export interface CheckboxControlProps extends ArkCheckboxControlProps {}

export function CheckboxControl({ className, ...props }: CheckboxControlProps) {
  const { indeterminate: isIndeterminate } = useCheckboxContext()

  return (
    <div className={cn('grid size-5 cursor-pointer place-items-center')}>
      <ArkCheckbox.Control
        className={cn(
          'relative inline-flex size-4 shrink-0 overflow-hidden rounded-sm bg-fill-2 transition-[background-color]',
          'before:-translate-y-1/2 before:-translate-x-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-[calc(--spacing(3.5)_-_1px)] before:rounded-[calc(--spacing(0.5)_+_0.6px)] before:bg-surface-1 before:shadow-xs before:content-[""]',
          // hover
          '[&:not([data-focus-visible],[data-disabled])]:data-hover:bg-fill-3',
          // focus
          'data-[state=checked]:data-focus-visible:focus-outline data-[state=unchecked]:data-focus-visible:bg-brand',
          // disabled
          'data-disabled:cursor-not-allowed data-disabled:bg-disabled data-disabled:before:hidden',
          className
        )}
        {...props}
      >
        <ArkCheckbox.Indicator
          className={cn(
            'absolute grid size-full place-items-center bg-brand transition-colors [&_svg]:fill-fg-2',
            // hover
            '[&:not([data-focus-visible],[data-disabled])]:data-hover:bg-[color-mix(in_oklab,var(--color-brand)_80%,black))]'
          )}
          indeterminate={isIndeterminate}
        >
          {isIndeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
    </div>
  )
}

CheckboxControl.displayName = CHECKBOX_CONTROL_NAME

////////////////////////////////////////////////////////////////////////////////////

export const CheckboxLabel = ArkCheckbox.Label
CheckboxLabel.displayName = CHECKBOX_LABEL_NAME
