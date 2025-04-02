import * as React from 'react'

type RecursiveCloneOptions<T = unknown> = {
  /**
   * An array of display names to match against the children components.
   * Only components with matching display names will receive the injected props.
   */
  match: string[]

  /**
   * Props to inject into the matched children components.
   */
  inject: Partial<T>

  /**
   * Optional prefix used to generate unique keys for cloned elements.
   * Defaults to `'rc'`.
   */
  keyPrefix?: string

  /**
   * Indicates whether the parent is using a Slot-like component and only
   * the first child should be returned (e.g. with `asChild`).
   */
  asChild?: boolean
}

/**
 * Recursively clones React children and injects props into components
 * whose display names match the provided list.
 *
 * This is useful for component compositions where certain subcomponents
 * (e.g. Label, Input) need to receive contextual props from a parent component.
 *
 * @param children - The React node(s) to be recursively cloned.
 * @param options - Configuration options including match list, props to inject, and optional key prefix.
 *
 * @returns The cloned children with props applied to matching components.
 */
export function recursiveClone<T = unknown>(
  children: React.ReactNode,
  options: RecursiveCloneOptions<T>,
): React.ReactNode {
  const { match, inject, keyPrefix = 'rc', asChild } = options

  const mapped = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    const displayName = (child.type as React.ComponentType)?.displayName || ''

    const shouldInject = match.includes(displayName)

    const childProps = (child as React.ReactElement).props as {
      children: React.ReactNode
      asChild?: boolean
    }

    return React.cloneElement(
      child,
      {
        ...(shouldInject ? inject : {}),
        key: `${keyPrefix}-${index}`,
      },
      recursiveClone(childProps?.children, {
        match,
        inject,
        keyPrefix,
        asChild: childProps?.asChild,
      }),
    )
  })

  return asChild ? mapped?.[0] : mapped
}
