import { ark } from '@ark-ui/react/factory'

import { tv, type VariantProps } from '@/lib/tv'

const buttonVariants = tv({
  base: [
    'inset-ring-1 isolate inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-lg px-1.5 transition-[background-color,box-shadow]',
    'font-medium text-sm/5 tracking-[-0.00525rem] [&_svg]:size-5 [&_svg]:shrink-0',
    'focus-visible:focus-outline',
    'disabled:inset-ring-0 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
  ],
  variants: {
    variant: {
      primary: ['inset-ring-brand bg-brand enabled:hover:bg-brand/90', 'text-fg-2'],
      secondary: ['inset-ring-border bg-surface-2 enabled:hover:bg-fill-2', 'text-fg-1'],
      outline: ['inset-ring-brand bg-transparent enabled:hover:bg-brand/10', 'text-brand'],
      danger: [
        'inset-ring-danger bg-danger [--focus-outline-color:var(--danger)] enabled:hover:bg-danger/90',
        'text-fg-2',
      ],
    },
    size: {
      '2xs': 'h-7',
      xs: 'h-8',
      sm: 'h-9 px-2',
      md: 'h-10 rounded-[calc(var(--radius-lg)_+_2px)] px-2.5',
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
  },
})

interface ButtonProps
  extends React.ComponentProps<typeof ark.button>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, iconOnly, ...props }: ButtonProps) {
  return (
    <ark.button
      {...props}
      className={buttonVariants({
        variant,
        size,
        iconOnly,
        className,
      })}
      data-scope="button"
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
