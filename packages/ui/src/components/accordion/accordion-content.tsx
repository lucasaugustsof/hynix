import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'

import { cn } from '@r/utilities/cn'

import { contentStyles } from './accordion.styles'

type AccordionContentProps = React.ComponentProps<
  typeof ArkAccordion.ItemContent
>

export function AccordionContent({
  children,
  ...props
}: AccordionContentProps) {
  return (
    <ArkAccordion.ItemContent {...props} className={cn(contentStyles())}>
      <div className={cn('px-4 pb-4')}>{children}</div>
    </ArkAccordion.ItemContent>
  )
}

AccordionContent.displayName = 'AccordionContent'
