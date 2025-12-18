import { ark } from '@ark-ui/react/factory'

import { cloneChildrenWithProps } from '@/lib/clone-children-with-props'
import { tv, type VariantProps } from '@/lib/tv'

const BUTTON_ROOT_NAME = 'Button.Root'
const BUTTON_ICON_NAME = 'Button.Icon'

const createButtonRecipe = tv({
  slots: {
    root: [
      'inset-ring-1 isolate inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-x-2 whitespace-nowrap rounded-lg px-1.5 transition-[background-color,box-shadow]',
      'font-medium text-sm/5 tracking-[-0.00525rem]',
      'focus-visible:focus-outline',
      'disabled:inset-ring-0 disabled:cursor-not-allowed disabled:bg-fill-1 disabled:text-disabled',
    ],
    icon: ['size-5 shrink-0 [&_svg]:size-full [&_svg]:shrink-0'],
  },
  variants: {
    variant: {
      primary: {
        root: ['inset-ring-brand bg-brand enabled:hover:bg-brand/90', 'text-fg-2'],
      },
      secondary: {
        root: ['inset-ring-border bg-surface-2 enabled:hover:bg-fill-2', 'text-fg-1'],
        icon: 'fill-fill-5',
      },
      outline: {
        root: ['inset-ring-brand bg-transparent enabled:hover:bg-brand/10', 'text-brand'],
      },
      danger: {
        root: [
          'inset-ring-danger bg-danger [--focus-outline-color:var(--danger)] enabled:hover:bg-danger/90',
          'text-fg-2',
        ],
      },
    },
    size: {
      '2xs': {
        root: 'h-7',
      },
      xs: {
        root: 'h-8',
      },
      sm: {
        root: 'h-9 px-2',
      },
      md: {
        root: 'h-10 rounded-[--spacing(2.5)] px-2.5',
      },
    },
    iconOnly: {
      true: {
        root: 'aspect-square px-0',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    iconOnly: false,
  },
})

const buttonRecipe = createButtonRecipe()

type ButtonSharedProps = VariantProps<typeof createButtonRecipe>

export interface ButtonRootProps
  extends React.ComponentProps<typeof ark.button>,
    ButtonSharedProps {}

export function ButtonRoot({
  children,
  className,
  variant,
  size,
  iconOnly,
  disabled,

  ...props
}: ButtonRootProps) {
  const clonedChildren = cloneChildrenWithProps(children, {
    keyPrefix: 'Button',
    props: {
      variant,
      size,
    },
    targetDisplayNames: [BUTTON_ICON_NAME],
    unwrap: props.asChild,
  })

  return (
    <ark.button
      className={buttonRecipe.root({
        variant,
        size,
        iconOnly,
        className,
      })}
      disabled={disabled}
      data-scope="button"
      data-part="root"
      aria-disabled={disabled ?? undefined}
      {...props}
    >
      {clonedChildren}
    </ark.button>
  )
}

ButtonRoot.displayName = BUTTON_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface ButtonIconProps extends React.ComponentProps<typeof ark.div>, ButtonSharedProps {}

export function ButtonIcon({ className, variant, size, iconOnly, ...props }: ButtonIconProps) {
  return (
    <ark.div
      className={buttonRecipe.icon({
        variant,
        size,
        iconOnly,
        className,
      })}
      data-scope="button"
      data-part="icon"
      aria-hidden
      {...props}
    />
  )
}

ButtonIcon.displayName = BUTTON_ICON_NAME
