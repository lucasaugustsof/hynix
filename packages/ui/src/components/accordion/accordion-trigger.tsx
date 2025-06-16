import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { RiArrowDownSLine } from '@remixicon/react'

import { cn } from '@r/utilities/cn'

import { triggerStyles } from './accordion.styles'

import type { AccordionSharedProps } from './accordion-root'

type AccordionTriggerProps = React.ComponentProps<
  typeof ArkAccordion.ItemTrigger
> &
  AccordionSharedProps

export function AccordionTrigger({
  children,
  size,
  ...props
}: AccordionTriggerProps) {
  return (
    <ArkAccordion.ItemTrigger
      {...props}
      className={cn(
        triggerStyles({
          size,
        }),
      )}
    >
      <span className={cn('line-clamp-1 whitespace-nowrap')}>{children}</span>

      <ArkAccordion.ItemIndicator
        className={cn(
          'transition-transform ease-out',
          'group-data-[state=open]:rotate-180',
        )}
      >
        <RiArrowDownSLine className={cn('fill-fill-4')} />
      </ArkAccordion.ItemIndicator>
    </ArkAccordion.ItemTrigger>
  )
}

AccordionTrigger.displayName = 'AccordionTrigger'
