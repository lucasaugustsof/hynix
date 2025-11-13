import { ark } from '@ark-ui/react/factory'

import { useCloneChildren } from '@/hooks/use-clone-children'
import { tv, type VariantProps } from '@/lib/tv'
import type { PolymorphicProps } from '@/types/polymorphic'

const LINK_BUTTON_ROOT_NAME = 'LinkButton.Root'
const LINK_BUTTON_ICON_NAME = 'LinkButton.Icon'

const createLinkButtonRecipe = tv({
  slots: {
    root: [
      'inline-flex w-fit cursor-pointer items-center justify-center gap-x-1 whitespace-nowrap underline-offset-2 transition-colors',
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

/**
 * Link button root component that renders a styled anchor element.
 * Combines link functionality with button-like appearance and behavior.
 * Automatically injects size props to child icon components.
 * Supports disabled state that prevents navigation and keyboard interaction.
 * Built on Ark UI with proper accessibility attributes.
 *
 * @example
 * ```tsx
 * <LinkButton.Root href="/docs" size="md">
 *   View Documentation
 * </LinkButton.Root>
 *
 * <LinkButton.Root href="/settings" underline>
 *   Settings
 * </LinkButton.Root>
 *
 * <LinkButton.Root href="/profile" size="sm">
 *   <LinkButton.Icon as={UserIcon} />
 *   My Profile
 * </LinkButton.Root>
 *
 * <LinkButton.Root href="/disabled" disabled>
 *   Unavailable Link
 * </LinkButton.Root>
 * ```
 */
export interface LinkButtonRootProps
  extends React.ComponentProps<typeof ark.a>,
    LinkButtonSharedProps {
  /**
   * Whether to show underline on the link
   * @default false
   */
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
  const { cloneChildren } = useCloneChildren({
    targets: [LINK_BUTTON_ICON_NAME],
    props: {
      size,
    },
    idPrefix: 'link-button',
    children,
  })

  const clonedChildren = cloneChildren(children)

  return (
    <ark.a
      {...props}
      className={linkButtonRecipe.root({
        className,
        size,
        disabled,
        underline,
      })}
      href={disabled ? undefined : href}
      tabIndex={disabled ? -1 : undefined}
      aria-disabled={disabled}
      data-scope="link-button"
      data-part="root"
    >
      {clonedChildren}
    </ark.a>
  )
}

LinkButtonRoot.displayName = LINK_BUTTON_ROOT_NAME

////////////////////////////////////////////////////////////////////////////////////

/**
 * Link button icon component for displaying icons within link buttons.
 * Supports polymorphic rendering via the `as` prop.
 * Automatically scales based on the link button size.
 * Can be positioned before or after text content.
 *
 * @example
 * ```tsx
 * <LinkButton.Root href="/external">
 *   Visit Site
 *   <LinkButton.Icon as={ExternalLinkIcon} />
 * </LinkButton.Root>
 *
 * <LinkButton.Root href="/back">
 *   <LinkButton.Icon as={ArrowLeftIcon} />
 *   Go Back
 * </LinkButton.Root>
 *
 * <LinkButton.Root href="/download">
 *   <LinkButton.Icon as={DownloadIcon} />
 *   Download File
 * </LinkButton.Root>
 * ```
 */
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
      data-scope="link-button"
      data-part="icon"
      aria-hidden
    />
  )
}

LinkButtonIcon.displayName = LINK_BUTTON_ICON_NAME
