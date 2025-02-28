// Hynix: ModalConfirm [v1.0.0]

import { useCallback } from 'react'

import { RiQuestionFill } from '@remixicon/react'
import { useWindowSize } from 'usehooks-ts'

import { Button } from '@/registry/components/button'
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/registry/components/dialog'

import { cn } from '@/registry/utils/cn'
import { Breakpoints } from '@/registry/utils/enums'

export type ModalConfirmProps = {
  title: string
  description: string
  actions: [
    {
      label: string
    },
    {
      label: string
      onClick?: () => void
    },
  ]
}

export function ModalConfirm({
  title,
  description,
  actions,
}: ModalConfirmProps) {
  const { width } = useWindowSize()

  const resolveButtonSize = useCallback((windowWidth: number) => {
    if (windowWidth >= Breakpoints.DESKTOP) return 'lg'
    if (windowWidth < Breakpoints.TABLET) return 'sm'

    return 'md'
  }, [])

  const buttonSize = resolveButtonSize(width)

  return (
    <DialogRoot>
      <DialogTrigger render={<Button variant="secondary">Open modal</Button>} />

      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup className={cn('space-y-6 lg:space-y-8')}>
          <header>
            <span
              className={cn(
                'inline-flex rounded-3xl border border-border bg-surface-1 p-2 shadow-xs',
              )}
            >
              <RiQuestionFill />
            </span>

            <DialogTitle className={cn('mt-4 mb-2.5 lg:mb-3')}>
              {title}
            </DialogTitle>

            <DialogDescription>{description}</DialogDescription>
          </header>

          <footer
            className={cn(
              'flex w-full flex-col gap-3 md:gap-4 lg:flex-row lg:*:flex-1',
            )}
          >
            {actions.length > 0 && (
              <DialogClose
                render={
                  <Button variant="secondary" size={buttonSize}>
                    {actions[0].label}
                  </Button>
                }
              />
            )}

            {actions.length > 1 && (
              <Button size={buttonSize} onClick={actions[1].onClick}>
                {actions[1].label}
              </Button>
            )}
          </footer>
        </DialogPopup>
      </DialogPortal>
    </DialogRoot>
  )
}
