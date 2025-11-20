import type { Assign } from '@ark-ui/react'
import {
  Field as ArkField,
  type FieldErrorTextProps as ArkFieldErrorTextProps,
  type FieldHelperTextProps as ArkFieldHelperTextProps,
  useFieldContext,
} from '@ark-ui/react/field'

import { RiInformationFill } from '@remixicon/react'
import { cn } from '@/lib/cn'

/**
 * Hint text component that displays helper or error messages for form fields.
 * Automatically switches between helper text and error text based on field validity.
 * Supports an optional information icon that changes color based on field state.
 * Integrates with Ark UI Field context for automatic state management.
 * Returns null if no children are provided.
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Label.Root>
 *     <Label.Text>Email</Label.Text>
 *   </Label.Root>
 *   <Field.Control>
 *     <Field.Input type="email" />
 *   </Field.Control>
 *   <HintText>We'll never share your email</HintText>
 * </Field.Root>
 *
 * <Field.Root invalid>
 *   <Label.Root>
 *     <Label.Text>Password</Label.Text>
 *   </Label.Root>
 *   <Field.Control>
 *     <Field.Input type="password" />
 *   </Field.Control>
 *   <HintText leftIcon>Password must be at least 8 characters</HintText>
 * </Field.Root>
 *
 * <Field.Root disabled>
 *   <Label.Root>
 *     <Label.Text>Username</Label.Text>
 *   </Label.Root>
 *   <Field.Control>
 *     <Field.Input />
 *   </Field.Control>
 *   <HintText>This field is currently disabled</HintText>
 * </Field.Root>
 * ```
 */
export interface HintTextProps extends Assign<ArkFieldHelperTextProps, ArkFieldErrorTextProps> {
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
