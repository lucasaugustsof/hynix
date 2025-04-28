import { type Assign, ark } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

type LabelProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.label>,
  VariantProps<typeof labelVariants>
>

const labelVariants = tv({
  base: 'text-nowrap font-medium font-sans text-fg-1 tracking-normal',
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

function Label({ className, size, ...props }: LabelProps) {
  return (
    <ark.label
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

export { Label }
export type { LabelProps }
