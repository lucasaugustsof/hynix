import * as React from 'react'

import type { Assign } from '@ark-ui/react'
import { Field as ArkField } from '@ark-ui/react/field'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const inputVariantsSlots = tv({
  slots: {
    root: [
      'group inline-flex min-w-[15rem] overflow-hidden rounded-xl bg-surface-1 ring-1 ring-border',
      'focus-within:bg-surface-2 focus-within:ring-2 focus-within:ring-brand',
      'has-disabled:bg-fill-1 has-disabled:ring-0 has-disabled:*:cursor-not-allowed',
    ],
    input: [
      'grow font-medium font-sans text-fg-1 tracking-normal caret-brand outline-none placeholder:select-none',
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
        addon: ['text-sm/5.5 [&_svg]:size-5'],
      },
      md: {
        root: 'h-11',
        input: 'pr-3 pl-4 text-base',
        addon: ['text-base [&_svg]:size-6'],
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
    invalid: {
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
    isError: false,
  },
})

type InputSharedProps = VariantProps<typeof inputVariantsSlots>

type InputProps = Assign<
  Omit<React.CustomComponentPropsWithRef<typeof ArkField.Input>, 'prefix'>,
  InputSharedProps
> & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  prefixStyling?: boolean
  suffixStyling?: boolean
}

type AddonProps = Pick<
  React.ComponentPropsWithRef<'label'>,
  'children' | 'htmlFor'
> & {
  size: InputSharedProps['size']
  type: 'prefix' | 'suffix'
  styling?: boolean
}

function InputAddon({ size, type, styling = false, ...props }: AddonProps) {
  const { addon } = inputVariantsSlots()

  return (
    <label
      {...props}
      role="presentation"
      className={cn(
        addon({
          size,
        }),
      )}
      data-scope="input"
      data-part={type}
      data-styling={styling}
    />
  )
}

function Input({
  className,
  size,
  invalid,
  prefix,
  suffix,
  prefixStyling = false,
  suffixStyling = false,
  ...props
}: InputProps) {
  const uniqueId = React.useId()

  const { root, input } = inputVariantsSlots({
    size,
  })

  return (
    <div
      className={cn(
        root({
          className,
          invalid,
        }),
      )}
      data-scope="input"
      data-part="root"
    >
      {prefix && (
        <InputAddon
          size={size}
          type="prefix"
          styling={prefixStyling}
          htmlFor={uniqueId}
        >
          {prefix}
        </InputAddon>
      )}

      <ArkField.Input
        {...props}
        id={uniqueId}
        className={cn(input())}
        data-scope="input"
        data-part="input"
        aria-invalid={invalid}
      />

      {suffix && (
        <InputAddon
          size={size}
          type="suffix"
          styling={suffixStyling}
          htmlFor={uniqueId}
        >
          {suffix}
        </InputAddon>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
