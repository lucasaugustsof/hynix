import { ark } from '@ark-ui/react/factory'

import { cloneChildrenWithProps } from '@/lib/clone-children-with-props'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from '@/lib/tv'

const BADGE_ROOT_NAME = 'Badge.Root'
const BADGE_ICON_NAME = 'Badge.Icon'
const BADGE_DOT_NAME = 'Badge.Dot'

const createBadgeRecipe = tv({
  slots: {
    root: ['isolate inline-flex w-fit items-center rounded-full px-2', 'font-medium font-sans'],
    icon: 'shrink-0',
    dot: [
      'relative block',
      'before:-translate-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-1 before:rounded-full before:bg-current before:content-[""]',
    ],
  },
  variants: {
    variant: {
      filled: {
        root: 'bg-(--badge-bg) text-fg-2',
      },
      light: {
        root: 'bg-[--alpha(var(--badge-bg)_/_0.3)] text-[color-mix(in_oklab,var(--badge-bg)_80%,black)] dark:text-(--badge-bg)',
      },
      lighter: {
        root: 'bg-[--alpha(var(--badge-bg)_/_0.15)] text-(--badge-bg)',
      },
      stroke: {
        root: 'inset-ring-(--badge-bg) inset-ring-1 bg-surface-1 text-(--badge-bg)',
      },
    },
    size: {
      sm: {
        root: ['h-4 gap-x-1.5 uppercase', 'text-[length:0.6875rem]/3'],
        icon: '-mx-1 size-3',
        dot: '-mx-2 size-4',
      },
      md: {
        root: ['h-5', 'text-xs/4'],
        icon: '-mx-1 size-4',
        dot: '-mx-1.5 size-4',
      },
    },
    disabled: {
      true: {
        root: [
          'inset-ring-1 inset-ring-border cursor-not-allowed select-none bg-fill-1',
          'text-disabled',
        ],
      },
    },
    numberOnly: {
      true: {
        root: ['aspect-square justify-center p-0.5', 'tabular-nums leading-0'],
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'sm',
    disabled: false,
  },
})

const badgeRecipe = createBadgeRecipe()

type BadgeColor =
  | 'gray'
  | 'blue'
  | 'orange'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'sky'
  | 'pink'
  | 'teal'

type BadgeSharedProps = VariantProps<typeof createBadgeRecipe>

/**
 * Badge root component that wraps the entire badge composition.
 * Automatically injects variant, size, and disabled props to child components.
 * Supports color variants, number-only mode, and icon/dot indicators.
 * When children is a number, automatically enables number-only mode for optimal styling.
 *
 * @example
 * ```tsx
 * <Badge.Root color="blue" variant="filled" size="sm">New</Badge.Root>
 * <Badge.Root color="red" numberOnly>{5}</Badge.Root>
 * <Badge.Root color="green">
 *   <Badge.Dot />
 *   Active
 * </Badge.Root>
 * ```
 */
export interface BadgeRootProps extends React.ComponentProps<'div'>, BadgeSharedProps {
  /**
   * Color theme for the badge
   * @default "gray"
   */
  color?: BadgeColor
}

export function BadgeRoot({
  children,
  className,
  color = 'gray',
  variant,
  size,
  disabled,
  numberOnly,
  ...props
}: BadgeRootProps) {
  const BADGE_COLOR_MAP = {
    gray: '[--badge-bg:var(--color-gray-500)]',
    blue: '[--badge-bg:var(--information)]',
    orange: '[--badge-bg:var(--warning)]',
    red: '[--badge-bg:var(--danger)]',
    green: '[--badge-bg:var(--success)]',
    yellow: '[--badge-bg:var(--color-yellow-500)]',
    purple: '[--badge-bg:var(--color-purple-500)]',
    sky: '[--badge-bg:var(--color-sky-500)]',
    pink: '[--badge-bg:var(--color-pink-500)]',
    teal: '[--badge-bg:var(--color-teal-500)]',
  } as const

  const isNumberOnly = typeof children === 'number'

  const clonedChildren = cloneChildrenWithProps(children, {
    keyPrefix: 'Badge',
    props: {
      size,
    },
    targetDisplayNames: [BADGE_ICON_NAME, BADGE_DOT_NAME],
  })

  return (
    <div
      role="status"
      className={cn(
        BADGE_COLOR_MAP[color],
        badgeRecipe.root({
          variant,
          size,
          disabled,
          numberOnly: numberOnly ?? isNumberOnly,
          className,
        })
      )}
      data-scope="badge"
      data-part="root"
      aria-disabled={disabled}
      {...props}
    >
      {clonedChildren}
    </div>
  )
}

BadgeRoot.displayName = BADGE_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Badge icon component for displaying icons within badges.
 * Supports polymorphic rendering via the `asChild` prop.
 * Automatically scales based on the badge size.
 *
 * @example
 * ```tsx
 * <Badge.Root>
 *   <Badge.Icon asChild>
 *    <StarIcon />
 *   </Badge.Icon>
 *   Featured
 * </Badge.Root>
 * ```
 */

export interface BadgeIconProps extends React.ComponentProps<typeof ark.div>, BadgeSharedProps {}

export function BadgeIcon({ variant, size, ...props }: BadgeIconProps) {
  return (
    <ark.div
      className={badgeRecipe.icon({
        variant,
        size,
      })}
      data-scope="badge"
      data-part="icon"
      aria-hidden
      {...props}
    />
  )
}

BadgeIcon.displayName = BADGE_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Badge dot component that displays a status indicator dot.
 * Shows a small circular dot using the badge's current color.
 * Commonly used to indicate status or presence (e.g., active, online).
 *
 * @example
 * ```tsx
 * <Badge.Root color="green">
 *   <Badge.Dot />
 *   Active
 * </Badge.Root>
 * <Badge.Root color="red">
 *   <Badge.Dot />
 *   Offline
 * </Badge.Root>
 * ```
 */

export interface BadgeDotProps extends React.ComponentProps<'span'>, BadgeSharedProps {}

export function BadgeDot({ className, size, ...props }: BadgeDotProps) {
  return (
    <span
      className={badgeRecipe.dot({
        size,
        className,
      })}
      data-scope="badge"
      data-part="dot"
      aria-hidden
      {...props}
    />
  )
}

BadgeDot.displayName = BADGE_DOT_NAME
