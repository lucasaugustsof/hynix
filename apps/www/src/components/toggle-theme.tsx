'use client'

import {
  ToggleGroup as ArkToggleGroup,
  useToggleGroup,
} from '@ark-ui/react/toggle-group'

import { RiComputerLine, RiSunFill, RiMoonFill } from '@remixicon/react'
import { motion } from '@/lib/motion'

import { useTheme } from 'next-themes'

import { cn } from '@/utilities/cn'

export function ToggleTheme() {
  const availableThemes = [
    {
      theme: 'system',
      component: <RiComputerLine />,
    },
    {
      theme: 'light',
      component: <RiSunFill />,
    },
    {
      theme: 'dark',
      component: <RiMoonFill />,
    },
  ]

  const toggleGroup = useToggleGroup({
    defaultValue: [availableThemes[0].theme],
  })
  const { theme: currentTheme, setTheme } = useTheme()

  function handleChangeTheme(theme: string) {
    new Audio('./sound/flashlight-click-sound.mp3').play()
    setTheme(theme)
  }

  return (
    <ArkToggleGroup.RootProvider
      value={toggleGroup}
      className={cn(
        'inset-ring-(length:--hairline-width) inset-ring-border flex items-center gap-x-0.5 overflow-hidden rounded-full bg-surface-2 shadow-black/8 shadow-xs dark:shadow-white/8',
      )}
    >
      {availableThemes.map(({ theme, component }) => {
        const isSelected = currentTheme === theme

        return (
          <div key={theme} className={cn('relative size-7 *:absolute')}>
            {isSelected && (
              <motion.span
                layoutId="selected-theme"
                className={cn(
                  'inset-ring-(length:--hairline-width) inset-ring-border block aspect-square h-full rounded-full bg-surface-1',
                )}
                transition={{
                  type: 'tween',
                  duration: 0.2,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              />
            )}

            <ArkToggleGroup.Item
              className={cn(
                'z-10 p-1.5',
                '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:fill-fill-4 [&_svg]:transition-colors [&_svg]:duration-200 [&_svg]:ease-out-quad',
                isSelected && '[&_svg]:fill-fill-5',
              )}
              value={theme}
              disabled={isSelected}
              onClick={() => handleChangeTheme(theme)}
            >
              {component}
            </ArkToggleGroup.Item>
          </div>
        )
      })}
    </ArkToggleGroup.RootProvider>
  )
}
