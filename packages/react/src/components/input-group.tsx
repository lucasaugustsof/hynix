import React, { useCallback } from 'react'

import type { InputProps } from '@/registry/components/input'

import { cn } from '@/registry/utils/cn'

type InputSlotContent = React.ReactElement | string | number

interface InputGroupProps extends Pick<InputProps, 'size' | 'disabled'> {
  children: React.ReactElement<InputProps>
  prefix?: InputSlotContent
  suffix?: InputSlotContent
}

const BASE_FONT_SIZE = 16

// Define padding values based on the Hynix Design System
const INPUT_PADDING = {
  sm: {
    left: 40,
    right: 38,
  },
  md: {
    left: 50,
    right: 46,
  },
  lg: {
    left: 60,
    right: 56,
  },
} as const

// Defines positioning and styling for slot elements
const SLOT_POSITIONING = {
  sm: {
    left: 'left-3 [&_svg]:size-5',
    right: 'right-2.5 [&_svg]:size-5',
  },
  md: {
    left: 'left-4 [&_svg]:size-6',
    right: 'right-3 [&_svg]:size-6',
  },
  lg: {
    left: 'left-5 [&_svg]:size-7',
    right: 'right-4 [&_svg]:size-7',
  },
} as const

export function InputGroup({
  children,
  size = 'md',
  disabled,
  prefix,
  suffix,
}: InputGroupProps) {
  let childElement: React.ReactElement<InputProps>

  try {
    childElement = React.Children.only(
      children,
    ) as React.ReactElement<InputProps>
  } catch (error) {
    throw new Error(
      'InputGroup requires exactly one Input component as a child.',
    )
  }

  const filteredChildProps = Object.entries(childElement.props)
    .filter(([key]) => {
      const ignoredProperties = ['size', 'disabled']
      return !ignoredProperties.includes(key)
    })
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {} as InputProps,
    )

  const convertPixelsToRem = useCallback((pixels: number) => {
    return `${pixels / BASE_FONT_SIZE}rem`
  }, [])

  return (
    <div className={cn('relative')}>
      {prefix && (
        <span
          className={cn(
            '-translate-y-1/2 absolute top-1/2 *:pointer-events-none [&_svg]:text-fill-5',
            disabled && '[&_svg]:text-disabled',
            SLOT_POSITIONING[size!].left,
          )}
        >
          {prefix}
        </span>
      )}

      {React.cloneElement(childElement, {
        ...filteredChildProps,
        size,
        disabled,
        style: {
          ...(prefix && {
            paddingLeft: convertPixelsToRem(INPUT_PADDING[size!].left),
          }),
          ...(suffix && {
            paddingRight: convertPixelsToRem(INPUT_PADDING[size!].right),
          }),
        },
      })}

      {suffix && (
        <span
          className={cn(
            '-translate-y-1/2 absolute top-1/2 *:pointer-events-none [&_svg]:text-fill-5',
            disabled && '[&_svg]:text-disabled',
            SLOT_POSITIONING[size!].right,
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  )
}
