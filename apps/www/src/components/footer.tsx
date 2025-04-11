import { cn } from '@/utilities/cn'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('absolute bottom-12')}>
      <span className={cn('text-fg-1/40 text-sm/5.5')}>
        &copy; {currentYear} Hynix. Developed by{' '}
        <a
          href="https://github.com/lucasaugustsof"
          className={cn('text-fg-1/70 underline-offset-2', 'hover:underline')}
        >
          lucasaugustsof
        </a>
        .
      </span>
    </footer>
  )
}
