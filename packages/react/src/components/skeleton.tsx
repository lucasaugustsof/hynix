import { cn } from '@r/utilities/cn'

type SkeletonProps = Omit<React.ComponentPropsWithRef<'div'>, 'children'> & {
  shape?: 'square' | 'circle'
}

function Skeleton({
  className,
  shape = 'square',
  'aria-label': ariaLabel = 'Loading content',
  ...props
}: SkeletonProps) {
  return (
    <div
      {...props}
      role="status"
      className={cn(
        'block size-32 animate-pulse overflow-hidden bg-black/6 dark:bg-white/6',
        shape === 'square' ? 'rounded-xl' : 'rounded-full',
        className,
      )}
      aria-label={ariaLabel}
      aria-busy
    />
  )
}

export { Skeleton }
export type { SkeletonProps }
