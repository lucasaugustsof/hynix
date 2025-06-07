import { Format } from '@ark-ui/react'

import { cn } from '@r/utilities/cn'

type CardProductProps = {
  image: string
  title: string
  price: number
  color?: string
  quantity?: number
}

export function CardProduct({
  image,
  title,
  price,
  color = 'White',
  quantity = 1,
}: CardProductProps) {
  return (
    <article className={cn('flex items-start gap-4')}>
      <img
        src={image}
        alt={title}
        className={cn(
          'aspect-square h-[6.5rem] cursor-zoom-in rounded border object-cover',
        )}
      />

      <div className={cn('flex flex-1 flex-col gap-y-1')}>
        <span className={cn('line-clamp-2 font-semibold text-base text-fg-1')}>
          {title}
        </span>

        <span className={cn('font-medium text-base text-fg-1/70')}>
          Color: {color}
        </span>

        <span className={cn('font-medium text-base text-fg-1/70')}>
          x{quantity}
        </span>
      </div>

      <strong className={cn('font-semibold text-base text-fg-1')}>
        {Format.Number({
          value: price,
          style: 'currency',
          currency: 'USD',
        })}
      </strong>
    </article>
  )
}
