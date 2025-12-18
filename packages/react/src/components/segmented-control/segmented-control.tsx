import type * as React from 'react'
import { ark } from '@ark-ui/react/factory'
import {
  SegmentGroup as ArkSegmentGroup,
  type SegmentGroupItemProps as ArkSegmentGroupItemProps,
  type SegmentGroupItemTextProps as ArkSegmentGroupItemTextProps,
  type SegmentGroupRootProps as ArkSegmentGroupRootProps,
  type SegmentGroupRootProviderProps as ArkSegmentGroupRootProviderProps,
} from '@ark-ui/react/segment-group'

import { cn } from '@/lib/cn'

const SEGMENTED_CONTROL_ROOT_NAME = 'SegmentedControl.Root'
const SEGMENTED_CONTROL_LIST_NAME = 'SegmentedControl.List'
const SEGMENTED_CONTROL_ITEM_NAME = 'SegmentedControl.Item'
const SEGMENTED_CONTROL_ITEM_TEXT_NAME = 'SegmentedControl.ItemText'
const SEGMENTED_CONTROL_ITEM_ICON_NAME = 'SegmentedControl.ItemIcon'

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlRootProviderProps extends ArkSegmentGroupRootProviderProps {}

export const SegmentedControlRootProvider = ArkSegmentGroup.RootProvider

export const SegmentedControlContext = ArkSegmentGroup.Context

export interface SegmentedControlRootProps extends ArkSegmentGroupRootProps {}

export function SegmentedControlRoot({ className, ...props }: SegmentedControlRootProps) {
  return (
    <ArkSegmentGroup.Root
      {...props}
      className={cn('inline-flex min-w-xs flex-col', className)}
      data-scope="segmented-control"
      data-part="root"
      orientation="horizontal"
    />
  )
}

SegmentedControlRoot.displayName = SEGMENTED_CONTROL_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlListProps extends React.ComponentProps<'div'> {}

/**
 * Container for segmented control items with animated indicator.
 */
export function SegmentedControlList({ children, className, ...props }: SegmentedControlListProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center gap-x-1 overflow-hidden rounded-[calc(--spacing(1.5)_+_--spacing(1))] bg-fill-1 p-1',
        'supports-[corner-shape:superellipse]:[corner-shape:superellipse(1.3)]',
        className
      )}
      data-scope="segmented-control"
      data-part="list"
    >
      {children}

      <ArkSegmentGroup.Indicator
        className={cn(
          'z-10 h-(--height) w-(--width) rounded-md bg-surface-1 shadow-black/6 shadow-md',
          '[--transition-duration:150ms] [--transition-timing-function:cubic-bezier(0.165,0.84,0.44,1))]',
          'supports-[corner-shape:superellipse]:[corner-shape:superellipse(1.3)]'
        )}
      />
    </div>
  )
}

SegmentedControlList.displayName = SEGMENTED_CONTROL_LIST_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlItemProps extends ArkSegmentGroupItemProps {}

export function SegmentedControlItem({ children, ...props }: SegmentedControlItemProps) {
  return (
    <ArkSegmentGroup.Item
      {...props}
      className={cn(
        'group z-20 inline-flex h-7 flex-1 cursor-pointer items-center justify-center gap-x-1.5 whitespace-nowrap rounded-md p-1 outline-hidden',
        // focus visible
        'focus-visible:focus-outline',
        // disabled
        'disabled:cursor-not-allowed disabled:text-disabled'
      )}
      data-scope="segmented-control"
      data-part="item"
    >
      {children}
      <ArkSegmentGroup.ItemControl />
      <ArkSegmentGroup.ItemHiddenInput />
    </ArkSegmentGroup.Item>
  )
}

SegmentedControlItem.displayName = SEGMENTED_CONTROL_ITEM_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlItemTextProps extends ArkSegmentGroupItemTextProps {}

export function SegmentedControlItemText({ className, ...props }: SegmentedControlItemTextProps) {
  return (
    <ArkSegmentGroup.ItemText
      {...props}
      className={cn(
        'select-none font-medium font-sans text-fg-1/40 text-sm/4 tracking-[-0.00525rem] transition-colors duration-200',
        // hover
        'group-data-[state=unchecked]:group-data-hover:text-fg-1/70',
        // checked
        'group-data-[state=checked]:text-fg-1',
        className
      )}
      data-scope="segmented-control"
      data-part="item-text"
    />
  )
}

SegmentedControlItemText.displayName = SEGMENTED_CONTROL_ITEM_TEXT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlItemIconProps extends React.ComponentProps<typeof ark.span> {}

export function SegmentedControlItemIcon({ ...props }: SegmentedControlItemIconProps) {
  return (
    <ark.span
      {...props}
      className={cn(
        'size-5 shrink-0 fill-fg-1/40 transition-colors duration-200',
        // hover
        'group-data-[state=unchecked]:group-data-hover:fill-fg-1/70',
        // checked
        'group-data-[state=checked]:fill-fg-1'
      )}
      data-scope="segmented-control"
      data-part="item-icon"
    />
  )
}

SegmentedControlItemIcon.displayName = SEGMENTED_CONTROL_ITEM_ICON_NAME
