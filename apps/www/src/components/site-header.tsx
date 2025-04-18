import LogoSvg from '@/assets/logo.svg'

import { ToggleTheme } from './toggle-theme'

import { cn } from '@/utilities/cn'

export function SiteHeader() {
  return (
    <header
      className={cn(
        'border-black/12 border-b-[0.5px] px-4 py-2 dark:border-b-white/12',
      )}
    >
      <div className={cn('flex items-center justify-between px-2 py-0.5')}>
        <LogoSvg className={cn('size-6 shrink-0')} />

        <ToggleTheme />
      </div>
    </header>
  )
}
