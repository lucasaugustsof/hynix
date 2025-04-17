import { cn } from '@/utilities/cn'

type ComponentPreviewCardProps = {
  title: string
  description: string
}

export function ComponentPreviewCard({
  title,
  description,
}: ComponentPreviewCardProps) {
  return (
    <article
      className={cn(
        'rounded-[calc(var(--radius)_+_(var(--spacing)_*_1.5))] [--radius:0.875rem]',
        'inset-ring-[0.5px] inset-ring-border space-y-2.5 bg-surface-1 p-1.5 shadow-black/8 shadow-xs dark:shadow-white/8',
      )}
    >
      <figure
        className={cn(
          'inset-ring-[0.5px] inset-ring-border h-50 w-full rounded-(--radius) bg-surface-2',
        )}
      />

      <footer className={cn('px-2.5 py-1')}>
        <h3 className={cn('font-medium text-base text-fg-1')}>{title}</h3>

        <p className={cn('line-clamp-2 font-normal text-fg-1/70 text-sm/5.5')}>
          {description}
        </p>
      </footer>
    </article>
  )
}
