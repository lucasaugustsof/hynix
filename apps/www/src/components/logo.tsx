import { cn } from '@/utilities/cn'

type LogoProps = React.ComponentPropsWithRef<'svg'>

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      {...props}
      className={cn('size-6', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <title>Hynix</title>

      <g clipPath="url(#clip0_488_5627)">
        <path d="M8 0H0V8V16L8 24V16H16L8 8V0Z" fill="var(--color-brand)" />
        <path d="M16 0V8V16V24H24V16V8L16 0Z" fill="var(--color-brand)" />
      </g>

      <defs>
        <clipPath id="clip0_488_5627">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
