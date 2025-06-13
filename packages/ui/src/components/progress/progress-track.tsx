import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type * as ArkProgressTypes from '@ark-ui/react/progress'

import { cn } from '@r/utilities/cn'

import { trackStyles } from './progress.styles'
import type { ProgressSharedProps } from './progress-root'

type ProgressTrackProps = ArkProgressTypes.ProgressTrackProps &
  ProgressSharedProps

export function ProgressTrack({
  className,
  size,
  ...props
}: ProgressTrackProps) {
  return (
    <ArkProgress.Track
      {...props}
      className={cn(
        trackStyles({
          className,
          size,
        }),
      )}
    />
  )
}
