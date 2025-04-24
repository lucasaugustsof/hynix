import { cn } from '@/utilities/cn'

import { SiteHeader } from '@/components/site-header'
import { Separator } from '@/components/separator'

export function Header() {
  return (
    <div className={cn('grid-layout')}>
      <div
        className={cn(
          'lg:border-r-(length:--hairline-width) lg:border-r-border',
        )}
      />

      <div>
        <SiteHeader />

        <Separator
          className={cn('border-t-(length:--hairline-width) border-b-0')}
        />
      </div>

      <div
        className={cn(
          'lg:border-l-(length:--hairline-width) lg:border-l-border',
        )}
      />
    </div>
  )
}
