import { cn } from '@r/utilities/cn'
import { type VariantProps, tv } from '@r/utilities/tv'

const kbdVariants = tv({
  base: [
    'inline-flex aspect-square h-6 items-center justify-center whitespace-nowrap rounded-sm px-1.5 align-middle',
    'font-medium text-sm/5.5 tracking-widest',
  ],
  variants: {
    variant: {
      primary: 'bg-fill-1 text-fg-1',
      secondary: 'bg-fill-5 text-fg-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type KbdProps = React.ComponentPropsWithRef<'kbd'> &
  VariantProps<typeof kbdVariants>

const Kbd = ({ className, variant, ...props }: KbdProps) => {
  return (
    <kbd
      {...props}
      className={cn(
        kbdVariants({
          className,
          variant,
        }),
      )}
      data-scope="kbd"
    />
  )
}

Kbd.displayName = 'Kbd'

export { Kbd, type KbdProps }
