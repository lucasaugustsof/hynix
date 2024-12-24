import { createContext, useContext, useRef } from 'react'

import type { Assign } from '@ark-ui/react'
import {
  Field,
  type FieldHelperTextProps,
  type FieldInputProps,
  type FieldLabelProps,
  type FieldRootProps,
  useFieldContext,
} from '@ark-ui/react/field'

import { type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/registry/utils/cn'

type TextFieldProps = FieldRootProps &
  VariantProps<typeof textFieldStyles> & {
    errorText?: string
  }

const textFieldStyles = tv({
  slots: {
    base: 'min-w-72',
    label:
      'block w-fit max-w-full cursor-default truncate font-display font-normal text-fg-1/70',
    input: [
      'inset-ring-1 inset-ring-border inline-flex w-full cursor-text items-center overflow-hidden rounded-3xl bg-surface-1 transition-shadow duration-100 ease-in-out',
      'has-enabled:not-focus-within:hover:inset-ring-2 has-enabled:not-focus-within:hover:bg-fill-1',
      'has-enabled:focus-within:inset-ring-2 has-enabled:focus-within:inset-ring-brand',
      '[&_svg]:text-fill-5',
    ],
    helperText:
      'block w-fit max-w-full truncate font-display font-medium text-fg-1/70',
  },
  variants: {
    size: {
      sm: {
        base: 'space-y-2',
        label: 'text-sm leading-snug',
        input: [
          'h-9 gap-2 pr-2.5 pl-3 *:data-[part=input]:text-sm *:data-[part=input]:leading-snug',
          '[&_svg]:size-5',
        ],
        helperText: 'text-xs leading-5',
      },
      md: {
        base: 'space-y-2.5',
        label: 'text-base',
        input: [
          'h-11 gap-2.5 pr-3 pl-4 *:data-[part=input]:text-base',
          '[&_svg]:size-6',
        ],
        helperText: 'text-sm leading-7',
      },
      lg: {
        base: 'space-y-3',
        label: 'text-lg leading-7',
        input: [
          'h-14 gap-3 pr-4 pl-5 *:data-[part=input]:text-lg *:data-[part=input]:leading-7',
          '[&_svg]:size-7',
        ],
        helperText: 'text-sm leading-7',
      },
    },
    disabled: {
      true: {
        input: [
          'inset-ring-transparent cursor-not-allowed bg-fill-1',
          '[&_svg]:text-disabled',
        ],
        helperText: 'text-fg-1/40',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const { base, label, input, helperText } = textFieldStyles()

const TextFieldContext = createContext({} as Pick<TextFieldProps, 'size'>)

function TextField({
  className,
  children,
  size,
  errorText,
  ...props
}: TextFieldProps) {
  const errorTextStyles = helperText({
    size,
    className: 'text-danger',
  })

  return (
    <TextFieldContext.Provider
      value={{
        size,
      }}
    >
      <Field.Root
        {...props}
        className={base({
          size,
          className,
        })}
      >
        {children}

        <Field.ErrorText className={errorTextStyles}>
          {errorText}
        </Field.ErrorText>
      </Field.Root>
    </TextFieldContext.Provider>
  )
}

function TextFieldLabel({ ...props }: FieldLabelProps) {
  const { size } = useContext(TextFieldContext)

  return (
    <Field.Label
      {...props}
      className={label({
        size,
      })}
    />
  )
}

type TextFieldInputProps = Exclude<
  Assign<FieldInputProps, React.ComponentPropsWithRef<'input'>>,
  'disabled'
> & {
  leftElement?: React.ReactElement
  rightElement?: React.ReactElement
}

function TextFieldInput({
  ref,
  className,
  leftElement,
  rightElement,
  ...props
}: TextFieldInputProps) {
  const { disabled, invalid } = useFieldContext()

  const { size } = useContext(TextFieldContext)

  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleFocus() {
    inputRef.current?.focus()
  }

  return (
    <div
      className={input({
        size,
        disabled,
        className: invalid ? 'inset-ring-2 inset-ring-danger' : className,
      })}
      onClick={handleFocus}
      onKeyUp={handleFocus}
    >
      {leftElement}

      <Field.Input
        {...props}
        ref={elementNode => {
          if (typeof ref === 'function') {
            ref(elementNode)
          }

          inputRef.current = elementNode
        }}
        className={cn(
          'size-full font-medium text-fg-1 caret-brand outline-0 placeholder:text-fg-1/40',
          disabled &&
            'cursor-not-allowed text-disabled placeholder:text-disabled',
        )}
        disabled={disabled}
      />

      {rightElement}
    </div>
  )
}

function TextFieldHelperText({ ...props }: FieldHelperTextProps) {
  const { disabled, invalid } = useFieldContext()

  const { size } = useContext(TextFieldContext)

  return (
    <Field.HelperText
      {...props}
      className={helperText({
        size,
        disabled,
      })}
      hidden={invalid}
    />
  )
}

TextField.Label = TextFieldLabel
TextField.Input = TextFieldInput
TextField.HelperText = TextFieldHelperText

export { TextField }
export type { TextFieldProps }
