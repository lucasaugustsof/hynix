import * as React from 'react'

/**
 * Configuration options for the useCloneChildren hook.
 */
export interface UseCloneChildrenOptions<T extends Record<string, unknown>> {
  /** Props to inject into child components */
  props: T
  /** Children to clone and inject props into */
  children?: React.ReactNode
  /** Prefix for generated IDs */
  idPrefix?: string
  /** Array of component displayNames that should receive props. If not provided, all children receive props */
  targets?: string[]
}

/**
 * Return value from the useCloneChildren hook.
 */
export interface UseCloneChildrenReturn {
  /** Generated unique ID for the component */
  id: string
  /** Function to clone children and inject props */
  cloneChildren: (children?: React.ReactNode) => React.ReactNode
  /** Retrieves the generated ID for a specific child component by displayName */
  getTargetId(name: string): string | undefined
}

/**
 * Hook to clone React children and recursively inject props into them.
 *
 * Used in compound component patterns to share props from parent to children
 * without explicit prop drilling. Identifies children by displayName and
 * selectively injects props.
 *
 * @example
 * ```tsx
 * function AlertRoot({ children, status, variant, size }) {
 *   const { id, cloneChildren, getTargetId } = useCloneChildren({
 *     props: { status, variant, size },
 *     children,
 *     idPrefix: 'alert',
 *     targets: ['Alert.Icon', 'Alert.Title', 'Alert.Description']
 *   })
 *
 *   return (
 *     <div
 *       id={id}
 *       aria-labelledby={getTargetId('Alert.Title')}
 *       aria-describedby={getTargetId('Alert.Description')}
 *     >
 *       {cloneChildren()}
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
  const generatedId = React.useId()
  const id = idPrefix ? `${idPrefix}-${generatedId}` : generatedId

  const targetsIdRef = React.useRef<Map<string, string>>(new Map())
  const targetsIds = targetsIdRef.current

  const resolveChildDisplayName = (child: React.ReactElement) => {
    const displayName =
      (child.type as React.ComponentType).displayName ??
      (typeof child.type === 'function' ? child.type.name : '') ??
      ''

    return displayName
  }

  const formatDisplayNameForId = (displayName: string) => {
    return displayName.split('.').pop()?.toLowerCase() || displayName.toLowerCase()
  }

  const recursiveClone = (node: React.ReactNode, parentIndex: string | number): React.ReactNode => {
    if (!React.isValidElement<HTMLElement>(node)) return node

    const childDisplayName = resolveChildDisplayName(node)
    const formattedName = childDisplayName ? formatDisplayNameForId(childDisplayName) : ''

    const key =
      node.key ||
      (formattedName ? `${idPrefix}-${formattedName}__${generatedId}` : `${id}-${parentIndex}`)

    if (childDisplayName && !targetsIds.has(childDisplayName)) {
      targetsIds.set(childDisplayName, key)
    }

    const shouldInjectProps = !targets || targets.includes(childDisplayName)

    const clonedProps: Record<string, unknown> = {
      key,
      id: key,
      ...(shouldInjectProps ? props : {}),
    }

    let clonedChildren = node.props.children as React.ReactNode

    if (clonedChildren) {
      clonedChildren = React.Children.map(clonedChildren, (child, i) =>
        recursiveClone(child, `${formattedName || parentIndex}-${i}`)
      )
    }

    return React.cloneElement(node, clonedProps, clonedChildren)
  }

  const cloneChildren = React.useCallback(
    (childrenToClone?: React.ReactNode): React.ReactNode => {
      const targetChildren = childrenToClone ?? children

      return React.Children.map(targetChildren, (child, index) => recursiveClone(child, index))
    },
    [props]
  )

  const getTargetId = (displayName: string) => {
    return targetsIds.get(displayName)
  }

  return {
    id,
    cloneChildren,
    getTargetId,
  }
}
