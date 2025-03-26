import { cn } from 'registry/utilities/cn'
import { type VariantProps, tv } from 'registry/utilities/tv'

type LoaderProps = VariantProps<typeof loaderVariants>

const loaderVariants = tv({
  base: [
    'block animate-spin rounded-full bg-conic from-transparent to-brand',
    '[mask-image:radial-gradient(circle_at_center,transparent_60%,black_0%)]',
  ],
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-11',
      lg: 'size-14.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

function Loader({ size }: LoaderProps) {
  return (
    <div
      role="status"
      className={cn(
        loaderVariants({
          size,
        }),
      )}
      data-scope="loader"
    />
  )
}

export { Loader }
export type { LoaderProps }
