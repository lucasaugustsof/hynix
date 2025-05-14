import { useId } from 'react'

import type { Assign } from '@ark-ui/react'
import { Progress as ArkProgressBar, useProgress } from '@ark-ui/react/progress'

import type * as ArkProgressBarDefs from '@ark-ui/react/progress'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

import { Label, type LabelProps } from '@r/components/label'

const PROGRESS_BAR_PARTS = {
  Root: 'ProgressBar.Root',
  Label: 'ProgressBar.Label',
  ValueText: 'ProgressBar.ValueText',
  Track: 'ProgressBar.Track',
}

const progressBarVariants = tv({
  slots: {
    root: 'isolate inline-flex min-w-96 flex-col',
    valueText: 'font-medium font-sans text-fg-1 tabular-nums',
    track: 'w-full overflow-hidden rounded-xs bg-fill-2',
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

type ProgressBarSharedProps = VariantProps<typeof progressBarVariants>

type ProgressBarProps = Assign<
  ArkProgressBarDefs.ProgressRootProps,
  ProgressBarSharedProps
>

function ProgressBarRoot({
  children,
  className,
  size,
  ...props
}: ProgressBarProps) {
  const keyPrefix = useId()

  const extendedChildrenWithInjectedProps = recursiveClone(children, {
    inject: {
      size,
    },
    match: [
      PROGRESS_BAR_PARTS.ValueText,
      PROGRESS_BAR_PARTS.Track,
      PROGRESS_BAR_PARTS.Label,
    ],
    keyPrefix,
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

ProgressBarRoot.displayName = PROGRESS_BAR_PARTS.Root

function ProgressBarValueText({
  className,
  size,
  ...props
}: Assign<ArkProgressBarDefs.ProgressValueTextProps, ProgressBarSharedProps>) {
  return (
    <ArkProgressBar.ValueText
      {...props}
      className={cn(
        valueText({
          className,
          size,
        }),
      )}
    />
  )
}

ProgressBarValueText.displayName = PROGRESS_BAR_PARTS.ValueText

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
        className={cn('h-full bg-brand transition-[width] ease-linear')}
      />
    </ArkProgressBar.Track>
  )
}

ProgressBarTrack.displayName = PROGRESS_BAR_PARTS.Track

function ProgressBarLabel(props: LabelProps) {
  return (
    <ArkProgressBar.Label asChild>
      <Label {...props} />
    </ArkProgressBar.Label>
  )
}

ProgressBarLabel.displayName = PROGRESS_BAR_PARTS.Label

const ProgressBar = {
  Root: ProgressBarRoot,
  ValueText: ProgressBarValueText,
  Track: ProgressBarTrack,
  Label: ProgressBarLabel,
}

export { ProgressBar, useProgress }
export type { ProgressBarProps }
