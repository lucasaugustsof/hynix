import * as React from 'react'

type RenderChildrenOptions<TProps extends Record<string, unknown>> = {
  /**
   * The children to be rendered
   */
  children: React.ReactNode
  /**
   * The props to be injected into children that match the `displayNames`
   */
  props: TProps
  /**
   * List of `displayName` of child components that should receive the props
   */
  displayNames: string[]
}

/**
 * Renders children by injecting specific props from the parent.
 *
 * This function iterates through children and, for each component that has
 * a `displayName` matching the provided list, injects the props specified
 * via `props`.
 *
 * @example
 * ```tsx
 * const ParentComponent = ({ size, children }) => {
 *   return (
 *     <div>
 *       {renderChildren({
 *         children,
 *         props: { size },
 *         displayNames: ['Child.Item', 'Child.Icon'],
 *       })}
 *     </div>
 *   )
 * }
 * ```
 */
export function renderChildren<TProps extends Record<string, unknown>>({
  children,
  props,
  displayNames,
}: RenderChildrenOptions<TProps>): React.ReactNode {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const childType = child.type as {
      displayName?: string
    }

    const childDisplayName = childType.displayName

    if (childDisplayName && displayNames.includes(childDisplayName)) {
      return React.cloneElement(child, Object.assign({}, props, child.props))
    }

    return child
  })
}
