import { Field as ArkField } from '@ark-ui/react/field'
import { Fieldset as ArkFieldset } from '@ark-ui/react/fieldset'

import { cn } from '@r/utilities/cn'

import { Label, type LabelProps } from '@r/components/label'
import { Input } from '@r/components/input'
import { Checkbox } from '@r/components/checkbox'
import { Button } from '@r/components/button'

const FieldLabel = ({ className, ...props }: LabelProps) => (
  <ArkField.Label asChild>
    <Label {...props} className={cn('mb-3 block font-normal', className)} />
  </ArkField.Label>
)

export function CheckoutForm() {
  return (
    <form className={cn('space-y-8 bg-surface-2 px-16 py-8')}>
      <h2 className={cn('font-semibold text-2xl/9.5 text-fg-1')}>
        Payment info
      </h2>

      <ArkFieldset.Root className={cn('min-w-0 space-y-6')}>
        <ArkField.Root>
          <FieldLabel>Email</FieldLabel>

          <Input className="w-full" placeholder="example@email.com" />
        </ArkField.Root>

        <ArkField.Root>
          <FieldLabel>Card number</FieldLabel>

          <Input className="w-full" placeholder="1234 1234 1234 1234" />
        </ArkField.Root>

        <div className={cn('grid grid-cols-2 gap-4')}>
          <ArkField.Root>
            <FieldLabel>Expiration</FieldLabel>
            <Input className="w-full" placeholder="MM / YY" />
          </ArkField.Root>

          <ArkField.Root>
            <FieldLabel>CVC</FieldLabel>
            <Input className="w-full" placeholder="•••" />
          </ArkField.Root>
        </div>
      </ArkFieldset.Root>

      <ArkFieldset.Root className={cn('min-w-0 space-y-8')}>
        <ArkFieldset.Legend
          className={cn('font-semibold text-fg-1 text-lg/5.5')}
        >
          Shipping
        </ArkFieldset.Legend>

        <div className={cn('space-y-6')}>
          <ArkField.Root>
            <FieldLabel>Address</FieldLabel>
            <Input className="w-full" placeholder="Enter your street address" />
          </ArkField.Root>

          <ArkField.Root>
            <FieldLabel>City</FieldLabel>
            <Input className="w-full" />
          </ArkField.Root>

          <div className={cn('grid grid-cols-2 gap-4')}>
            <ArkField.Root>
              <FieldLabel>State</FieldLabel>
              <Input className="w-full" />
            </ArkField.Root>

            <ArkField.Root>
              <FieldLabel>Zip code</FieldLabel>
              <Input className="w-full" />
            </ArkField.Root>
          </div>

          <div>
            <ArkFieldset.Legend
              className={cn('mb-6 font-semibold text-fg-1 text-lg/5.5')}
            >
              Billing address
            </ArkFieldset.Legend>

            <Checkbox.Root size="sm">
              <Checkbox.Control />
              <Checkbox.Label>Same as shipping address</Checkbox.Label>
            </Checkbox.Root>
          </div>
        </div>

        <Button className="w-full">Pay now</Button>
      </ArkFieldset.Root>
    </form>
  )
}
