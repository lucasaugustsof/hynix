import LogoSvg from '@/assets/logo.svg'

import { ToggleTheme } from './toggle-theme'

import { cn } from '@/utilities/cn'

type SiteHeaderProps = React.ComponentPropsWithRef<'header'>

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  return (
    <header {...props} className={cn('px-4 py-2', className)}>
      <div className={cn('flex items-center justify-between px-2 py-0.5')}>
        <LogoSvg className={cn('size-6 shrink-0')} />

        <ToggleTheme />
      </div>
    </header>
  )
}
