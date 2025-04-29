import * as React from 'react'

import type { Assign } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

//---------------------------------
// Variants
//---------------------------------

const cardVariantsSlots = tv({
  slots: {
    root: 'inset-ring-1 inset-ring-surface-1 h-fit rounded-xl border bg-surface-2',
    header: 'flex flex-col gap-2.5',
    title: 'mb-2 line-clamp-2 text-pretty font-bold font-sans text-fg-1',
    description: 'text-pretty font-normal font-sans text-fg-1',
    footer: 'flex items-center justify-end gap-3',
    body: null,
  },
  variants: {
    size: {
      sm: {
        root: 'max-w-[35rem] space-y-4 p-4',
        title: 'text-lg/7',
      },
      md: {
        root: 'max-w-[45rem] space-y-6 p-6',
      },
      lg: {
        root: 'max-w-[60rem] space-y-8 p-8',
        description: 'text-lg/7',
        header: 'gap-3',
      },
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: {
        description: 'text-base',
      },
    },
    {
      size: ['md', 'lg'],
      class: {
        title: 'text-xl/8',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
})

const { root, header, body, title, description, footer } = cardVariantsSlots()

//---------------------------------
// Types
//---------------------------------

type CardSharedProps = VariantProps<typeof cardVariantsSlots>
type CardSlots = `Card${Capitalize<keyof (typeof cardVariantsSlots)['slots']>}`

type CardProps = Assign<React.ComponentPropsWithRef<'div'>, CardSharedProps>

//---------------------------------
// Card
//---------------------------------

function Card({ className, children, size, ...props }: CardProps) {
  const keyPrefix = React.useId()

  const extendedChildrenWithInjectedProps = recursiveClone(children, {
    inject: {
      size,
    },
    match: ['CardTitle', 'CardDescription'] as CardSlots[],
    keyPrefix,
  })

  return (
    <div
      {...props}
      className={cn(
        root({
          className,
          size,
        }),
      )}
      data-scope="card"
      data-part="root"
    >
      {extendedChildrenWithInjectedProps}
    </div>
  )
}

Card.displayName = 'Card'

//---------------------------------
// CardHeader
//---------------------------------

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithRef<'header'>) {
  return (
    <header
      {...props}
      className={cn(
        header({
          className,
        }),
      )}
      data-scope="card"
      data-part="header"
    />
  )
}

CardHeader.displayName = 'CardHeader'

//---------------------------------
// CardBody
//---------------------------------

function CardBody({
  className,
  ...props
}: React.ComponentPropsWithRef<'main'>) {
  return (
    <main
      {...props}
      className={cn(
        body({
          className,
        }),
      )}
      data-scope="card"
      data-part="body"
    />
  )
}

CardBody.displayName = 'CardBody'

//---------------------------------
// CardTitle
//---------------------------------

function CardTitle({
  className,
  size,
  id,
  ...props
}: Assign<React.ComponentPropsWithRef<'h3'>, CardSharedProps>) {
  return (
    <h3
      {...props}
      className={cn(
        title({
          className,
          size,
        }),
      )}
      data-scope="card"
      data-part="title"
    />
  )
}

CardTitle.displayName = 'CardTitle'

//---------------------------------
// CardDescription
//---------------------------------

function CardDescription({
  className,
  size,
  id,
  ...props
}: Assign<React.ComponentPropsWithRef<'p'>, CardSharedProps>) {
  return (
    <p
      {...props}
      className={cn(
        description({
          className,
          size,
        }),
      )}
      data-scope="card"
      data-part="description"
    />
  )
}

CardDescription.displayName = 'CardDescription'

//---------------------------------
// CardFooter
//---------------------------------

function CardFooter({
  className,
  size,
  ...props
}: Assign<React.ComponentPropsWithRef<'footer'>, CardSharedProps>) {
  return (
    <footer
      {...props}
      className={footer({
        className,
        size,
      })}
      data-scope="card"
      data-part="footer"
    />
  )
}

CardFooter.displayName = 'CardFooter'

//---------------------------------
// Exports
//---------------------------------

export { Card, CardHeader, CardBody, CardTitle, CardDescription, CardFooter }
export type { CardProps }
