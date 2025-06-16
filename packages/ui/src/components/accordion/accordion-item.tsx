import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'

import { cn } from '@r/utilities/cn'

import { itemStyles } from './accordion.styles'

type AccordionItemProps = React.ComponentProps<typeof ArkAccordion.Item>

export function AccordionItem(props: AccordionItemProps) {
  return <ArkAccordion.Item {...props} className={cn(itemStyles())} />
}

AccordionItem.displayName = 'AccordionItem'
