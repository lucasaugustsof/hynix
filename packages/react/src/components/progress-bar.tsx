// @NOTE: In Next.js, add 'use client' to enable client-side features

import { useId } from 'react'

import type { Assign } from '@ark-ui/react'
import {
  Progress as ArkProgressBar,
  useProgress,
  useProgressContext,
} from '@ark-ui/react/progress'
import type * as ArkProgressBarDefs from '@ark-ui/react/progress'

import NumberFlow from '@number-flow/react'

import { cn } from 'registry/utilities/cn'
import { recursiveClone } from 'registry/utilities/recursive-clone'
import { type VariantProps, tv } from 'registry/utilities/tv'

type ProgressBarSharedProps = VariantProps<typeof progressBarVariants>

type ProgressBarProps = Assign<
  ArkProgressBarDefs.ProgressRootProps,
  ProgressBarSharedProps
>

const ProgressBarAnatomy = {
  root: 'ProgressBar',
  label: 'ProgressBarLabel',
  valueText: 'ProgressBarValueText',
  track: 'ProgressBarTrack',
} as const

const progressBarVariants = tv({
  slots: {
    root: 'isolate flex min-w-96 items-center',
    valueText: 'font-medium font-sans text-fg-1 tabular-nums',
    track: 'grow overflow-hidden rounded-xs bg-fill-2',
  },
  variants: {
    size: {
      sm: {
        valueText: 'text-xs/4.5',
        track: 'h-1',
      },
      md: {
        valueText: 'text-sm/5.5',
        track: 'h-2',
      },
      lg: {
        root: 'gap-2.5',
        valueText: 'text-base',
        track: 'h-3',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: {
        root: 'gap-2',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})

const { root, valueText, track } = progressBarVariants()

// ProgressBarProvider ↴

function ProgressBarProvider({
  children,
  className,
  size,
  ...props
}: Assign<
  ArkProgressBarDefs.ProgressRootProviderProps,
  ProgressBarSharedProps
>) {
  const uniqueId = useId()

  const extendedChildrenWithInjectedProps =
    recursiveClone<ProgressBarSharedProps>(children, {
      inject: {
        size,
      },
      match: [
        ProgressBarAnatomy.label,
        ProgressBarAnatomy.valueText,
        ProgressBarAnatomy.track,
      ],
      keyPrefix: uniqueId,
    })

  return (
    <ArkProgressBar.RootProvider
      {...props}
      className={cn(
        root({
          className,
        }),
      )}
    >
      {extendedChildrenWithInjectedProps}
    </ArkProgressBar.RootProvider>
  )
}

// ProgressBar ↴

function ProgressBar({
  children,
  className,
  size,
  ...props
}: ProgressBarProps) {
  const uniqueId = useId()

  const extendedChildrenWithInjectedProps =
    recursiveClone<ProgressBarSharedProps>(children, {
      inject: {
        size,
      },
      match: [
        ProgressBarAnatomy.label,
        ProgressBarAnatomy.valueText,
        ProgressBarAnatomy.track,
      ],
      keyPrefix: uniqueId,
    })

  return (
    <ArkProgressBar.Root
      {...props}
      className={cn(
        root({
          className,
          size,
        }),
      )}
    >
      {extendedChildrenWithInjectedProps}
    </ArkProgressBar.Root>
  )
}

// ProgressBarValueText ↴

function ProgressBarValueText({
  className,
  size,
  ...props
}: Assign<ArkProgressBarDefs.ProgressValueTextProps, ProgressBarSharedProps>) {
  const progress = useProgressContext()
  const percentage = progress.value! / 100

  return (
    <ArkProgressBar.ValueText
      {...props}
      className={cn(
        valueText({
          className,
          size,
        }),
      )}
      asChild
    >
      <NumberFlow
        value={percentage}
        format={{
          style: 'percent',
          notation: 'standard',
          maximumFractionDigits: 2,
        }}
        isolate
      />
    </ArkProgressBar.ValueText>
  )
}

ProgressBarValueText.displayName = ProgressBarAnatomy.valueText

// ProgressBarTrack ↴

function ProgressBarTrack({
  className,
  size,
  ...props
}: Assign<ArkProgressBarDefs.ProgressTrackProps, ProgressBarSharedProps>) {
  return (
    <ArkProgressBar.Track
      {...props}
      className={cn(
        track({
          size,
        }),
      )}
    >
      <ArkProgressBar.Range
        className={cn('h-full bg-brand transition-[width] ease-in-out-quad')}
      />
    </ArkProgressBar.Track>
  )
}

ProgressBarTrack.displayName = ProgressBarAnatomy.track

// ProgressBarLabel ↴

const ProgressBarLabel = ArkProgressBar.Label
ProgressBarLabel.displayName = ProgressBarAnatomy.label

export {
  ProgressBarProvider,
  ProgressBar,
  ProgressBarValueText,
  ProgressBarTrack,
  useProgress,
}
export type { ProgressBarProps }
