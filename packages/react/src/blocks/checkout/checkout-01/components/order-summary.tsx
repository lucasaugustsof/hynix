import { cn } from '@r/utilities/cn'

export function OrderSummary() {
  return (
    <dl
      className={cn(
        'space-y-6 border-t pt-6 *:flex *:items-center *:justify-between',
      )}
    >
      <div className={cn('*:font-medium *:text-base *:text-fg-1/70')}>
        <dt>Subtotal</dt>
        <dd className={cn('font-semibold')}>$179.00</dd>
      </div>

      <div className={cn('*:font-medium *:text-base *:text-fg-1/70')}>
        <dt>Shipping</dt>
        <dd className={cn('font-semibold')}>$5.00</dd>
      </div>

      <div className={cn('*:font-medium *:text-base *:text-fg-1/70')}>
        <dt>Taxes</dt>
        <dd className={cn('font-semibold')}>$10.20</dd>
      </div>

      <div>
        <dt className={cn('font-semibold text-fg-1/70 text-lg/5.5')}>Total</dt>
        <dd className={cn('font-semibold text-fg-1 text-lg/5.5')}>$194.20</dd>
      </div>
    </dl>
  )
}
