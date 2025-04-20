import { cn } from '@/utilities/cn'

export function Separator({
  className,
  ...props
}: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'border-b-(length:--hairline-width) h-12 border-b-border',
        'bg-[image:repeating-linear-gradient(315deg,_var(--color-border)_0,_var(--color-border)_var(--hairline-width),_transparent_0,_transparent_50%)] bg-[size:10px_10px]',
        className,
      )}
    />
  )
}
