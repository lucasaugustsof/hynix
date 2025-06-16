import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import type { Assign } from '@ark-ui/react'

import { useEnhancedChildren } from '@r/hooks/use-enhanced-children'

import { cn } from '@r/utilities/cn'
import type { VariantProps } from '@r/utilities/tv'

import { rootStyles } from './accordion.styles'

export type AccordionSharedProps = Omit<
  VariantProps<typeof rootStyles>,
  'appearance'
>

export type AccordionRootProps = Assign<
  Omit<React.ComponentProps<typeof ArkAccordion.Root>, 'asChild'>,
  AccordionSharedProps
>

const accordionTargets = ['AccordionTrigger']

export function AccordionRoot({
  children,
  size,
  ...props
}: AccordionRootProps) {
  const enhancedChildren = useEnhancedChildren(children, {
    targets: accordionTargets,
    props: {
      size,
    },
    asChild: false,
  })

  return (
    <ArkAccordion.Root
      {...props}
      className={cn(
        rootStyles({
          size,
        }),
      )}
    >
      {enhancedChildren}
    </ArkAccordion.Root>
  )
}
