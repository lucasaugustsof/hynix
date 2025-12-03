export {
  type TabsFocusChangeDetails as SegmentedControlFocusChangeDetails,
  type UseTabsContext as UseSegmentedControlContext,
  type UseTabsReturn as UseSegmentedControlReturn,
  useTabs as useSegmentedControl,
  useTabsContext as useSegmentedControlContext,
} from '@ark-ui/react/tabs'

export * as SegmentedControl from './namespace'
export type {
  SegmentedControlContentProps,
  SegmentedControlListProps,
  SegmentedControlRootProps,
  SegmentedControlTriggerProps,
} from './segmented-control'
