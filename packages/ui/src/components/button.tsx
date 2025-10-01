import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'

import { tv, type VariantProps } from '@/lib/tv'

type ButtonVariants = VariantProps<typeof buttonVariants>

type ButtonProps = Assign<
  React.ComponentProps<typeof ark.button>,
  ButtonVariants
>

const buttonVariants = tv({
  base: [
    'inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg outline-0 transition-[background-color,box-shadow]',
    'disabled:inset-ring-0 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
    'font-medium font-sans',
    'focus-visible:focus-ring',
  ],
  variants: {
    variant: {
      primary: null,
      danger: ['[--focus-color:var(--color-danger)]'],
      success: ['[--focus-color:var(--color-success)]'],
    },
    style: {
      filled: null,
      stroke: null,
      lighter: null,
      ghost: null,
    },
    size: {
      '2xs': '',
      xs: '',
      sm: '',
      md: [
        'h-10 gap-x-[calc(--spacing(1)_*_2)] rounded-[0.625rem] px-2.5',
        'text-sm/5',
        '[&>svg]:size-5',
      ],
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
  },
  compoundVariants: [
    /**
     * Variant -> Primary
     */
    {
      variant: 'primary',
      style: 'filled',
      className: ['bg-brand text-fg-2', 'enabled:hover:bg-brand/90'],
    },
    {
      variant: 'primary',
      style: 'stroke',
      className: [
        'inset-ring-1 inset-ring-brand bg-transparent text-brand',
        'not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-brand/10',
        'focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'primary',
      style: 'lighter',
      className: [
        'inset-ring-1 inset-ring-transparent bg-brand/10 text-brand',
        'not-focus-visible:enabled:hover:inset-ring-brand not-focus-visible:enabled:hover:bg-transparent',
        'focus-visible:inset-ring-brand focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'primary',
      style: 'ghost',
      className: [
        'inset-ring-1 inset-ring-transparent bg-transparent text-brand',
        'not-focus-visible:enabled:hover:bg-brand/10',
        'focus-visible:inset-ring-brand focus-visible:bg-transparent',
      ],
    },
    /**
     * Variant -> Danger
     */
    {
      variant: 'danger',
      style: 'filled',
      className: ['bg-danger text-fg-2', 'enabled:hover:bg-danger/90'],
    },
    {
      variant: 'danger',
      style: 'stroke',
      className: [
        'inset-ring-1 inset-ring-danger bg-transparent text-danger',
        'not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-danger/10',
      ],
    },
    {
      variant: 'danger',
      style: 'lighter',
      className: [
        'inset-ring-1 inset-ring-transparent bg-danger/10 text-danger',
        'not-focus-visible:enabled:hover:inset-ring-danger not-focus-visible:enabled:hover:bg-transparent',
        'focus-visible:inset-ring-danger focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'danger',
      style: 'ghost',
      className: [
        'inset-ring-1 inset-ring-transparent bg-transparent text-danger',
        'not-focus-visible:enabled:hover:bg-danger/10',
        'focus-visible:inset-ring-danger focus-visible:bg-transparent',
      ],
    },
    /**
     * Variant -> Success
     */
    {
      variant: 'success',
      style: 'filled',
      className: ['bg-success text-fg-2', 'enabled:hover:bg-success/90'],
    },
    {
      variant: 'success',
      style: 'stroke',
      className: [
        'inset-ring-1 inset-ring-success bg-transparent text-success',
        'not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-success/10',
      ],
    },
    {
      variant: 'success',
      style: 'lighter',
      className: [
        'inset-ring-1 inset-ring-transparent bg-success/10 text-success',
        'not-focus-visible:enabled:hover:inset-ring-success not-focus-visible:enabled:hover:bg-transparent',
        'focus-visible:inset-ring-success focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'success',
      style: 'ghost',
      className: [
        'inset-ring-1 inset-ring-transparent bg-transparent text-success',
        'not-focus-visible:enabled:hover:bg-success/10',
        'focus-visible:inset-ring-success focus-visible:bg-transparent',
      ],
    },
  ],
  defaultVariants: {
    variant: 'primary',
    style: 'filled',
    size: 'md',
    iconOnly: false,
  },
})

const Button = ({ variant, style, size, iconOnly, ...props }: ButtonProps) => {
  return (
    <ark.button
      {...props}
      className={buttonVariants({
        variant,
        style,
        size,
        iconOnly,
      })}
    />
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants }
