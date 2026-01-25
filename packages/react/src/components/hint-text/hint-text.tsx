import type { Assign } from '@ark-ui/react'
import {
  Field as ArkField,
  type FieldErrorTextProps as ArkFieldErrorTextProps,
  type FieldHelperTextProps as ArkFieldHelperTextProps,
  useFieldContext,
} from '@ark-ui/react/field'

import { RiInformationFill } from '@remixicon/react'
import { cn } from '@/utils/cn'

interface HintTextProps extends Assign<ArkFieldHelperTextProps, ArkFieldErrorTextProps> {
  leftIcon?: boolean
}

export function HintText({ children, className, leftIcon = false, ...props }: HintTextProps) {
  const { invalid } = useFieldContext()
  const Component = invalid ? ArkField.ErrorText : ArkField.HelperText

  if (!children) return null

  return (
    <Component
      className={cn(
        'group inline-flex gap-x-1',
        'text-fg-1/70 text-paragraph-sm',
        'data-disabled:cursor-not-allowed data-disabled:text-disabled',
        invalid && 'text-danger',
        className
      )}
      {...props}
    >
      {leftIcon && (
        <RiInformationFill
          className={cn(
            'mt-0.5 size-4 shrink-0 self-baseline fill-fill-4 group-data-disabled:fill-disabled',
            invalid && 'fill-danger'
          )}
          aria-hidden
        />
      )}
      {children}
    </Component>
  )
}

HintText.displayName = 'HintText'
