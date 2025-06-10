import * as React from 'react'

import { Switch as ArkSwitch, useSwitch } from '@ark-ui/react/switch'
import type { Assign } from '@ark-ui/react'

import { Label, type LabelProps } from '@r/components/label'

import { cn } from '@r/utilities/cn'
import { tv, type VariantProps } from '@r/utilities/tv'
import { recursiveClone } from '@r/utilities/recursive-clone'

const SWITCH_SLOT_KEYS = {
  Root: 'Switch.Root',
  Control: 'Switch.Control',
  Label: 'Switch.Label',
  Provider: 'Switch.Provider',
}

const switchStyles = tv({
  slots: {
    root: [
      'group isolate inline-flex shrink-0 cursor-pointer items-center gap-x-3',
      'outline-hidden',

      'data-disabled:cursor-not-allowed',
    ],

    control: [
      'inline-flex shrink-0 rounded-full bg-fill-2',
      'outline-brand/40 outline-offset-2 transition-colors ease-out',

      'data-disabled:bg-fill-1',

      'not-data-[disabled]:data-[state=checked]:bg-brand',

      'group-data-[focus-visible]:data-[state=checked]:outline-2',
      'group-data-[focus-visible]:data-[state=unchecked]:outline-2',
    ],

    thumb: [
      'block rounded-full bg-surface-1',
      'transition-transform ease-out',

      'data-[state=checked]:translate-x-6',

      'data-disabled:bg-fill-2',
      'not-data-[disabled]:shadow-xs shadow-black/8',
    ],
  },

  variants: {
    size: {
      sm: {
        control: 'w-10 p-0.5',
        thumb: ['size-4', 'data-[state=checked]:translate-x-5'],
      },
      md: {
        control: 'w-12 p-0.5',
        thumb: ['size-5', 'data-[state=checked]:translate-x-6'],
      },
      lg: {
        control: 'w-14 p-1',
        thumb: ['size-6', 'data-[state=checked]:translate-x-6'],
      },
      xl: {
        control: 'w-20 p-1',
        thumb: ['size-9', 'data-[state=checked]:translate-x-9'],
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

const { root, control, thumb } = switchStyles()

type SwitchSharedProps = VariantProps<typeof switchStyles>

type SwitchProps = Assign<
  React.ComponentProps<typeof ArkSwitch.Root>,
  SwitchSharedProps
>

type SwitchControlProps = Assign<
  React.ComponentProps<typeof ArkSwitch.Control>,
  SwitchSharedProps
>

const SwitchRoot = ({ children, className, size, ...props }: SwitchProps) => {
  const keyPrefix = React.useId()

  const extendedChildren = recursiveClone(children, {
    inject: { size },
    match: [SWITCH_SLOT_KEYS.Control, SWITCH_SLOT_KEYS.Label],
    keyPrefix,
  })

  return (
    <ArkSwitch.Root
      {...props}
      className={cn(
        root({
          size,
        }),
        className,
      )}
    >
      {extendedChildren}
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  )
}

SwitchRoot.displayName = SWITCH_SLOT_KEYS.Root

const SwitchControl = ({ className, size, ...props }: SwitchControlProps) => (
  <ArkSwitch.Control
    {...props}
    className={cn(
      control({
        size,
      }),
      className,
    )}
  >
    <ArkSwitch.Thumb
      className={cn(
        thumb({
          size,
        }),
      )}
    />
  </ArkSwitch.Control>
)

SwitchControl.displayName = SWITCH_SLOT_KEYS.Control

const SwitchLabel = ({ children, ...props }: LabelProps) => (
  <ArkSwitch.Label {...props} asChild>
    <Label>{children}</Label>
  </ArkSwitch.Label>
)

SwitchLabel.displayName = SWITCH_SLOT_KEYS.Label

const SwitchProvider = ArkSwitch.RootProvider
SwitchProvider.displayName = SWITCH_SLOT_KEYS.Provider

const Switch = {
  Root: SwitchRoot,
  Control: SwitchControl,
  Label: SwitchLabel,
  Provider: SwitchProvider,
}

export { Switch, useSwitch }
export type { SwitchProps }
