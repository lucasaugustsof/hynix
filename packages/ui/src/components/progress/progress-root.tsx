import { Progress as ArkProgress } from '@ark-ui/react/progress'
import type * as ArkProgressTypes from '@ark-ui/react/progress'

import { useEnhancedChildren } from '@r/hooks/use-enhanced-children'

import { cn } from '@r/utilities/cn'
import type { VariantProps } from '@r/utilities/tv'

import { rootStyles } from './progress.styles'

export type ProgressSharedProps = VariantProps<typeof rootStyles>

export type BaseProgressProps<T = ArkProgressTypes.ProgressRootProps> = T &
  ProgressSharedProps

const progressTargets = [
  'ProgressLabel',
  'ProgressValueText',
  'ProgressTrack',
  'ProgressRange',
]

export function ProgressRootProvider({
  children,
  className,
  size = 'md',
  asChild,
  ...props
}: BaseProgressProps<ArkProgressTypes.ProgressRootProviderProps>) {
  const enhancedChildren = useEnhancedChildren(children, {
    targets: progressTargets,
    props: {
      size,
    },
    asChild,
  })

  return (
    <ArkProgress.RootProvider
      {...props}
      className={cn(
        rootStyles({
          className,
          size,
        }),
      )}
    >
      {enhancedChildren}
    </ArkProgress.RootProvider>
  )
}

export function ProgressRoot({
  children,
  className,
  size = 'md',
  asChild,
  ...props
}: BaseProgressProps) {
  const enhancedChildren = useEnhancedChildren(children, {
    targets: progressTargets,
    props: {
      size,
    },
    asChild,
  })

  return (
    <ArkProgress.Root
      {...props}
      className={cn(
        rootStyles({
          className,
          size,
        }),
      )}
    >
      {enhancedChildren}
    </ArkProgress.Root>
  )
}
