import { type Assign, ark } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const labelVariants = tv({
  base: [
    'text-nowrap font-medium font-sans text-fg-1 tracking-normal',
    'data-disabled:cursor-not-allowed data-disabled:text-disabled',
  ],
  variants: {
    size: {
      sm: 'text-sm/5.5',
      md: 'text-base',
      lg: 'text-lg/7',
      xl: 'text-xl/8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type LabelProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.span>,
  VariantProps<typeof labelVariants>
>

export function Label({ className, size, ...props }: LabelProps) {
  return (
    <ark.span
      {...props}
      className={cn(
        labelVariants({
          className,
          size,
        }),
      )}
    />
  )
}

Label.displayName = 'Label'
