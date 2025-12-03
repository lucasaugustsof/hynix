import {
  Tabs as ArkTabs,
  type TabContentProps as ArkTabsContentProps,
  type TabListProps as ArkTabsListProps,
  type TabsRootProps as ArkTabsRootProps,
  type TabsRootProviderProps as ArkTabsRootProviderProps,
  type TabTriggerProps as ArkTabsTriggerProps,
} from '@ark-ui/react/tabs'

import { cn } from '@/lib/cn'
import type { PolymorphicProps } from '@/types/polymorphic'

const SEGMENTED_CONTROL_ROOT_NAME = 'SegmentedControl.Root'
const SEGMENTED_CONTROL_LIST_NAME = 'SegmentedControl.List'
const SEGMENTED_CONTROL_TRIGGER_NAME = 'SegmentedControl.Trigger'
const SEGMENTED_CONTROL_TRIGGER_ICON_NAME = 'SegmentedControl.TriggerIcon'
const SEGMENTED_CONTROL_CONTENT_NAME = 'SegmentedControl.Content'

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlRootProviderProps extends ArkTabsRootProviderProps {}

/**
 * Root provider component for SegmentedControl.
 * Accepts a `value` prop containing the return value of `useTabs` hook
 * and provides the tabs context to its children.
 *
 * @example
 * ```tsx
 * const tabs = useSegmentedControl({ defaultValue: 'tab1' })
 *
 * <SegmentedControl.RootProvider value={tabs}>
 *   {children}
 * </SegmentedControl.RootProvider>
 * ```
 */
export const SegmentedControlRootProvider = ArkTabs.RootProvider

/**
 * Context consumer for SegmentedControl.
 * Provides access to the tabs context (UseTabsReturn) via render prop or hook.
 *
 * @example
 * ```tsx
 * <SegmentedControl.Context>
 *   {(context) => <div>{context.value}</div>}
 * </SegmentedControl.Context>
 * ```
 */
export const SegmentedControlContext = ArkTabs.Context

export interface SegmentedControlRootProps extends ArkTabsRootProps {}

/**
 * Root container for the SegmentedControl component.
 * Provides the context and state management for all child components.
 *
 * @example
 * ```tsx
 * <SegmentedControl.Root defaultValue="option1">
 *   <SegmentedControl.List>
 *     <SegmentedControl.Trigger value="option1">Tab 1</SegmentedControl.Trigger>
 *     <SegmentedControl.Trigger value="option2">Tab 2</SegmentedControl.Trigger>
 *   </SegmentedControl.List>
 * </SegmentedControl.Root>
 * ```
 */
export function SegmentedControlRoot({ className, ...props }: SegmentedControlRootProps) {
  return (
    <ArkTabs.Root
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

export interface SegmentedControlListProps extends ArkTabsListProps {}

/**
 * Container for the segmented control triggers.
 * Renders a horizontal list with an animated indicator that slides to show the active tab.
 *
 * @description
 * This component automatically includes an indicator element that visually highlights
 * the selected trigger with a smooth sliding animation.
 *
 * @example
 * ```tsx
 * <SegmentedControl.List>
 *   <SegmentedControl.Trigger value="option1">Option 1</SegmentedControl.Trigger>
 *   <SegmentedControl.Trigger value="option2">Option 2</SegmentedControl.Trigger>
 *   <SegmentedControl.Trigger value="option3">Option 3</SegmentedControl.Trigger>
 * </SegmentedControl.List>
 * ```
 */
export function SegmentedControlList({ children, className, ...props }: SegmentedControlListProps) {
  return (
    <ArkTabs.List
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

      <ArkTabs.Indicator
        className={cn(
          'z-10 h-(--height) w-(--width) rounded-md bg-surface-1 shadow-black/6 shadow-md',
          '[--transition-duration:200ms] [--transition-timing-function:cubic-bezier(.645,.045,.355,1)]',
          'supports-[corner-shape:superellipse]:[corner-shape:superellipse(1.3)]'
        )}
      />
    </ArkTabs.List>
  )
}

SegmentedControlList.displayName = SEGMENTED_CONTROL_LIST_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlTriggerProps extends ArkTabsTriggerProps {}

/**
 * A clickable button that activates a specific tab in the segmented control.
 *
 * @description
 * Each trigger must have a unique `value` that corresponds to the tab content.
 * The selected trigger is visually highlighted with the animated indicator.
 * Supports keyboard navigation (arrow keys) and maintains focus states for accessibility.
 *
 * @example
 * ```tsx
 * <SegmentedControl.Trigger value="home">
 *   <SegmentedControl.TriggerIcon as={RiHome2Line} />
 *   Home
 * </SegmentedControl.Trigger>
 * ```
 *
 * @example
 * ```tsx
 * <SegmentedControl.Trigger value="settings" disabled>
 *   Settings
 * </SegmentedControl.Trigger>
 * ```
 */
export function SegmentedControlTrigger(props: SegmentedControlTriggerProps) {
  return (
    <ArkTabs.Trigger
      {...props}
      className={cn(
        'z-20 inline-flex flex-1 cursor-pointer items-center justify-center gap-x-1.5 whitespace-nowrap rounded-md p-1 outline-hidden transition-[color,scale] duration-200',
        'font-medium font-sans text-fg-1/40 text-sm/4 tracking-[-0.00525rem]',
        // hover
        'not-data-selected:enabled:hover:text-fg-1/70',
        // active
        'not-data-selected:active:scale-98',
        // focus visible
        'focus-visible:focus-outline',
        // disabled
        'disabled:cursor-not-allowed disabled:text-disabled',
        // selected
        'data-selected:text-fg-1'
      )}
      data-scope="segmented-control"
      data-part="trigger"
    />
  )
}

SegmentedControlTrigger.displayName = SEGMENTED_CONTROL_TRIGGER_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Icon wrapper for SegmentedControl triggers.
 * A polymorphic component that renders an icon with consistent sizing.
 *
 * @param {React.ElementType} as - The icon component to render (e.g., from @remixicon/react).
 *
 * @description
 * This component provides proper sizing (20x20px) and styling for icons within triggers.
 * It automatically inherits the trigger's text color for proper visual states.
 *
 * @example
 * ```tsx
 * import { RiHome2Line, RiSettings3Line } from '@remixicon/react'
 *
 * <SegmentedControl.Trigger value="home">
 *   <SegmentedControl.TriggerIcon as={RiHome2Line} />
 *   Home
 * </SegmentedControl.Trigger>
 *
 * <SegmentedControl.Trigger value="settings">
 *   <SegmentedControl.TriggerIcon as={RiSettings3Line} />
 *   Settings
 * </SegmentedControl.Trigger>
 * ```
 */
export function SegmentedControlTriggerIcon<T extends React.ElementType>({
  as,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'span'

  return (
    <Component
      {...props}
      className={cn('size-5 shrink-0 fill-current')}
      data-scope="segmented-control"
      data-part="trigger-icon"
    />
  )
}

SegmentedControlTriggerIcon.displayName = SEGMENTED_CONTROL_TRIGGER_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface SegmentedControlContentProps extends ArkTabsContentProps {}

/**
 * Container for the content associated with a specific tab.
 *
 * @description
 * Only the content matching the currently selected trigger's value will be displayed.
 * Content is conditionally rendered based on the active tab selection.
 *
 * @example
 * ```tsx
 * <SegmentedControl.Root defaultValue="overview">
 *   <SegmentedControl.List>
 *     <SegmentedControl.Trigger value="overview">Overview</SegmentedControl.Trigger>
 *     <SegmentedControl.Trigger value="details">Details</SegmentedControl.Trigger>
 *   </SegmentedControl.List>
 *
 *   <SegmentedControl.Content value="overview">
 *     <p>Overview content goes here</p>
 *   </SegmentedControl.Content>
 *
 *   <SegmentedControl.Content value="details">
 *     <p>Details content goes here</p>
 *   </SegmentedControl.Content>
 * </SegmentedControl.Root>
 * ```
 */
export function SegmentedControlContent(props: SegmentedControlContentProps) {
  return <ArkTabs.Content {...props} data-scope="segmented-control" data-part="content" />
}

SegmentedControlContent.displayName = SEGMENTED_CONTROL_CONTENT_NAME
