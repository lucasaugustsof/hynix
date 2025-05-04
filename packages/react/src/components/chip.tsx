import * as React from 'react'

import type { Assign } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

import { RiCloseLine } from '@remixicon/react'

//---------------------------------
// Constants
//---------------------------------

const CHIP_PARTS = {
  Root: 'Chip.Root',
  Label: 'Chip.Label',
  Close: 'Chip.Close',
}

//---------------------------------
// Variants
//---------------------------------

const chipVariantsWithSlots = tv({
  slots: {
    root: [
      'group isolate inline-flex items-center justify-center whitespace-nowrap rounded-full border border-border bg-surface-2 shadow-black/8 shadow-xs dark:shadow-white/8',
      'transition-colors ease-in-out-quad',
    ],
    label: 'font-medium font-sans text-fg-1',
    close: [
      'shrink-0 cursor-pointer transition-transform ease-in-out-quad [&_svg]:fill-fill-4',
      'hover:scale-110 active:scale-95',
    ],
  },
  variants: {
    size: {
      xs: {
        root: 'h-7 gap-1 px-2.5',
        label: 'text-xs/4.5',
        close: '[&_svg]:size-4',
      },
      sm: {
        root: 'h-8 gap-1.5 px-3',
        label: 'text-sm/5.5',
        close: '[&_svg]:size-5',
      },
      md: {
        root: 'h-11',
        label: 'text-base',
        close: '[&_svg]:size-6',
      },
      lg: {
        root: 'h-12',
        label: 'text-lg/7',
        close: '[&_svg]:size-7',
      },
    },
    active: {
      true: {
        root: 'border-brand bg-brand',
        label: 'text-fg-2',
        close: '[&_svg]:fill-fg-2',
      },
      false: {
        root: 'hover:bg-fill-1',
        close: 'group-hover:[&_svg]:fill-fill-5',
      },
    },
  },
  compoundVariants: [
    {
      size: ['md', 'lg'],
      class: {
        root: 'gap-2 px-4',
      },
    },
  ],
  defaultVariants: {
    size: 'sm',
    active: false,
  },
})

const { root, label, close } = chipVariantsWithSlots()

//---------------------------------
// Types
//---------------------------------

type ChipSharedProps = VariantProps<typeof chipVariantsWithSlots>

type ChipProps = Assign<React.ComponentPropsWithRef<'div'>, ChipSharedProps>

//---------------------------------
// Root
//---------------------------------

function Root({ children, className, size, active, ...props }: ChipProps) {
  const keyPrefix = React.useId()

  const extendedChildrenWithInjectedProps = recursiveClone<ChipSharedProps>(
    children,
    {
      match: [CHIP_PARTS.Root, CHIP_PARTS.Label, CHIP_PARTS.Close],
      inject: {
        size,
        active,
      },
      keyPrefix,
    },
  )

  return (
    <div
      {...props}
      className={cn(
        root({
          className,
          size,
          active,
        }),
      )}
      data-scope="chip"
      data-part="root"
      data-focusable
    >
      {extendedChildrenWithInjectedProps}
    </div>
  )
}

Root.displayName = CHIP_PARTS.Root

//---------------------------------
// Label
//---------------------------------

function Label({
  className,
  size,
  active,
  ...props
}: Assign<React.ComponentPropsWithRef<'span'>, ChipSharedProps>) {
  return (
    <span
      {...props}
      className={cn(
        label({
          className,
          size,
          active,
        }),
      )}
      data-scope="chip"
      data-part="label"
    />
  )
}

Label.displayName = CHIP_PARTS.Label

//---------------------------------
// Close
//---------------------------------

function Close({
  className,
  size,
  active,
  ...props
}: Assign<React.ComponentPropsWithRef<'button'>, ChipSharedProps>) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        close({
          className,
          size,
          active,
        }),
      )}
      data-scope="chip"
      data-part="close"
    >
      <RiCloseLine className={cn('transition-colors ease-in-out-quad')} />
    </button>
  )
}

Close.displayName = CHIP_PARTS.Close

//---------------------------------
// Exports
//---------------------------------

export const Chip = {
  Root,
  Label,
  Close,
}
export type { ChipProps }
