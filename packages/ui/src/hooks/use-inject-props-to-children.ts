import * as React from 'react'

import { injectPropsToChildren } from '@r/utilities/inject-props-to-children'

export function useInjectPropsToChildren<T extends object>(
  children: React.ReactNode,
  {
    targets,
    props,
    asChild,
  }: {
    targets: string[]
    props: T
    asChild?: boolean
  },
) {
  const keyPrefix = React.useId()

  return injectPropsToChildren(children, {
    props,
    targets,
    asChild,
    keyPrefix,
  })
}
