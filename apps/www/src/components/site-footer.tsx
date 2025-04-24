import Link from 'next/link'

import { cn } from '@/utilities/cn'

const REDIRECT_X = 'https://x.com/lucasaugustsof'
const REDIRECT_GITHUB = 'https://github.com/lucasaugustsof/hynix'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'flex flex-col justify-between px-4 py-3 *:text-fg-1/40 *:text-sm/5.5',
        'sm:flex-row sm:items-center sm:px-10',
      )}
    >
      <span>&copy; {currentYear} Hynix</span>

      <span
        className={cn(
          '[&_a]:text-fg-1 [&_a]:underline-offset-2 [&_a]:hover:underline',
        )}
      >
        Made with care by <Link href={REDIRECT_X}>lucasaugustsof</Link> · Code
        on <Link href={REDIRECT_GITHUB}>GitHub</Link>.
      </span>
    </footer>
  )
}
