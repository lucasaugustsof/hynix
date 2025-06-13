import { type Assign, ark } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

export const buttonStyles = tv({
  base: [
    'isolate inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-xl font-sans font-semibold tracking-normal',
    'not-disabled:inset-ring-1 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
    'transition-colors ease-out',
  ],
  variants: {
    appearance: {
      primary: ['bg-brand text-fg-2', 'not-disabled:hover:bg-brand/90'],
      secondary: [
        'inset-ring-border bg-surface-2 text-fg-1',
        'not-disabled:hover:bg-fill-2 [&_svg]:fill-fill-5',
      ],
      ghost: [
        'bg-transparent text-brand transition-[color_box-shadow]',
        'not-disabled:hover:inset-ring-2 not-disabled:hover:text-brand/90',
      ],
      destructive: [
        'inset-ring-transparent bg-danger text-fg-2',
        'not-disabled:hover:bg-danger/90',
      ],
    },
    size: {
      sm: 'h-9 gap-1 px-3 text-sm/5.5 [&_svg]:size-5',
      md: 'h-11 gap-2 px-4 text-base [&_svg]:size-6',
      lg: 'h-11 px-4 text-lg/7 [&_svg]:size-7',
      xl: 'h-14 px-6 text-xl/8 [&_svg]:size-8',
    },
    isIconOnly: {
      true: 'aspect-square px-0',
    },
  },
  compoundVariants: [
    {
      appearance: ['primary', 'ghost'],
      className: 'inset-ring-brand',
    },
    {
      size: ['lg', 'xl'],
      className: 'gap-3',
    },
  ],
  defaultVariants: {
    appearance: 'primary',
    size: 'md',
    isIconOnly: false,
  },
})

export type ButtonProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.button>,
  VariantProps<typeof buttonStyles>
>

export function Button({
  className,
  appearance,
  size,
  isIconOnly,
  ...props
}: ButtonProps) {
  return (
    <ark.button
      {...props}
      className={cn(
        buttonStyles({
          className,
          appearance,
          size,
          isIconOnly,
        }),
      )}
      data-scope="button"
    />
  )
}

Button.displayName = 'Button'
