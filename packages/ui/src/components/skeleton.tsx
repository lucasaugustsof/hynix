import { cn } from '@r/utilities/cn'

type SkeletonProps = Omit<React.ComponentPropsWithRef<'div'>, 'children'> & {
  shape?: 'square' | 'circle'
}

const Skeleton = ({
  className,
  shape = 'square',
  'aria-label': ariaLabel = 'Loading content',
  ...props
}: SkeletonProps) => {
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

Skeleton.displayName = 'Skeleton'

export { Skeleton, type SkeletonProps }
