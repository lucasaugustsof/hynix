/**
 * @fileoverview Button component with semantic variants and multiple styles.
 *
 * @component Button
 * @description A flexible button component built on Ark UI with Tailwind styling.
 * Supports multiple semantic variants (primary, danger, success) and visual styles
 * (filled, stroke, lighter, ghost).
 *
 * @example
 * ```tsx
 * // Primary filled button (default)
 * <Button>Click me</Button>
 *
 * // Danger stroke button
 * <Button variant="danger" style="stroke">Delete</Button>
 *
 * // Success ghost button with icon
 * <Button variant="success" style="ghost">
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
 * - `variant`: 'primary' | 'danger' | 'success' - Semantic color variants
 * - `style`: 'filled' | 'stroke' | 'lighter' | 'ghost' - Visual presentation styles
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

function createVariantStyles(color: string) {
  return {
    filled: [`bg-${color} text-fg-2`, `enabled:hover:bg-${color}/90`],
    stroke: [
      `inset-ring-1 inset-ring-${color} bg-transparent text-${color}`,
      `not-focus-visible:enabled:hover:inset-ring-transparent not-focus-visible:enabled:hover:bg-${color}/10`,
      'focus-visible:bg-transparent',
    ],
    lighter: [
      `inset-ring-1 inset-ring-transparent bg-${color}/10 text-${color}`,
      `not-focus-visible:enabled:hover:inset-ring-${color} not-focus-visible:enabled:hover:bg-transparent`,
      `focus-visible:inset-ring-${color} focus-visible:bg-transparent`,
    ],
    ghost: [
      `inset-ring-1 inset-ring-transparent bg-transparent text-${color}`,
      `not-focus-visible:enabled:hover:bg-${color}/10`,
      `focus-visible:inset-ring-${color} focus-visible:bg-transparent`,
    ],
  }
}

const variantStyles = {
  primary: createVariantStyles('brand'),
  danger: createVariantStyles('danger'),
  success: createVariantStyles('success'),
}

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
      success: '[--focus-color:var(--color-success)]',
    },
    style: {
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
      style: 'filled',
      className: variantStyles.primary.filled,
    },
    {
      variant: 'primary',
      style: 'stroke',
      className: variantStyles.primary.stroke,
    },
    {
      variant: 'primary',
      style: 'lighter',
      className: variantStyles.primary.lighter,
    },
    {
      variant: 'primary',
      style: 'ghost',
      className: variantStyles.primary.ghost,
    },
    // Danger
    {
      variant: 'danger',
      style: 'filled',
      className: variantStyles.danger.filled,
    },
    {
      variant: 'danger',
      style: 'stroke',
      className: variantStyles.danger.stroke,
    },
    {
      variant: 'danger',
      style: 'lighter',
      className: variantStyles.danger.lighter,
    },
    {
      variant: 'danger',
      style: 'ghost',
      className: variantStyles.danger.ghost,
    },
    // Success
    {
      variant: 'success',
      style: 'filled',
      className: variantStyles.success.filled,
    },
    {
      variant: 'success',
      style: 'stroke',
      className: variantStyles.success.stroke,
    },
    {
      variant: 'success',
      style: 'lighter',
      className: variantStyles.success.lighter,
    },
    {
      variant: 'success',
      style: 'ghost',
      className: variantStyles.success.ghost,
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
      data-part="root"
      data-scope="button"
    />
  )
}

Button.displayName = 'Button'

export { Button, buttonVariants }
