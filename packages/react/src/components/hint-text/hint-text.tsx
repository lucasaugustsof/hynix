import type { Assign } from '@ark-ui/react'
import type * as ArkFieldTypes from '@ark-ui/react/field'
import { Field as ArkField, useFieldContext } from '@ark-ui/react/field'

import { RiInformationFill } from '@remixicon/react'
import { cn } from '@/lib/cn'

export interface HintTextProps
  extends Assign<ArkFieldTypes.FieldHelperTextProps, ArkFieldTypes.FieldErrorTextProps> {
  /**
   * When true, displays an information icon to the left of the hint text.
   * The icon automatically changes color based on the field's invalid state.
   * @default false
   */
  leftIcon?: boolean
}

export function HintText({ children, className, leftIcon = false, ...props }: HintTextProps) {
  const { invalid } = useFieldContext()
  const Component = invalid ? ArkField.ErrorText : ArkField.HelperText

  if (!children) return null

  return (
    <Component
      {...props}
      className={cn(
        'group inline-flex items-start gap-x-1',
        'font-normal font-sans text-fg-1/70 text-xs/4',
        'data-disabled:cursor-not-allowed data-disabled:text-disabled',
        invalid && 'text-danger',
        className
      )}
    >
      {leftIcon && (
        <RiInformationFill
          className={cn(
            'size-4 shrink-0 fill-fill-4 group-data-disabled:fill-disabled',
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
