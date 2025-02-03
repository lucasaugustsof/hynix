// @NOTE: If you’re using Next.js, make sure to add "use client"; at the top of the file when needed.

// Hynix: InputGroup [v0.1.0]

import React, { useEffect, useState, useRef, forwardRef } from 'react'

import type { InputProps } from '@/registry/components/inputs/input'

import { cx } from '@/registry/utils/cx'

type SlottableType = React.ReactElement | string | number

type SlotProps = React.ComponentPropsWithRef<'span'> & {
  children?: React.ReactNode
}

type InputGroupProps = Pick<InputProps, 'size' | 'disabled'> & {
  children: React.ReactElement<InputProps>
  prefixElement?: SlottableType
  suffixElement?: SlottableType
}

const BASE_FONT_SIZE = 16

const paddingMapper = {
  sm: {
    left: 20,
    right: 18,
  },
  md: {
    left: 26,
    right: 22,
  },
  lg: {
    left: 32,
    right: 28,
  },
} as const

const slotSpacing = {
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

const Slot = forwardRef<HTMLSpanElement, SlotProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        {...props}
        ref={ref}
        className={cx(
          'absolute inline-flex [&_svg]:pointer-events-none [&_svg]:fill-fill-5',
          '-translate-y-1/2 top-1/2',
          className,
        )}
      >
        {children}
      </span>
    )
  },
)

Slot.displayName = 'Slot'

export function InputGroup({
  children,
  size = 'md',
  prefixElement,
  suffixElement,
  disabled,
}: InputGroupProps) {
  const slotPrefixRef = useRef<HTMLSpanElement>(null)
  const slotSuffixRef = useRef<HTMLSpanElement>(null)

  const { padding } = usePaddingCalculation(
    {
      slotPrefixRef,
      slotSuffixRef,
    },
    size!,
  )

  const child = React.Children.only<React.ReactElement<InputProps>>(children)
  const childProps = removeSpecificProperties(child.props, ['size', 'disabled'])

  return (
    <div
      className={cx('relative aria-disabled:**:[svg]:fill-disabled')}
      aria-disabled={disabled}
    >
      {!!prefixElement && (
        <Slot ref={slotPrefixRef} className={cx(slotSpacing[size!].left)}>
          {prefixElement}
        </Slot>
      )}

      {React.cloneElement(child, {
        ...(prefixElement || suffixElement
          ? {
              style: {
                paddingLeft: prefixElement && `${padding.left}rem`,
                paddingRight: suffixElement && `${padding.right}rem`,
              },
            }
          : {}),
        size,
        disabled,
        ...childProps,
      })}

      {!!suffixElement && (
        <Slot ref={slotSuffixRef} className={cx(slotSpacing[size!].right)}>
          {suffixElement}
        </Slot>
      )}
    </div>
  )
}

function removeSpecificProperties<T extends object>(
  props: T,
  keys: (keyof T)[],
) {
  const result: Partial<T> = {}

  for (const propKey in props) {
    if (keys.includes(propKey as keyof T)) {
      console.warn(
        `The "${propKey}" property on Input will be ignored because it is wrapped in an InputGroup.`,
        propKey,
      )

      continue
    }

    result[propKey] = props[propKey]
  }

  return result
}

type UsePaddingCalculationType = {
  slotPrefixRef: React.RefObject<HTMLSpanElement | null>
  slotSuffixRef: React.RefObject<HTMLSpanElement | null>
}

function usePaddingCalculation(
  slots: UsePaddingCalculationType,
  size: keyof typeof paddingMapper,
) {
  const { slotPrefixRef, slotSuffixRef } = slots

  const [padding, setPadding] = useState({
    left: 0,
    right: 0,
  })

  useEffect(() => {
    const getPaddingValue = (
      ref: React.RefObject<HTMLSpanElement | null>,
      side: 'left' | 'right',
    ) => {
      if (ref?.current) {
        const { width } = ref.current.getBoundingClientRect()
        return (width + paddingMapper[size][side]) / BASE_FONT_SIZE
      }

      return 0
    }

    setPadding({
      left: getPaddingValue(slotPrefixRef, 'left'),
      right: getPaddingValue(slotSuffixRef, 'right'),
    })
  }, [size, slotPrefixRef, slotSuffixRef])

  return {
    padding,
  }
}
