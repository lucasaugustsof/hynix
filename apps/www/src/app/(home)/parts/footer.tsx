import { cn } from '@/utilities/cn'

import { SiteFooter } from '@/components/site-footer'

export function Footer() {
  return (
    <div
      className={cn(
        'grid-layout border-t-(length:--hairline-width) border-t-border',
      )}
    >
      <div
        className={cn(
          'lg:border-r-(length:--hairline-width) lg:border-r-border',
        )}
      />

      <SiteFooter />

      <div
        className={cn(
          'lg:border-l-(length:--hairline-width) lg:border-l-border',
        )}
      />
    </div>
  )
}
