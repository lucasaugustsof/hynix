import { ark } from '@ark-ui/react/factory'

import { RiCloseLine } from '@remixicon/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

import { useInjectPropsToChildren } from '@r/hooks/use-inject-props-to-children'

////////////////////////////////////////////////////////////////////////////////////

const chipStyles = tv({
  slots: {
    root: [
      'group inset-ring-1 inset-ring-border inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-surface-2 shadow-black/8 shadow-xs dark:shadow-white/8',
      'transition-colors ease-out',
    ],
    text: ['font-medium text-fg-1'],
    deleteTrigger: ['shrink-0 cursor-pointer'],
  },
  variants: {
    size: {
      xs: {
        root: 'min-h-7 gap-x-1 px-2',
        text: ['text-xs/4.5', 'first:ml-0.5 last:mr-0.5'],
        deleteTrigger: '[&_svg]:size-4',
      },
      sm: {
        root: 'min-h-8 gap-x-1.5 px-3',
        text: 'text-sm/5.5',
        deleteTrigger: '[&_svg]:size-5',
      },
      md: {
        root: 'min-h-11 gap-x-2 px-2.5',
        text: ['text-base', 'first:ml-1.5 last:mr-1.5'],
        deleteTrigger: '[&_svg]:size-6',
      },
      lg: {
        root: 'min-h-12 gap-x-2 px-3',
        text: ['text-lg/7', 'first:ml-1 last:mr-1'],
        deleteTrigger: '[&_svg]:size-7',
      },
    },
    isActive: {
      true: {
        root: 'inset-ring-transparent bg-brand',
        text: 'text-fg-2',
        deleteTrigger: '[&_svg]:fill-fg-2',
      },
      false: {
        root: 'hover:bg-fill-1',
        deleteTrigger: 'group-hover:[&_svg]:fill-fill-5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const {
  root: rootStyles,
  text: textStyles,
  deleteTrigger: deleteTriggerStyles,
} = chipStyles()

type ChipSharedProps = VariantProps<typeof chipStyles>

////////////////////////////////////////////////////////////////////////////////////

interface ChipRootProps
  extends React.ComponentProps<typeof ark.div>,
    ChipSharedProps {}

const ChipRoot = ({
  children,
  className,
  size,
  isActive,
  asChild,
  ...props
}: ChipRootProps) => {
  const extendChildren = useInjectPropsToChildren(children, {
    props: {
      size,
      isActive,
    },
    targets: ['ChipText', 'ChipDeleteTrigger'],
    asChild,
  })

  return (
    <ark.div
      {...props}
      className={cn(
        rootStyles({
          className,
          size,
          isActive,
        }),
      )}
      asChild={asChild}
      data-scope="chip"
      data-part="root"
    >
      {extendChildren}
    </ark.div>
  )
}

ChipRoot.displayName = 'Chip'

////////////////////////////////////////////////////////////////////////////////////

const ChipText = ({
  className,
  size,
  isActive,
  ...props
}: React.ComponentProps<typeof ark.span> & ChipSharedProps) => {
  return (
    <ark.span
      {...props}
      className={cn(
        textStyles({
          className,
          size,
          isActive,
        }),
      )}
      data-scope="chip"
      data-part="text"
    />
  )
}

ChipText.displayName = 'ChipText'

////////////////////////////////////////////////////////////////////////////////////

const ChipDeleteTrigger = ({
  className,
  size,
  isActive,
  ...props
}: React.ComponentProps<typeof ark.button> & ChipSharedProps) => {
  return (
    <ark.button
      {...props}
      className={cn(
        deleteTriggerStyles({
          className,
          size,
          isActive,
        }),
      )}
      data-scope="chip"
      data-part="delete-trigger"
    >
      <RiCloseLine className={cn('fill-fill-4 transition-colors ease-out')} />
    </ark.button>
  )
}

ChipDeleteTrigger.displayName = 'ChipDeleteTrigger'

////////////////////////////////////////////////////////////////////////////////////

export {
  ChipRoot as Root,
  ChipText as Text,
  ChipDeleteTrigger as DeleteTrigger,
}
export type { ChipRootProps as ChipProps }
