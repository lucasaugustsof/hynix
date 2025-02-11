// Hynix: Badge [v0.1.0]

import { forwardRef } from 'react'

import { ark } from '@ark-ui/react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cx } from '@/registry/utils/cx'

type BadgeProps = React.ComponentProps<'span'> &
  VariantProps<typeof badgeStyles> & {
    activated?: boolean
  }

const badgeStyles = cva(
  [
    // Layout and structure
    'inline-flex cursor-default select-none items-center justify-center whitespace-nowrap rounded-3xl',

    // Colors
    'bg-(--badge-bg-color) text-(--badge-text-color)',

    // Border and accent ring
    'inset-ring-(--badge-border-color) inset-ring-1',

    // Shadow and visual effects
    'shadow-xs outline-hidden transition-colors ease-in-out',

    // Typography
    'font-display font-semibold',

    // Focus (Accessibility)
    'focus-visible:inset-ring-0 focus-visible:outline-(--badge-outline-color) focus-visible:outline-3',

    // Hover states when not activated
    'data-[state=not-activated]:not-focus-visible:hover:bg-(--badge-hover-bg-color) data-[state=not-activated]:not-focus-visible:hover:text-(--badge-hover-text-color)',

    // Activation states
    'data-[state=activated]:inset-ring-(--badge-active-border-color) data-[state=activated]:bg-(--badge-active-bg-color) data-[state=activated]:text-(--badge-active-text-color)',
  ],
  {
    variants: {
      variant: {
        informative: [
          '[--badge-bg-color:var(--color-surface-2);--badge-border-color:var(--color-border);--badge-text-color:var(--color-fg-1)]',
          '[--badge-outline-color:var(--color-brand-selected);--badge-hover-bg-color:var(--color-fill-1);--badge-hover-text-color:var(--color-fg-1)]',
          '[--badge-active-border-color:var(--color-brand);--badge-active-bg-color:var(--color-brand);--badge-active-text-color:var(--color-fg-2)]',
        ],
        warning: [
          '[--badge-bg-color:var(--color-highlight);--badge-border-color:var(--color-alpha);--badge-text-color:var(--color-fg-2)]',
          '[--badge-outline-color:var(--color-highlight-selected);--badge-hover-bg-color:var(--color-highlight-hover);--badge-hover-text-color:var(--color-fg-1)]',
          '[--badge-active-border-color:var(--color-highlight);--badge-active-bg-color:var(--color-highlight);--badge-active-text-color:var(--color-fg-2)]',
        ],
        success: [
          '[--badge-bg-color:var(--color-success);--badge-border-color:var(--color-alpha);--badge-text-color:var(--color-fg-2)]',
          '[--badge-outline-color:var(--color-success-selected);--badge-hover-bg-color:var(--color-success-hover);--badge-hover-text-color:var(--color-fg-1)]',
          '[--badge-active-border-color:var(--color-success);--badge-active-bg-color:var(--color-success);--badge-active-text-color:var(--color-fg-2)]',
        ],
        danger: [
          '[--badge-bg-color:var(--color-danger);--badge-border-color:var(--color-alpha);--badge-text-color:var(--color-fg-2)]',
          '[--badge-outline-color:var(--color-danger-selected);--badge-hover-bg-color:var(--color-danger-hover);--badge-hover-text-color:var(--color-fg-1)]',
          '[--badge-active-border-color:var(--color-danger);--badge-active-bg-color:var(--color-danger);--badge-active-text-color:var(--color-fg-2)]',
        ],
      },
      size: {
        xs: 'h-6 px-2.5 font-medium text-xs leading-tight',
        sm: 'h-7 px-3 text-base',
        md: 'h-10 px-3 text-lg leading-7',
        lg: 'h-[3.25rem] px-4 text-xl leading-8',
      },
    },
    defaultVariants: {
      variant: 'informative',
      size: 'xs',
    },
  },
)

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, activated = false, ...props }, ref) => {
    return (
      <ark.span
        {...props}
        ref={ref}
        className={cx(
          badgeStyles({
            className,
            variant,
            size,
          }),
        )}
        data-state={activated ? 'activated' : 'not-activated'}
      >
        Label
      </ark.span>
    )
  },
)

export { Badge }
export type { BadgeProps }
