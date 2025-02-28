// Hynix: Badge [v1.0.0]

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/registry/utils/cn'

export type BadgeProps = React.ComponentPropsWithRef<'span'> &
  VariantProps<typeof badgeStyles> & {
    activated?: boolean
  }

const badgeStyles = cva(
  [
    'inset-ring-1 inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap rounded-3xl font-semibold shadow-xs transition-colors ease-out',
    'focus-visible:inset-ring-0 focus-visible:bg-fill-1 focus-visible:text-fg-1 focus-visible:outline-2 focus-visible:outline-brand-selected/70 focus-visible:outline-offset-2',
  ],
  {
    variants: {
      variant: {
        informative: [
          'inset-ring-border bg-surface-2 text-fg-1',
          'data-[activated=false]:not-focus-visible:hover:bg-fill-1',
          'data-[activated=true]:inset-ring-0 data-[activated=true]:bg-brand data-[activated=true]:text-fg-2',
        ],
        warning: [
          'inset-ring-black/12 bg-highlight text-fg-2 dark:inset-ring-white/12',
          'focus-visible:outline-highlight-selected',
          'data-[activated=false]:not-focus-visible:hover:bg-highlight-hover data-[activated=false]:not-focus-visible:hover:text-fg-1',
          'data-[activated=true]:inset-ring-0 data-[activated=true]:bg-highlight data-[activated=true]:text-fg-2',
        ],
        success: [
          'inset-ring-black/12 bg-success text-fg-2 dark:inset-ring-white/12',
          'focus-visible:outline-success-selected',
          'data-[activated=false]:not-focus-visible:hover:bg-success-hover data-[activated=false]:not-focus-visible:hover:text-fg-1',
          'data-[activated=true]:inset-ring-0 data-[activated=true]:bg-success data-[activated=true]:text-fg-2',
        ],
        danger: [
          'inset-ring-black/12 bg-danger text-fg-2 dark:inset-ring-white/12',
          'focus-visible:outline-danger-selected',
          'data-[activated=false]:not-focus-visible:hover:bg-danger-hover data-[activated=false]:not-focus-visible:hover:text-fg-1',
          'data-[activated=true]:inset-ring-0 data-[activated=true]:bg-danger data-[activated=true]:text-fg-2',
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

export function Badge({
  ref,
  className,
  variant,
  size,
  activated,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      ref={ref}
      className={cn(
        badgeStyles({
          className,
          variant,
          size,
        }),
      )}
      data-activated={activated}
    />
  )
}
