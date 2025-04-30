import { Tabs as ArkTabs, useTabsContext, useTabs } from '@ark-ui/react/tabs'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@r/utilities/cn'

type TabsToggleProps = React.CustomComponentPropsWithRef<typeof ArkTabs.Root>

function TabsToggle(props: TabsToggleProps) {
  return <ArkTabs.Root {...props} deselectable={false} />
}

const TabsToggleContent = ArkTabs.Content

function TabsToggleList({
  ...props
}: React.CustomComponentPropsWithRef<typeof ArkTabs.List>) {
  return (
    <ArkTabs.List
      {...props}
      className={cn('inline-flex gap-0.5 rounded-xl bg-fill-1 p-0.5')}
    />
  )
}

function TabsToggleTrigger({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof ArkTabs.Trigger>) {
  const { value } = useTabsContext()
  const isSelectedValue = props.value === value

  return (
    <ArkTabs.Trigger
      {...props}
      className={cn(
        'group relative h-8 w-fit cursor-pointer px-3 outline-hidden',
      )}
    >
      <span
        className={cn(
          'relative z-10 select-none transition-colors duration-225 ease-out-circ',
          'font-medium font-sans text-fg-1/40 text-sm/5.5 group-data-selected:select-auto group-data-selected:text-fg-1',
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

export {
  TabsToggle,
  TabsToggleContent,
  TabsToggleList,
  TabsToggleTrigger,
  useTabs,
}
export type { TabsToggleProps }
