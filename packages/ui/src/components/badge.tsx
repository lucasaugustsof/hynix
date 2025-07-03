import { type Assign, ark } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const badgeStyles = tv({
  base: [
    'isolate inline-flex h-6 w-fit items-center gap-x-1 whitespace-nowrap rounded-full border px-2.5 font-medium font-sans text-xs/4.5 shadow-black/8 shadow-xs outline-hidden',
    'transition-colors ease-in-out [&_svg]:size-4',
  ],
  variants: {
    appearance: {
      default: [
        'border-border bg-surface-2 text-fg-1 [&_svg]:fill-fill-4',
        'data-[state=active]:border-brand data-[state=active]:bg-brand data-[state=active]:text-fg-2',
        'data-[state=inactive]:hover:bg-fill-1',
      ],
      warning: [
        'bg-highlight text-fg-2',
        'data-[state=inactive]:hover:bg-highlight/80',
      ],
      success: [
        'bg-success text-fg-2',
        'data-[state=inactive]:hover:bg-success/80',
      ],
      danger: [
        'bg-danger text-fg-2',
        'data-[state=inactive]:hover:bg-danger/80',
      ],
    },
  },
  compoundVariants: [
    {
      appearance: ['warning', 'success', 'danger'],
      class: 'border-black/12 dark:border-white/12',
    },
  ],
  defaultVariants: {
    appearance: 'default',
  },
})

type BadgeProps = Assign<
  React.ComponentPropsWithRef<typeof ark.div>,
  VariantProps<typeof badgeStyles>
> & {
  isActive?: boolean
}

const Badge = ({
  className,
  appearance,
  isActive = false,
  ...props
}: BadgeProps) => {
  return (
    <ark.div
      {...props}
      className={cn(
        badgeStyles({
          className,
          appearance,
        }),
      )}
      data-scope="badge"
      data-state={isActive ? 'active' : 'inactive'}
    />
  )
}

Badge.displayName = 'Badge'

export { Badge, badgeStyles, type BadgeProps }
