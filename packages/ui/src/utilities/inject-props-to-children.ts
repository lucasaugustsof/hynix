import * as React from 'react'

type InjectPropsToChildrenOptions<T = unknown> = {
  /**
   * List of component displayNames to match.
   * Props will only be injected into components matching these names.
   */
  targets: string[]

  /**
   * Props to inject into the matched components.
   */
  props: Partial<T>

  /**
   * Optional key prefix for cloned elements.
   */
  keyPrefix?: string

  /**
   * Whether to return only the first child (e.g. for Slot-like behavior).
   */
  asChild?: boolean
}

/**
 * Recursively injects props into React children whose displayName matches a list of target names.
 *
 * This is useful for compound component patterns where parent-level props need to reach
 * specific nested children without direct prop drilling.
 *
 * @param children - The children tree to traverse.
 * @param options - Match configuration and props to inject.
 * @returns The cloned React nodes with props injected into matching components.
 */
export function injectPropsToChildren<T = unknown>(
  children: React.ReactNode,
  options: InjectPropsToChildrenOptions<T>,
): React.ReactNode {
  const { targets, props, keyPrefix = 'inject', asChild } = options

  const cloned = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    const displayName = (child.type as React.ComponentType)?.displayName ?? ''
    const shouldInject = targets.includes(displayName)

    const childProps = child.props as {
      children?: React.ReactNode
      asChild?: boolean
    }

    return React.cloneElement(
      child,
      {
        ...(shouldInject ? props : {}),
        key: `${keyPrefix}-${index.toString()}`,
      },
      injectPropsToChildren(childProps?.children, {
        targets,
        props,
        keyPrefix,
        asChild: childProps?.asChild,
      }),
    )
  })

  return asChild ? cloned?.[0] : cloned
}
