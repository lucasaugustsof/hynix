import * as React from 'react'

import { type Assign, ark } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { recursiveClone } from '@r/utilities/recursive-clone'
import { type VariantProps, tv } from '@r/utilities/tv'

//---------------------------------
// Constants
//---------------------------------

const CARD_PARTS = {
  Root: 'Card.Root',
  Header: 'Card.Header',
  Title: 'Card.Title',
  Body: 'Card.Body',
  Description: 'Card.Description',
  Footer: 'Card.Footer',
}

//---------------------------------
// Variants
//---------------------------------

const cardVariantsSlots = tv({
  slots: {
    root: 'h-fit rounded-xl border bg-surface-2 shadow-black/8 shadow-xs dark:shadow-white/8',
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

type CardProps = Assign<React.ComponentPropsWithRef<'div'>, CardSharedProps>

//---------------------------------
// Root
//---------------------------------

function Root({ className, children, size, ...props }: CardProps) {
  const keyPrefix = React.useId()

  const extendedChildrenWithInjectedProps = recursiveClone(children, {
    inject: {
      size,
    },
    match: [CARD_PARTS.Title, CARD_PARTS.Description],
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

Root.displayName = CARD_PARTS.Root

//---------------------------------
// Header
//---------------------------------

function Header({
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

Header.displayName = CARD_PARTS.Header

//---------------------------------
// Body
//---------------------------------

function Body({ className, ...props }: React.ComponentPropsWithRef<'main'>) {
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

Body.displayName = CARD_PARTS.Body

//---------------------------------
// Title
//---------------------------------

function Title({
  className,
  size,
  id,
  ...props
}: Assign<React.CustomComponentPropsWithRef<typeof ark.h3>, CardSharedProps>) {
  return (
    <ark.h3
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

Title.displayName = CARD_PARTS.Title

//---------------------------------
// Description
//---------------------------------

function Description({
  className,
  size,
  id,
  ...props
}: Assign<React.CustomComponentPropsWithRef<typeof ark.p>, CardSharedProps>) {
  return (
    <ark.p
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

Description.displayName = CARD_PARTS.Description

//---------------------------------
// Footer
//---------------------------------

function Footer({
  className,
  size,
  ...props
}: Assign<React.ComponentPropsWithRef<'footer'>, CardSharedProps>) {
  return (
    <footer
      {...props}
      className={cn(
        footer({
          className,
          size,
        }),
      )}
      data-scope="card"
      data-part="footer"
    />
  )
}

Footer.displayName = CARD_PARTS.Footer

//---------------------------------
// Exports
//---------------------------------

export const Card = {
  Root,
  Header,
  Title,
  Body,
  Description,
  Footer,
}
export type { CardProps }
