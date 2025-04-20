import { cn } from '@/utilities/cn'

import { SiteHeader } from '@/components/site-header'
import { Separator } from '@/components/separator'

export function GridHeader() {
  return (
    <div className={cn('grid grid-cols-[1fr_var(--layout-content-max)_1fr]')}>
      <div
        className={cn('border-r-(length:--hairline-width) border-r-border')}
      />

      <div>
        <SiteHeader />
        <Separator
          className={cn('border-t-(length:--hairline-width) h-20 border-b-0')}
        />
      </div>

      <div
        className={cn('border-l-(length:--hairline-width) border-l-border')}
      />
    </div>
  )
}
