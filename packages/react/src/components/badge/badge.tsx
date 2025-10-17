import { useCloneChildren } from '@/hooks/use-clone-children'
import { cn } from '@/lib/cn'
import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const BADGE_ROOT_NAME = 'Badge.Root'
const BADGE_ICON_NAME = 'Badge.Icon'
const BADGE_DOT_NAME = 'Bagde.Dot'

const createBadgeRecipe = tv({
  slots: {
    root: [
      'isolate inline-flex w-fit items-center rounded-full px-2',
      'font-medium font-sans text-xs/4',
    ],
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
        root: 'h-4 gap-x-1.5 uppercase',
        icon: '-mx-1 size-3',
        dot: '-mx-2 size-4',
      },
      md: {
        root: 'h-5',
        icon: '-mx-1 size-4',
        dot: '-mx-1.5 size-4',
      },
    },
  },
  defaultVariants: {
    variant: 'light',
    size: 'sm',
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

export interface BadgeRootProps extends React.ComponentProps<'div'>, BadgeSharedProps {
  color?: BadgeColor
}

export function BadgeRoot({
  children,
  className,
  color = 'gray',
  variant,
  size,
  ...props
}: BadgeRootProps) {
  const badgeColorMap: Record<BadgeColor, string> = {
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
  }

  const { id, cloneChildren } = useCloneChildren({
    targets: [BADGE_ICON_NAME, BADGE_DOT_NAME],
    props: {
      size,
    },
    children,
    idPrefix: 'badge',
  })

  return (
    <div
      {...props}
      className={cn(
        badgeColorMap[color],
        badgeRecipe.root({
          variant,
          size,
          className,
        })
      )}
      id={id}
      data-scope="badge"
      data-part="root"
    >
      {cloneChildren()}
    </div>
  )
}

BadgeRoot.displayName = BADGE_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function BadgeIcon<T extends React.ElementType>({
  variant,
  size,
  as,
  ...props
}: PolymorphicProps<T> & BadgeSharedProps) {
  const Component = as || 'span'

  return (
    <Component
      {...props}
      className={badgeRecipe.icon({
        variant,
        size,
      })}
      data-scope="badge"
      data-part="icon"
      aria-hidden
    />
  )
}

BadgeIcon.displayName = BADGE_ICON_NAME

////////////////////////////////////////////////////////////////////////////////////

export function BadgeDot({
  className,
  size,
  ...props
}: React.ComponentProps<'span'> & BadgeSharedProps) {
  return (
    <span
      {...props}
      className={badgeRecipe.dot({
        size,
        className,
      })}
      data-scope="badge"
      data-part="dot"
    />
  )
}

BadgeDot.displayName = BADGE_DOT_NAME
