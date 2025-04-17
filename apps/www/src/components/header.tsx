import { Logo } from './logo'

import { cn } from '@/utilities/cn'

export function Header() {
  return (
    <header
      className={cn(
        'border-black/12 border-b-[0.5px] px-4 py-2 dark:border-b-white/12',
      )}
    >
      <div className={cn('px-2 py-0.5')}>
        <Logo />
      </div>
    </header>
  )
}
