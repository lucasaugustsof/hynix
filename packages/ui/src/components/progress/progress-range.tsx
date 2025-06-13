import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type * as ArkProgressTypes from '@ark-ui/react/progress'

import { cn } from '@r/utilities/cn'

import { rangeStyles } from './progress.styles'
import type { ProgressSharedProps } from './progress-root'

type ProgressRangeProps = ArkProgressTypes.ProgressRangeProps &
  ProgressSharedProps

export function ProgressRange({
  className,
  size,
  ...props
}: ProgressRangeProps) {
  return (
    <ArkProgress.Range
      {...props}
      className={cn(
        rangeStyles({
          className,
          size,
        }),
      )}
    />
  )
}
