import React from 'react'

import {
  Field,
  type FieldInputProps,
  type FieldRootProps,
  useFieldContext,
} from '@ark-ui/react/field'

import { type ClassValue, type VariantProps, tv } from 'tailwind-variants'

import { cn } from '@/registry/utils/cn'

type Orientation = 'vertical' | 'horizontal'

type TextFieldProps = FieldRootProps &
  VariantProps<typeof textFieldStyles> & {
    orientation?: Orientation
    startElement?: React.ReactElement
    endElement?: React.ReactElement
  }

type OrientationSpacingMap = {
  [O in Orientation]: Record<NonNullable<TextFieldProps['size']>, ClassValue>
}

const textFieldStyles = tv({
  slots: {
    base: 'min-w-72 space-y-2.5',
    label:
      'inline-block w-fit max-w-full cursor-pointer truncate font-display font-normal text-fg-1/70',
    input: [
      'inset-ring-1 inset-ring-border w-full min-w-72 rounded-3xl bg-surface-1 outline-none',
      'hover:inset-ring-2 hover:not-focus-visible:bg-fill-1',
    ],
    inputStartElement: 'left-0',
    inputEndElement: 'right-0',
    helperText: 'font-display font-medium text-fg-1/70 leading-snug',
    errorText: '',
  },
  variants: {
    size: {
      sm: {
        base: '',
        label: '',
        input: '',
        helperText: '',
        errorText: '',
      },
      md: {
        base: '',
        label: 'text-base',
        input: 'h-11 pr-3 pl-4',
        inputStartElement: 'left-4',
        inputEndElement: 'right-3',
        helperText: 'text-sm',
        errorText: '',
      },
      lg: {
        base: '',
        label: '',
        input: '',
        helperText: '',
        errorText: '',
      },
    },
    disabled: {
      true: {
        input: 'inset-ring-transparent cursor-not-allowed bg-fill-1',
      },
    },
  },
  compoundSlots: [
    {
      slots: ['inputStartElement', 'inputEndElement'],
      class: 'absolute [&_svg]:text-fill-5',
    },
    {
      slots: ['inputStartElement', 'inputEndElement'],
      size: 'md',
      class: '[&_svg]:size-6',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})

function TextField({
  children,
  size,
  orientation = 'vertical',
  startElement,
  endElement,
  className,
  ...props
}: TextFieldProps) {
  const { invalid } = props

  const {
    base,
    label: labelStyles,
    input,
    inputStartElement,
    inputEndElement,
    helperText: helperTextStyles,
    errorText: errorTextStyles,
  } = textFieldStyles({
    size,
  })

  const clonedTextFieldInput = React.Children.map(children, child => {
    if (
      React.isValidElement<TextFieldInputProps>(child) &&
      child.type === TextFieldInput
    ) {
      return React.cloneElement(child, {
        ...child.props,
        className: cn(child.props.className, input()),
      })
    }

    return null
  })?.filter(Boolean)[0]

  return (
    <Field.Root
      {...props}
      className={base({
        className,
      })}
    >
      <div
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
          getOrientationSpacingMap(orientation, size),
        )}
      >
        <Field.Label className={labelStyles()}>Label</Field.Label>

        <div className={cn('relative grid items-center')}>
          <span className={inputStartElement()}>{startElement}</span>

          {React.Children.only(clonedTextFieldInput)}

          <span className={inputEndElement()}>{endElement}</span>
        </div>
      </div>

      {!invalid && (
        <Field.HelperText className={helperTextStyles()}>
          Please enter your E-Mail
        </Field.HelperText>
      )}

      <Field.ErrorText className={errorTextStyles()}>
        This field is required
      </Field.ErrorText>
    </Field.Root>
  )
}

type TextFieldInputProps = FieldInputProps

function TextFieldInput({ className, ...props }: TextFieldInputProps) {
  const { invalid } = useFieldContext()

  return (
    <Field.Input
      {...props}
      className={cn(
        invalid
          ? 'inset-ring-2 inset-ring-danger'
          : 'focus-visible:inset-ring-2 focus-visible:inset-ring-brand',
        className,
      )}
    />
  )
}

function getOrientationSpacingMap(
  orientation: Orientation,
  size: TextFieldProps['size'],
): ClassValue {
  const orientationSpacingMap: OrientationSpacingMap = {
    vertical: {
      sm: '',
      md: 'gap-2.5',
      lg: '',
    },
    horizontal: {
      sm: '',
      md: 'gap-3',
      lg: '',
    },
  }

  return orientationSpacingMap[orientation][size!]
}

TextField.Input = TextFieldInput

export { TextField }
export type { TextFieldProps }
