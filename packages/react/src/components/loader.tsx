import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

type LoaderProps = VariantProps<typeof loaderVariants>

const loaderVariants = tv({
  base: [
    'block animate-spin rounded-full bg-conic from-transparent to-brand',
    'mask-radial-at-center mask-radial-circle mask-radial-from-60% mask-radial-from-transparent mask-radial-to-0 mask-radial-to-black',
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
