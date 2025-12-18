import { ark } from '@ark-ui/react/factory'

import { cloneChildrenWithProps } from '@/lib/clone-children-with-props'
import { tv, type VariantProps } from '@/lib/tv'

const LINK_BUTTON_ROOT_NAME = 'LinkButton.Root'
const LINK_BUTTON_ICON_NAME = 'LinkButton.Icon'

const createLinkButtonRecipe = tv({
  slots: {
    root: [
      'inline-flex w-fit cursor-pointer items-center justify-center gap-x-1 whitespace-nowrap underline-offset-2 outline-hidden transition-colors',
      'font-medium font-sans text-fg-1',
    ],
    icon: 'shrink-0',
  },
  variants: {
    size: {
      sm: {
        root: 'text-xs/4',
        icon: 'size-4',
      },
      md: {
        root: 'text-sm/5 tracking-[-0.00525rem]',
        icon: 'size-5',
      },
    },
    disabled: {
      true: {
        root: '!text-disabled cursor-not-allowed',
      },
      false: {
        root: [
          // hover
          'hover:text-fg-1/90 hover:underline',
        ],
      },
    },
    underline: {
      true: {
        root: 'underline',
      },
      false: {
        root: 'no-underline',
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
    underline: false,
  },
})

const linkButtonRecipe = createLinkButtonRecipe()

type LinkButtonSharedProps = VariantProps<typeof createLinkButtonRecipe>

export interface LinkButtonRootProps
  extends React.ComponentProps<typeof ark.a>,
    LinkButtonSharedProps {
  underline?: boolean
}

export function LinkButtonRoot({
  children,
  className,
  size,
  disabled,
  href,
  underline,
  ...props
}: LinkButtonRootProps) {
  const clonedChildren = cloneChildrenWithProps(children, {
    keyPrefix: 'LinkButton',
    props: {
      size,
    },
    targetDisplayNames: [LINK_BUTTON_ICON_NAME],
    unwrap: props.asChild,
  })

  return (
    <ark.a
      className={linkButtonRecipe.root({
        className,
        size,
        disabled,
        underline,
      })}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : undefined}
      data-scope="link-button"
      data-part="root"
      aria-disabled={disabled}
      {...props}
    >
      {clonedChildren}
    </ark.a>
  )
}

LinkButtonRoot.displayName = LINK_BUTTON_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export interface LinkButtonIconProps
  extends React.ComponentProps<typeof ark.div>,
    LinkButtonSharedProps {}

export function LinkButtonIcon({ className, size, ...props }: LinkButtonIconProps) {
  return (
    <ark.div
      className={linkButtonRecipe.icon({
        size,
        className,
      })}
      data-scope="link-button"
      data-part="icon"
      aria-hidden
      {...props}
    />
  )
}

LinkButtonIcon.displayName = LINK_BUTTON_ICON_NAME
