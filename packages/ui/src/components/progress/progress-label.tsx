import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type * as ArkProgressTypes from '@ark-ui/react/progress'

import { Label } from '@r/components/label'

export function ProgressLabel({
  children,
  ...props
}: ArkProgressTypes.ProgressLabelProps) {
  return (
    <ArkProgress.Label {...props} asChild>
      <Label>{children}</Label>
    </ArkProgress.Label>
  )
}
