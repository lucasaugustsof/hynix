import { Progress as ArkProgress } from '@ark-ui/react/progress'

import {
  Label,
  type LabelProps as ProgressLabelProps,
} from '@r/components/label'

import { cn } from '@r/utilities/cn'

////////////////////////////////////////////////////////////////////////////////////

type ProgressRootProps = React.ComponentProps<typeof ArkProgress.Root>

const ProgressRoot = ({ className, ...props }: ProgressRootProps) => {
  return (
    <ArkProgress.Root
      {...props}
      className={cn('inline-flex min-w-84 items-center gap-x-2', className)}
    />
  )
}

ProgressRoot.displayName = 'Progress'

////////////////////////////////////////////////////////////////////////////////////

const ProgressTrack = ({
  className,
  ...props
}: React.ComponentProps<typeof ArkProgress.Track>) => {
  return (
    <ArkProgress.Track
      {...props}
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-fill-1',
        className,
      )}
    />
  )
}

ProgressTrack.displayName = 'ProgressTrack'

////////////////////////////////////////////////////////////////////////////////////

const ProgressRange = ({
  className,
  ...props
}: React.ComponentProps<typeof ArkProgress.Range>) => {
  return (
    <ArkProgress.Range
      {...props}
      className={cn(
        'h-full bg-brand transition-[width] duration-200 ease-linear',
        className,
      )}
    />
  )
}

ProgressRange.displayName = 'ProgressRange'

////////////////////////////////////////////////////////////////////////////////////

const ProgressValueText = ({
  className,
  ...props
}: React.ComponentProps<typeof ArkProgress.ValueText>) => {
  return (
    <ArkProgress.ValueText
      {...props}
      className={cn(
        'font-medium text-fg-1 text-sm/5.5 tabular-nums',
        className,
      )}
    />
  )
}

ProgressValueText.displayName = 'ProgressValueText'

////////////////////////////////////////////////////////////////////////////////////

const ProgressLabel = (props: ProgressLabelProps) => {
  return (
    <ArkProgress.Label asChild>
      <Label {...props} />
    </ArkProgress.Label>
  )
}

ProgressLabel.displayName = 'ProgressLabel'

////////////////////////////////////////////////////////////////////////////////////

export {
  ProgressRoot as Root,
  ProgressTrack as Track,
  ProgressRange as Range,
  ProgressValueText as ValueText,
  ProgressLabel as Label,
}

export type { ProgressRootProps as ProgressProps }
