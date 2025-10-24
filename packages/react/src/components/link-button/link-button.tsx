import { ark } from '@ark-ui/react/factory'

import { useCloneChildren } from '@/hooks/use-clone-children'
import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const LINK_BUTTON_ROOT_NAME = 'LinkButton.Root'
const LINK_BUTTON_ICON_NAME = 'LinkButton.Icon'

const createLinkButtonRecipe = tv({
  slots: {
    root: [
      'inline-flex cursor-pointer items-center justify-center gap-x-1 whitespace-nowrap underline-offset-2 transition-colors',
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
        root: 'cursor-not-allowed text-disabled',
      },
      false: {
        root: [
          // hover
          'hover:text-fg-1/90 hover:underline',
        ],
      },
    },
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
  },
})

const linkButtonRecipe = createLinkButtonRecipe()

type LinkButtonSharedProps = VariantProps<typeof createLinkButtonRecipe>

export interface LinkButtonRootProps
  extends React.ComponentProps<typeof ark.a>,
    LinkButtonSharedProps {}

export function LinkButtonRoot({
  children,
  className,
  size,
  disabled,
  href,
  ...props
}: LinkButtonRootProps) {
  const { cloneChildren } = useCloneChildren({
    targets: [LINK_BUTTON_ICON_NAME],
    props: {
      size,
    },
    idPrefix: 'link-button',
    children,
  })

  return (
    <ark.a
      {...props}
      className={linkButtonRecipe.root({
        className,
        size,
        disabled,
      })}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled}
    >
      {cloneChildren()}
    </ark.a>
  )
}

LinkButtonRoot.displayName = LINK_BUTTON_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

export function LinkButtonIcon<T extends React.ElementType>({
  as,
  size,
  ...props
}: PolymorphicProps<T, LinkButtonSharedProps>) {
  const Component = as || 'span'
  return (
    <Component
      {...props}
      className={linkButtonRecipe.icon({
        size,
      })}
      aria-hidden
    />
  )
}

LinkButtonIcon.displayName = LINK_BUTTON_ICON_NAME
