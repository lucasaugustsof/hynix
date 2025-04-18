import Link from 'next/link'

import { cn } from '@/utilities/cn'

type CardComponentProps = {
  data: {
    thumbnail: React.FC<React.ComponentProps<'svg'>>
    title: string
    description: string
    to: string
  }
}

export function CardComponent({ data }: CardComponentProps) {
  const { thumbnail: Thumbnail, title, description, to = '/' } = data

  return (
    <article
      className={cn(
        'group relative rounded-[calc(var(--radius)_+_(var(--spacing)_*_1.5))] [--radius:0.875rem]',
        'inset-ring-[0.5px] inset-ring-border space-y-2.5 bg-surface-1 p-1.5 shadow-black/8 shadow-xs dark:shadow-white/8',
      )}
    >
      <figure
        className={cn(
          'inset-ring-[0.5px] inset-ring-border h-50 w-full rounded-(--radius) bg-surface-2',
        )}
      >
        <Thumbnail
          className={cn(
            'size-full transition-transform duration-200 ease-in-out-cubic group-hover:scale-102',
          )}
        />
      </figure>

      <footer className={cn('px-2.5 py-1')}>
        <h3 className={cn('font-medium text-base text-fg-1')}>
          <Link href={to}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>

        <p className={cn('line-clamp-2 font-normal text-fg-1/70 text-sm/5.5')}>
          {description}
        </p>
      </footer>
    </article>
  )
}
