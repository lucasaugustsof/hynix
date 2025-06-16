import * as React from 'react'
import type { Assign } from '@ark-ui/react'
import { Field as ArkField } from '@ark-ui/react/field'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const inputStyles = tv({
  slots: {
    root: [
      'group inline-flex overflow-hidden rounded-xl bg-surface-1 ring-1 ring-border',
      'focus-within:bg-surface-2 focus-within:ring-2 focus-within:ring-brand',
      'has-disabled:bg-fill-1 has-disabled:ring-0 has-disabled:*:cursor-not-allowed',
    ],
    input: [
      'min-w-0 flex-1 font-medium font-sans text-fg-1 tracking-normal caret-brand outline-none placeholder:select-none',
      'disabled:text-disabled disabled:placeholder:text-disabled',
    ],
    addon: [
      'grid h-full shrink-0 place-items-center font-medium font-sans text-fill-5',
      'data-[styling=true]:bg-fill-1 data-[styling=true]:text-fg-1/40',
      'group-has-disabled:text-disabled',
    ],
  },
  variants: {
    size: {
      sm: {
        root: 'h-9',
        input: 'pr-2.5 pl-3 text-sm/5.5',
        addon: 'text-sm/5.5 [&_svg]:size-5',
      },
      md: {
        root: 'h-11',
        input: 'pr-3 pl-4 text-base',
        addon: 'text-base [&_svg]:size-6',
      },
      lg: {
        root: ['h-14', 'focus-within:ring-3'],
        input: 'pr-4 pl-5 text-lg/7',
        addon: [
          'text-lg/7 [&_svg]:size-7',
          'data-[part=prefix]:data-[styling=true]:pr-4 data-[part=prefix]:pl-4',
          'data-[part=suffix]:data-[styling=true]:pl-4 data-[part=suffix]:pr-4',
        ],
      },
    },
    isInvalid: {
      true: {
        root: 'bg-surface-2 ring-2 ring-danger',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: {
        addon: [
          'data-[part=prefix]:data-[styling=true]:pr-3 data-[part=prefix]:pl-3',
          'data-[part=suffix]:data-[styling=true]:pl-3 data-[part=suffix]:pr-3',
        ],
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    isInvalid: false,
  },
})

type InputVariants = VariantProps<typeof inputStyles>

export type InputProps = Assign<
  Omit<React.CustomComponentPropsWithRef<typeof ArkField.Input>, 'prefix'>,
  InputVariants
> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  prefixStyling?: boolean
  suffixStyling?: boolean
}

type AdornmentProps = {
  placement: 'prefix' | 'suffix'
  size: InputVariants['size']
  styling?: boolean
  children: React.ReactNode
  htmlFor?: string
}

function InputAdornment({
  placement,
  size,
  styling = false,
  children,
  htmlFor,
}: AdornmentProps) {
  const { addon } = inputStyles()
  return (
    <ArkField.Label
      htmlFor={htmlFor}
      className={cn(addon({ size }))}
      role="presentation"
      data-part={placement}
      data-styling={styling}
    >
      {children}
    </ArkField.Label>
  )
}

InputAdornment.displayName = 'InputAdornment'

export function Input({
  className,
  size = 'md',
  isInvalid,
  prefix,
  suffix,
  prefixStyling = false,
  suffixStyling = false,
  ...props
}: InputProps) {
  const { id: propsId, ...rest } = props
  const inputId = propsId ?? React.useId()
  const { root, input } = inputStyles({ size })

  return (
    <div
      className={cn(
        root({
          className,
          isInvalid,
        }),
      )}
      data-scope="input"
      data-part="root"
    >
      {prefix && (
        <InputAdornment
          placement="prefix"
          size={size}
          styling={prefixStyling}
          htmlFor={inputId}
        >
          {prefix}
        </InputAdornment>
      )}

      <ArkField.Input
        {...rest}
        id={inputId}
        className={cn(input())}
        aria-invalid={isInvalid}
      />

      {suffix && (
        <InputAdornment
          placement="suffix"
          size={size}
          styling={suffixStyling}
          htmlFor={inputId}
        >
          {suffix}
        </InputAdornment>
      )}
    </div>
  )
}

Input.displayName = 'Input'
