'use client'

import { Accordion as ArkAccordion } from '@ark-ui/react/accordion'
import { RiArrowDownSLine } from '@remixicon/react'

import { cn } from '@r/utilities/cn'

////////////////////////////////////////////////////////////////////////////////////

type AccordionRootProps = React.ComponentProps<typeof ArkAccordion.Root>

const AccordionRoot = ({ className, ...props }: AccordionRootProps) => {
  return (
    <ArkAccordion.Root
      {...props}
      className={cn('min-w-90 space-y-3', className)}
    />
  )
}

AccordionRoot.displayName = 'Accordion'

////////////////////////////////////////////////////////////////////////////////////

const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof ArkAccordion.Item>) => {
  return (
    <ArkAccordion.Item
      {...props}
      className={cn(
        'inset-ring-1 inset-ring-border overflow-hidden rounded-xl bg-surface-2 pt-1.5 pb-1.5 shadow-black/8 shadow-xs dark:shadow-white/8',
        'has-focus-visible:inset-ring-2 has-focus-visible:inset-ring-brand',
        'data-disabled:cursor-not-allowed data-disabled:opacity-60',
        className,
      )}
    />
  )
}

AccordionItem.displayName = 'AccordionItem'

////////////////////////////////////////////////////////////////////////////////////

const AccordionTrigger = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ArkAccordion.ItemTrigger>) => {
  return (
    <ArkAccordion.ItemTrigger
      {...props}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-x-3 py-2.5 pr-3 pl-4 outline-hidden',
        'disabled:cursor-not-allowed',
        className,
      )}
    >
      <span
        className={cn(
          'line-clamp-1 text-start font-medium text-base text-fg-1',
        )}
      >
        {children}
      </span>

      <ArkAccordion.ItemIndicator
        className={cn(
          'transition-transform ease-out [&_svg]:size-6 [&_svg]:text-fill-4',
          'data-[state=open]:rotate-180',
        )}
      >
        <RiArrowDownSLine />
      </ArkAccordion.ItemIndicator>
    </ArkAccordion.ItemTrigger>
  )
}

AccordionTrigger.displayName = 'AccordionTrigger'

////////////////////////////////////////////////////////////////////////////////////

const AccordionContent = ({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ArkAccordion.ItemContent>) => {
  return (
    <ArkAccordion.ItemContent {...props}>
      <div
        className={cn(
          'pr-3 pb-2.5 pl-4',
          'font-normal text-base text-fg-1/70',
          className,
        )}
      >
        {children}
      </div>
    </ArkAccordion.ItemContent>
  )
}

AccordionContent.displayName = 'AccordionContent'

////////////////////////////////////////////////////////////////////////////////////

export {
  AccordionRoot as Root,
  AccordionItem as Item,
  AccordionTrigger as Trigger,
  AccordionContent as Content,
}

export type { AccordionRootProps as AccordionProps }
