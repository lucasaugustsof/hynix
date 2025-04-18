import { Logo } from './logo'
import { ToggleTheme } from './toggle-theme'

import { cn } from '@/utilities/cn'

export function Header() {
  return (
    <header
      className={cn(
        'border-black/12 border-b-[0.5px] px-4 py-2 dark:border-b-white/12',
      )}
    >
      <div className={cn('flex items-center justify-between px-2 py-0.5')}>
        <Logo />

        <ToggleTheme />
      </div>
    </header>
  )
}
