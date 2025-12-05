'use client'

import {
  Switch as ArkSwitch,
  type SwitchControlProps as ArkSwitchControlProps,
  type SwitchRootProps as ArkSwitchRootProps,
  useSwitchContext,
} from '@ark-ui/react/switch'

import { cn } from '@/lib/cn'

const SWITCH_ROOT_PROVIDER_NAME = 'Switch.RootProvider'
const SWITCH_ROOT_NAME = 'Switch.Root'
const SWITCH_CONTROL_NAME = 'Switch.Control'
const SWITCH_LABEL_NAME = 'Switch.Label'

////////////////////////////////////////////////////////////////////////////////////

/**
 * Switch root component that wraps the entire switch composition.
 * Built on Ark UI with proper accessibility and state management.
 * Includes a hidden input for form integration.
 * Manages toggle state for on/off interactions.
 *
 * @example
 * ```tsx
 * <Switch.Root>
 *   <Switch.Control />
 *   <Switch.Label>Enable notifications</Switch.Label>
 * </Switch.Root>
 *
 * <Switch.Root defaultChecked>
 *   <Switch.Control />
 *   <Switch.Label>Dark mode</Switch.Label>
 * </Switch.Root>
 *
 * <Switch.Root disabled>
 *   <Switch.Control />
 *   <Switch.Label>Unavailable feature</Switch.Label>
 * </Switch.Root>
 * ```
 */
export interface SwitchRootProps extends ArkSwitchRootProps {}

export const SwitchRootProvider = ArkSwitch.RootProvider
SwitchRootProvider.displayName = SWITCH_ROOT_PROVIDER_NAME

export function SwitchRoot({ children, ...props }: SwitchRootProps) {
  return (
    <ArkSwitch.Root {...props}>
      {children}
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  )
}

SwitchRoot.displayName = SWITCH_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Switch control component that displays the visual toggle element.
 * Includes an animated thumb that slides between checked/unchecked states.
 * Provides visual feedback for hover, active, and disabled states.
 * Features smooth transitions and radial mask effect on the thumb.
 * Automatically detects disabled state from context.
 *
 * @example
 * ```tsx
 * <Switch.Root>
 *   <Switch.Control />
 * </Switch.Root>
 *
 * <Switch.Root defaultChecked>
 *   <Switch.Control />
 *   <Switch.Label>Auto-save</Switch.Label>
 * </Switch.Root>
 *
 * <Switch.Root disabled>
 *   <Switch.Control />
 *   <Switch.Label>Premium feature</Switch.Label>
 * </Switch.Root>
 * ```
 */
export interface SwitchControlProps extends ArkSwitchControlProps {}

export function SwitchControl({ className, ...props }: SwitchControlProps) {
  const { disabled: isDisabled } = useSwitchContext()

  return (
    <ArkSwitch.Control
      className={cn(
        'group relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full transition-colors duration-200',
        'before:-translate-y-1/2 before:-translate-x-1/2 before:absolute before:inset-0 before:top-1/2 before:left-1/2 before:h-5 before:w-8 before:content-[""]',
        // unchecked
        'data-[state=unchecked]:not-data-disabled:data-hover:bg-fill-3 data-[state=unchecked]:not-data-disabled:bg-fill-2',
        // checked
        'data-[state=checked]:not-data-disabled:data-hover:bg-[color-mix(in_oklab,var(--color-brand)_80%,black))] data-[state=checked]:not-data-disabled:bg-brand',
        // disabled
        'data-disabled:inset-ring-1 data-disabled:inset-ring-disabled data-disabled:cursor-not-allowed data-disabled:bg-transparent',
        className
      )}
      {...props}
    >
      <ArkSwitch.Thumb
        className={cn(
          '-translate-y-1/2 absolute top-1/2 left-0.5 size-3 rounded-[inherit] bg-fg-2 shadow-xs transition-transform duration-250 ease-out',
          // checked
          'data-[state=checked]:translate-x-full group-data-active:scale-95',
          // disabled
          'data-disabled:bg-disabled',
          !isDisabled &&
            'mask-radial-at-center mask-radial-from-transparent mask-radial-to-black mask-radial-to-0.5 mask-radial-from-0.5'
        )}
      />
    </ArkSwitch.Control>
  )
}

SwitchControl.displayName = SWITCH_CONTROL_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Switch label component that displays text next to the switch.
 * Automatically associates with the switch for proper accessibility.
 * Clicking the label toggles the switch state.
 *
 * @example
 * ```tsx
 * <Switch.Root>
 *   <Switch.Control />
 *   <Switch.Label>Enable two-factor authentication</Switch.Label>
 * </Switch.Root>
 *
 * <Switch.Root>
 *   <Switch.Control />
 *   <Switch.Label>Receive email updates</Switch.Label>
 * </Switch.Root>
 * ```
 */
export const SwitchLabel = ArkSwitch.Label
SwitchLabel.displayName = SWITCH_LABEL_NAME
