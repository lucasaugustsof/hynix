import * as React from 'react'

type PropsToInject = Record<string, unknown>

interface CloneChildrenOptions {
  /**
   * Props to be injected into matching components.
   */
  props: PropsToInject

  /**
   * List of component displayNames that should receive the props.
   */
  targetDisplayNames: string[]

  /**
   * Unique prefix to generate stable keys for cloned elements.
   */
  keyPrefix: string

  /**
   * When true, returns only the first child (useful for components with Slot/asChild).
   * @default false
   */
  unwrap?: boolean
}

/**
 * Recursively clones React children, injecting additional props
 * into components whose displayName matches the specified ones.
 *
 * @example
 * ```tsx
 * const clonedChildren = cloneChildrenWithProps(children, {
 *   props: { disabled: true, size: 'sm' },
 *   targetDisplayNames: ['Button', 'Input'],
 *   keyPrefix: 'form-field',
 * })
 * ```
 */
export function cloneChildrenWithProps(
  children: React.ReactNode,
  options: CloneChildrenOptions
): React.ReactNode {
  const { props, targetDisplayNames, keyPrefix, unwrap = false } = options

  const cloned = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      return child
    }

    const displayName = getDisplayName(child)

    const shouldInjectProps = targetDisplayNames.includes(displayName)
    const childProps = child.props as Record<string, unknown>
    const childHasAsChild = !!childProps.asChild

    return React.cloneElement(
      child,
      {
        ...(shouldInjectProps ? props : {}),
        key: `${keyPrefix}-${index}`,
      },
      cloneChildrenWithProps(childProps.children as React.ReactNode, {
        ...options,
        unwrap: childHasAsChild,
      })
    )
  })

  return unwrap ? cloned?.[0] : cloned
}

function getDisplayName(element: React.ReactElement): string {
  const type = element.type as React.ComponentType
  return type?.displayName ?? ''
}
