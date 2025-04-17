import Link from 'next/link'

import { cn } from '@/utilities/cn'

export function Footer() {
  return (
    <footer
      className={cn(
        'mt-50 flex h-12 items-center justify-between border-t-[0.5px] px-10',
        '*:text-fg-1/40 *:text-sm/5.5',
      )}
    >
      <span>&copy; 2025 Hynix</span>

      <span
        className={cn(
          '[&_a]:text-fg-1 [&_a]:underline-offset-2 [&_a]:hover:underline',
        )}
      >
        Made with care by <Link href="/">lucasaugustsof</Link> · Code on{' '}
        <Link href="/">GitHub</Link>.
      </span>
    </footer>
  )
}
