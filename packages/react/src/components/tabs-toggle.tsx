import * as React from 'react'

import type { Assign } from '@ark-ui/react'
import { Tabs as ArkTabs, useTabs, useTabsContext } from '@ark-ui/react/tabs'

import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

//---------------------------------
// Constants
//---------------------------------

const TABS_TOGGLE_PARTS = {
  Root: 'TabsToggle',
  List: 'TabsToggleList',
  Trigger: 'TabsToggleTrigger',
  Content: 'TabsToggleContent',
}

//---------------------------------
// Variants
//---------------------------------

const tabsVariantsSlots = tv({
  slots: {
    root: null,
    list: 'inline-flex gap-0.5 rounded-xl bg-fill-1 p-0.5',
    trigger: 'group relative w-fit cursor-pointer outline-hidden',
  },
  variants: {
    size: {
      sm: {
        list: 'h-8',
        trigger: 'px-3 *:gap-2 *:text-sm/5.5 *:[&_svg]:size-5',
      },
      md: {
        list: 'h-11',
        trigger: 'px-4 *:gap-2.5 *:text-base *:[&_svg]:size-6',
      },
      lg: {
        list: 'h-14',
        trigger: 'px-5 *:gap-3 *:text-lg/7 *:[&_svg]:size-7',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const { root, list, trigger } = tabsVariantsSlots()

//---------------------------------
// Types
//---------------------------------

type TabsToggleSharedProps = VariantProps<typeof tabsVariantsSlots>

type TabsToggleProps = Assign<
  React.CustomComponentPropsWithRef<typeof ArkTabs.Root>,
  TabsToggleSharedProps
>

//---------------------------------
// TabsToggle
//---------------------------------

function TabsToggle({ children, className, size, ...props }: TabsToggleProps) {
  const keyPrefix = React.useId()

  const extendedChildrenWithInjectedProps = recursiveClone(children, {
    inject: {
      size,
    },
    match: [TABS_TOGGLE_PARTS.List, TABS_TOGGLE_PARTS.Trigger],
    keyPrefix,
  })

  return (
    <ArkTabs.Root
      {...props}
      className={cn(
        root({
          className,
        }),
      )}
      deselectable={false}
    >
      {extendedChildrenWithInjectedProps}
    </ArkTabs.Root>
  )
}

TabsToggle.displayName = TABS_TOGGLE_PARTS.Root

//---------------------------------
// TabsToggleList
//---------------------------------

function TabsToggleList({
  className,
  size,
  ...props
}: Assign<
  React.CustomComponentPropsWithRef<typeof ArkTabs.List>,
  TabsToggleSharedProps
>) {
  return (
    <ArkTabs.List
      {...props}
      className={cn(
        list({
          className,
          size,
        }),
      )}
    />
  )
}

TabsToggleList.displayName = TABS_TOGGLE_PARTS.List

//---------------------------------
// TabsToggleTrigger
//---------------------------------

function TabsToggleTrigger({
  children,
  className,
  size,
  ...props
}: Assign<
  React.ComponentPropsWithRef<typeof ArkTabs.Trigger>,
  TabsToggleSharedProps
>) {
  const { value } = useTabsContext()
  const isSelectedValue = props.value === value

  return (
    <ArkTabs.Trigger
      {...props}
      className={cn(
        trigger({
          className,
          size,
        }),
      )}
    >
      <span
        className={cn(
          'relative z-10 inline-flex h-full select-none items-center whitespace-nowrap transition-colors duration-225 ease-out-circ',
          'font-sans font-semibold text-fg-1/40 tracking-normal',
          'group-data-selected:select-auto group-data-selected:text-fg-1 group-data-selected:[&_svg]:fill-fill-5',
        )}
      >
        {children}
      </span>

      <AnimatePresence mode="popLayout">
        {isSelectedValue && (
          <motion.span
            layoutId="focused-value"
            className={cn(
              'absolute inset-0 z-0 size-full place-items-center rounded-[calc(var(--radius-lg)_+_var(--radius-xs))] border border-border bg-surface-1 text-fg-1',
              'shadow-black/6 shadow-xs dark:shadow-white/6',
            )}
            initial={false}
            transition={{
              layout: {
                duration: 0.25,
                ease: [0.215, 0.61, 0.355, 1],
              },
            }}
          />
        )}
      </AnimatePresence>
    </ArkTabs.Trigger>
  )
}

TabsToggleTrigger.displayName = TABS_TOGGLE_PARTS.Trigger

//---------------------------------
// TabsToggleContent
//---------------------------------

const TabsToggleContent = ArkTabs.Content
TabsToggleContent.displayName = TABS_TOGGLE_PARTS.Content

//---------------------------------
// Exports
//---------------------------------

export {
  TabsToggle,
  TabsToggleContent,
  TabsToggleList,
  TabsToggleTrigger,
  useTabs,
}
export type { TabsToggleProps }
