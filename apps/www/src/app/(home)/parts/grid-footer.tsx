import { cn } from '@/utilities/cn'

import { SiteFooter } from '@/components/site-footer'

export function GridFooter() {
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_var(--layout-content-max)_1fr]',
        'border-t-(length:--hairline-width) border-t-border',
      )}
    >
      <div
        className={cn('border-r-(length:--hairline-width) border-r-border')}
      />

      <SiteFooter />

      <div
        className={cn('border-l-(length:--hairline-width) border-l-border')}
      />
    </div>
  )
}
