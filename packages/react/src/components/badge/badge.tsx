import type { RemixiconComponentType } from '@remixicon/react'
import { cn } from '@/utils/cn'
import type { PolymorphicProps } from '@/utils/polymorphic'
import { renderChildren } from '@/utils/render-children'
import { tv, type VariantProps } from '@/utils/tv'

const BADGE_ROOT_NAME = 'Badge.Root'
const BADGE_ICON_NAME = 'Badge.Icon'
const BADGE_DOT_NAME = 'Badge.Dot'

const badgeVariants = tv({
  slots: {
    root: ['isolate inline-flex w-fit items-center rounded-full px-2'],
    icon: 'shrink-0',
    dot: [
      'relative block',
      'before:-translate-1/2 before:absolute before:top-1/2 before:left-1/2 before:size-1 before:rounded-full before:bg-current before:content-[""]',
    ],
  },
  variants: {
    variant: {
      filled: {
        root: 'bg-(--badge-background-color) text-fg-2',
      },
      light: {
        root: 'bg-[--alpha(var(--badge-background-color)/0.2)] text-(--badge-background-color)',
      },
      lighter: {
        root: 'bg-[--alpha(var(--badge-background-color)/0.1)] text-(--badge-background-color)',
      },
      stroke: {
        root: 'inset-ring-(--badge-background-color) inset-ring-1 bg-surface-1 text-(--badge-background-color)',
      },
    },
    size: {
      sm: {
        root: ['h-4 gap-x-1.5 uppercase', 'text-subheading-2xs'],
        icon: '-mx-1 size-3',
        dot: '-mx-2 size-4',
      },
      md: {
        root: ['h-5', 'text-label-xs'],
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

const { root: rootClasses, icon: iconClasses, dot: dotClasses } = badgeVariants()

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

type BadgeSharedProps = VariantProps<typeof badgeVariants>

interface BadgeRootProps extends React.ComponentProps<'div'>, BadgeSharedProps {
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
    gray: '[--badge-background-color:var(--color-gray-500)]',
    blue: '[--badge-background-color:var(--information)]',
    orange: '[--badge-background-color:var(--warning)]',
    red: '[--badge-background-color:var(--danger)]',
    green: '[--badge-background-color:var(--success)]',
    yellow: '[--badge-background-color:var(--color-yellow-500)]',
    purple: '[--badge-background-color:var(--color-purple-500)]',
    sky: '[--badge-background-color:var(--color-sky-500)]',
    pink: '[--badge-background-color:var(--color-pink-500)]',
    teal: '[--badge-background-color:var(--color-teal-500)]',
  } as const

  const isNumberOnly = typeof children === 'number'

  return (
    <div
      {...props}
      className={cn(
        BADGE_COLOR_MAP[color],
        rootClasses({
          className,
          variant,
          size,
          disabled,
          numberOnly: numberOnly ?? isNumberOnly,
        })
      )}
      data-scope="badge"
      data-part="root"
      aria-disabled={disabled}
    >
      {renderChildren({
        children,
        props: {
          size,
        },
        displayNames: [BADGE_ICON_NAME, BADGE_DOT_NAME],
      })}
    </div>
  )
}

BadgeRoot.displayName = BADGE_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function BadgeIcon<T extends React.ElementType = RemixiconComponentType>({
  as,
  className,
  variant,
  size,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div'

  return (
    <Component
      {...props}
      className={iconClasses({
        className,
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

interface BadgeDotProps extends React.ComponentProps<'span'>, BadgeSharedProps {}

export function BadgeDot({ className, size, ...props }: BadgeDotProps) {
  return (
    <span
      {...props}
      className={dotClasses({
        size,
        className,
      })}
      data-scope="badge"
      data-part="dot"
      aria-hidden
    />
  )
}

BadgeDot.displayName = BADGE_DOT_NAME
