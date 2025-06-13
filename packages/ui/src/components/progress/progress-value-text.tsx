import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type * as ArkProgressTypes from '@ark-ui/react/progress'

import { cn } from '@r/utilities/cn'

import { valueTextStyles } from './progress.styles'
import type { ProgressSharedProps } from './progress-root'

type ProgressValueTextProps = ArkProgressTypes.ProgressValueTextProps &
  ProgressSharedProps

export function ProgressValueText({
  className,
  size,
  ...props
}: ProgressValueTextProps) {
  return (
    <ArkProgress.ValueText
      {...props}
      className={cn(
        valueTextStyles({
          className,
          size,
        }),
      )}
    />
  )
}
