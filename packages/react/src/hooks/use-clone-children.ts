import React, { useId, useMemo } from 'react'

export interface UseCloneChildrenOptions<T extends Record<string, unknown>> {
  /**
   * Props to be shared with children components
   */
  props: T
  /**
   * Children to clone and inject props into
   */
  children?: React.ReactNode
  /**
   * Optional prefix for the generated ID
   */
  idPrefix?: string
  /**
   * Array of displayNames to target. If provided, only children with matching displayNames will receive props.
   * If not provided, all children will receive props.
   */
  targets?: string[]
}

export interface UseCloneChildrenReturn {
  /**
   * Unique identifier for this component instance
   */
  id: string
  /**
   * Clone children and inject shared props
   */
  cloneChildren: (children?: React.ReactNode) => React.ReactNode
}

/**
 * Generic hook to clone children and inject shared props
 *
 * @example
 * ```tsx
 * function ParentComponent({ status, variant, children }) {
 *   const { id, cloneChildren } = useCloneChildren({
 *     props: { status, variant },
 *     children,
 *     targets: ['AlertIcon', 'AlertTitle'] // Only inject props into these components
 *   })
 *
 *   return (
 *     <div id={id}>
 *       {cloneChildren(children)}
 *     </div>
 *   )
 * }
 * ```
 */
export function useCloneChildren<T extends Record<string, unknown>>({
  props,
  children,
  idPrefix,
  targets,
}: UseCloneChildrenOptions<T>): UseCloneChildrenReturn {
  const generatedId = useId()
  const id = idPrefix ? `${idPrefix}-${generatedId}` : generatedId

  const cloneChildren = useMemo(() => {
    return (childrenToClone?: React.ReactNode) => {
      const targetChildren = childrenToClone ?? children

      return React.Children.map(targetChildren, child => {
        if (React.isValidElement(child)) {
          const childDisplayName =
            (child.type as React.ComponentType)?.displayName ||
            (typeof child.type === 'function' ? child.type.name : undefined)

          const shouldInjectProps =
            !targets || (childDisplayName && targets.includes(childDisplayName))

          if (shouldInjectProps) {
            const newProps = {
              ...props,
              key: child.key || `${id}-${Math.random().toString(36).slice(2, 9)}`,
            }

            return React.cloneElement(child, newProps)
          }
        }
        return child
      })
    }
  }, [id, props, children, targets])

  return {
    id,
    cloneChildren,
  }
}
