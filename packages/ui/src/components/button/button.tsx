/**
 * @fileoverview Button component with semantic variants and multiple styles.
 *
 * @component Button
 * @description A flexible button component built on Ark UI with Tailwind styling.
 * Supports multiple semantic variants (primary, danger) and visual styles
 * (filled, stroke, lighter, ghost).
 *
 * @example
 * ```tsx
 * // Primary filled button (default)
 * <Button>Click me</Button>
 *
 * // Danger stroke button
 * <Button variant="danger" mode="stroke">Delete</Button>
 *
 * // Success ghost button with icon
 * <Button variant="success" mode="ghost">
 *   <CheckIcon />
 *   Confirm
 * </Button>
 *
 * // Icon-only button
 * <Button iconOnly>
 *   <SearchIcon />
 * </Button>
 * ```
 *
 * @variants
 * - `variant`: 'primary' | 'danger' - Semantic color variants
 * - `mode`: 'filled' | 'stroke' | 'lighter' | 'ghost' - Visual presentation styles
 * - `size`: '2xs' | 'xs' | 'sm' | 'md' - Button sizes
 * - `iconOnly`: boolean - Square aspect ratio for icon-only buttons
 *
 */

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
    'font-medium font-sans text-sm/5 [&>svg]:size-5',
    'focus-visible:focus-ring',
  ],
  variants: {
    variant: {
      primary: null,
      danger: '[--focus-color:var(--color-danger)]',
    },
    mode: {
      filled: null,
      stroke: null,
      lighter: null,
      ghost: null,
    },
    size: {
      '2xs': 'h-7 gap-x-[calc(--spacing(1)_+_--spacing(0.5))] px-1.5',
      xs: 'h-8 gap-x-[calc(--spacing(1)_+_--spacing(0.5))] px-1.5',
      sm: 'h-9 gap-x-[calc(--spacing(1)_*_2)] px-2',
      md: 'h-10 gap-x-[calc(--spacing(1)_*_2)] rounded-[0.625rem] px-2.5',
    },
    iconOnly: {
      true: 'aspect-square px-0',
    },
  },
  compoundVariants: [
    // Primary
    {
      variant: 'primary',
      mode: 'filled',
      className: [`bg-brand text-fg-2`, `enabled:hover:bg-brand/90`],
    },
    {
      variant: 'primary',
      mode: 'stroke',
      className: [
        `inset-ring-1 inset-ring-brand bg-transparent text-brand`,
        `not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-brand/10`,
        'focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'primary',
      mode: 'lighter',
      className: [
        `inset-ring-1 inset-ring-transparent bg-brand/10 text-brand`,
        `not-focus-visible:enabled:hover:inset-ring-brand not-focus-visible:enabled:hover:bg-transparent`,
        `focus-visible:inset-ring-brand focus-visible:bg-transparent`,
      ],
    },
    {
      variant: 'primary',
      mode: 'ghost',
      className: [
        `inset-ring-1 inset-ring-transparent bg-transparent text-brand`,
        `not-focus-visible:enabled:hover:bg-brand/10`,
        `focus-visible:inset-ring-brand focus-visible:bg-transparent`,
      ],
    },
    // Danger
    {
      variant: 'danger',
      mode: 'filled',
      className: [`bg-danger text-fg-2`, `enabled:hover:bg-danger/90`],
    },
    {
      variant: 'danger',
      mode: 'stroke',
      className: [
        `inset-ring-1 inset-ring-danger bg-transparent text-danger`,
        `not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-danger/10`,
        'focus-visible:bg-transparent',
      ],
    },
    {
      variant: 'danger',
      mode: 'lighter',
      className: [
        `inset-ring-1 inset-ring-transparent bg-danger/10 text-danger`,
        `not-focus-visible:enabled:hover:inset-ring-danger not-focus-visible:enabled:hover:bg-transparent`,
        `focus-visible:inset-ring-danger focus-visible:bg-transparent`,
      ],
    },
    {
      variant: 'danger',
      mode: 'ghost',
      className: [
        `inset-ring-1 inset-ring-transparent bg-transparent text-danger`,
        `not-focus-visible:enabled:hover:bg-danger/10`,
        `focus-visible:inset-ring-danger focus-visible:bg-transparent`,
      ],
    },
  ],
  defaultVariants: {
    variant: 'primary',
    mode: 'filled',
    size: 'md',
    iconOnly: false,
  },
})

const Button = ({ variant, mode, size, iconOnly, ...props }: ButtonProps) => {
  return (
    <ark.button
      {...props}
      className={buttonVariants({
        variant,
        mode,
        size,
        iconOnly,
      })}
      data-scope="button"
    />
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
