import { cn } from 'registry/utilities/cn'

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
        'block size-32 overflow-hidden bg-black/8 dark:bg-white/8',
        shape === 'square' ? 'rounded-xl' : 'rounded-full',
        className,
      )}
      aria-label={ariaLabel}
      aria-busy
    >
      <div
        className={cn(
          'mask-l-from-48% mask-r-from-48% size-full rounded-inherit bg-black/8 dark:bg-white/8',
          'animate-skeleton',
        )}
        aria-hidden
      />
    </div>
  )
}

export { Skeleton }
export type { SkeletonProps }
