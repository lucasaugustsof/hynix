import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const kbdVariants = tv({
  base: [
    'inline-flex items-center justify-center whitespace-nowrap align-middle font-medium font-mono',
  ],
  variants: {
    variant: {
      primary: 'bg-fill-1 text-fg-1',
      secondary: 'bg-fill-5 text-fg-2',
    },
    size: {
      xs: 'h-5 rounded-md px-1.5 text-[calc(var(--spacing)*2.5)]',
      sm: 'h-6 rounded-lg px-1.5 text-xs',
      md: 'h-7 rounded-[calc(var(--spacing)*2.5)] px-2',
      lg: 'h-8 rounded-xl px-2.5',
    },
  },
  compoundVariants: [
    {
      size: ['xs', 'sm'],
      class: 'leading-4.5',
    },
    {
      size: ['md', 'lg'],
      class: 'text-sm leading-5.5',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type KbdProps = React.ComponentPropsWithRef<'kbd'> &
  VariantProps<typeof kbdVariants>

function Kbd({ variant, size, ...props }: KbdProps) {
  return (
    <kbd
      {...props}
      className={cn(
        kbdVariants({
          variant,
          size,
        }),
      )}
      data-scope="kbd"
    />
  )
}

export { Kbd }
export type { KbdProps }
