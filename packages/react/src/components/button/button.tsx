import type { Assign } from '@ark-ui/react'
import { ark } from '@ark-ui/react/factory'

import type { PolymorphicProps } from '@/utils/polymorphic'
import { tv, type VariantProps } from '@/utils/tv'

const BUTTON_ROOT_NAME = 'Button.Root'
const BUTTON_ICON_NAME = 'Button.Icon'

const buttonVariants = tv({
  slots: {
    root: [
      'inset-ring-1 isolate inline-flex cursor-pointer items-center justify-center whitespace-nowrap px-1.5 [transition:background-color_0.2s,scale_0.18s] enabled:active:scale-98',
      'text-fg-2 text-label-sm',
      'focus-visible:outline-2 focus-visible:outline-offset-2',
      'disabled:inset-ring-0 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
    ],
    icon: 'size-5 shrink-0 fill-current',
  },
  variants: {
    variant: {
      primary: {
        root: [
          'inset-ring-brand bg-brand focus-visible:outline-brand/15 enabled:not-focus-visible:hover:bg-brand/90',
        ],
      },
      secondary: {
        root: [
          'inset-ring-border bg-surface-2 focus-visible:outline-brand/15 enabled:not-focus-visible:hover:bg-fill-2',
          'text-fg-1 *:data-[part=icon]:fill-fill-5',
        ],
      },

      danger: {
        root: 'bg-danger focus-visible:outline-danger/15 enabled:not-focus-visible:hover:bg-danger/90',
      },
      outline: {
        root: [
          'inset-ring-brand bg-transparent focus-visible:outline-brand/15 enabled:not-focus-visible:hover:bg-brand/10',
          'text-brand',
        ],
      },
    },
    size: {
      md: {
        root: 'h-10 gap-x-2 rounded-[--spacing(2.5)] px-2.5',
      },
      sm: {
        root: 'h-9 gap-x-2 rounded-lg px-2',
      },
      xs: {
        root: 'h-8 gap-x-1.5 rounded-lg px-1.5',
      },
      '2xs': {
        root: 'h-7 gap-x-1.5 rounded-lg px-1.5',
      },
    },
    onlyIcon: {
      true: {
        root: 'aspect-square px-0',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    onlyIcon: false,
  },
})

const { root: rootClasses, icon: iconClasses } = buttonVariants()

type ButtonSharedProps = VariantProps<typeof buttonVariants>

////////////////////////////////////////////////////////////////////////////////////

interface ButtonProps
  extends Assign<React.ComponentPropsWithRef<typeof ark.button>, ButtonSharedProps> {}

export function ButtonRoot({ className, variant, size, onlyIcon, ...props }: ButtonProps) {
  return (
    <ark.button
      {...props}
      className={rootClasses({
        className,
        variant,
        size,
        onlyIcon,
      })}
      data-scope="button"
      data-part="icon"
    />
  )
}

ButtonRoot.displayName = BUTTON_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function ButtonIcon<T extends React.ElementType>({
  as,
  className,
  ...props
}: PolymorphicProps<T, ButtonSharedProps>) {
  const Component = as || 'div'
  return (
    <Component
      {...props}
      className={iconClasses({
        className,
      })}
      data-scope="button"
      data-part="icon"
    />
  )
}

ButtonIcon.displayName = BUTTON_ICON_NAME
