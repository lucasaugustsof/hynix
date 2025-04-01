import React from 'react'

import { type Assign, ark } from '@ark-ui/react'

import { motion } from 'motion/react'

import { RiCloseLine } from '@remixicon/react'

import { cn } from 'registry/utilities/cn'
import { type VariantProps, tv } from 'registry/utilities/tv'
import { focusEffect } from 'registry/utilities/focus-effect'

type ChipProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.div>,
  VariantProps<typeof chipVariants>
> & {
  children: React.ReactNode
  activated?: boolean
}

const chipVariants = tv({
  base: [
    'group inline-flex items-center rounded-full border border-border bg-surface-2 shadow-xs transition-colors ease-out',
    'data-[activated=true]:border-brand data-[activated=true]:bg-brand data-[activated=false]:hover:bg-fill-1',
    focusEffect,
  ],
  variants: {
    size: {
      xs: [
        'h-7',
        'data-[dir=ltr]:ps-2.5 data-[dir=ltr]:pe-2',
        'data-[dir=rtl]:ps-2 data-[dir=rtl]:pe-2.5',
        '*:data-[part=label]:text-xs *:data-[part=label]:leading-4.5 *:data-[part=close]:[&_svg]:size-4',
      ],
      sm: [
        'h-8',
        'data-[dir=ltr]:px-3',
        'data-[dir=rtl]:ps-2.5 data-[dir=rtl]:pe-3',
        '*:data-[part=label]:text-sm *:data-[part=label]:leading-5.5 *:data-[part=close]:[&_svg]:size-5',
      ],
      md: [
        'h-11',
        'data-[dir=ltr]:ps-4 data-[dir=ltr]:pe-2.5',
        'data-[dir=rtl]:ps-2.5 data-[dir=rtl]:pe-4',
        '*:data-[part=label]:text-base *:data-[part=close]:[&_svg]:size-6',
      ],
      lg: [
        'h-12',
        'data-[dir=ltr]:ps-4 data-[dir=ltr]:pe-3',
        'data-[dir=rtl]:ps-3 data-[dir=rtl]:pe-4',
        '*:data-[part=label]:text-lg *:data-[part=label]:leading-7 *:data-[part=close]:[&_svg]:size-7',
      ],
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm'],
      class: 'gap-1',
    },
    {
      size: ['md', 'lg'],
      class: 'gap-2',
    },
  ],
  defaultVariants: {
    size: 'sm',
  },
})

// Chip ↴

function Chip({ className, size, activated = false, ...props }: ChipProps) {
  const childElements = React.Children.toArray(props.children).filter(
    (child): child is React.ReactElement => React.isValidElement(child),
  )
  const isLabelFirstChild = childElements[0].type === ChipLabel

  return (
    <ark.div
      {...props}
      className={cn(
        chipVariants({
          className,
          size,
        }),
      )}
      data-scope="chip"
      data-part="root"
      data-activated={activated}
      data-dir={isLabelFirstChild ? 'ltr' : 'rtl'}
      tabIndex={0}
    />
  )
}

// ChipLabel ↴

type ChipLabelProps = React.ComponentPropsWithRef<'span'>

function ChipLabel({ className, ...props }: ChipLabelProps) {
  return (
    <span
      {...props}
      className={cn(
        'select-none whitespace-nowrap font-medium font-sans text-fg-1 tracking-normal',
        'group-data-[activated=true]:text-fg-2',
        className,
      )}
      data-scope="chip"
      data-part="label"
    />
  )
}

// ChipClose ↴

type ChipCloseProps = React.CustomComponentPropsWithRef<typeof motion.button>

function ChipClose({ ...props }: ChipCloseProps) {
  return (
    <motion.button
      {...props}
      type="button"
      className={cn('size-fit cursor-pointer appearance-none outline-none')}
      data-scope="chip"
      data-part="close"
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        bounce: 0.1,
        duration: 0.4,
      }}
      aria-label={props['aria-label'] ?? 'close-chip'}
    >
      <RiCloseLine
        className={cn(
          'fill-fill-4 transition-colors ease-out',
          'group-data-[activated=true]:fill-fg-2 group-data-[activated=false]:group-hover:fill-fill-5',
        )}
        focusable="false"
        aria-hidden
      />
    </motion.button>
  )
}

export { Chip, ChipLabel, ChipClose }
export type { ChipProps }
