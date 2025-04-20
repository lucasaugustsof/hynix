import { RiArrowRightUpLine, RiGithubFill } from '@remixicon/react'

import { cn } from '@/utilities/cn'

import { Button } from '@/components/ui/button'

import CircleDashedTopRightCutSvg from '@/assets/circle-dashed-top-right-cut.svg'

export function GridContent() {
  return (
    <div
      className={cn(
        'grid grid-cols-[1fr_var(--layout-content-max)_1fr]',
        'border-y-(length:--hairline-width)',
      )}
    >
      <div
        className={cn('border-r-(length:--hairline-width) border-r-border')}
      />

      <div className={cn('relative py-2 pl-17')}>
        <main className={cn('max-w-lg space-y-8')}>
          <div>
            <h1 className={cn('mb-3 font-semibold text-3xl/10.5 text-fg-1')}>
              Speed for purposeful
              <br />
              developers
            </h1>

            <p
              className={cn(
                'font-normal text-base text-fg-1/70',
                '[&_strong]:font-medium [&_strong]:text-fg-1',
              )}
            >
              A minimalist <strong>React</strong> component library powered by{' '}
              <strong>TailwindCSS</strong> and <strong>Ark UI</strong> —
              accessible by default, themeable, and production-ready.
            </p>
          </div>

          <div className={cn('flex items-center gap-x-3 p-1')}>
            <Button size="sm">
              Get Started
              <RiArrowRightUpLine />
            </Button>

            <Button variant="secondary" size="sm">
              <RiGithubFill />
              GitHub
              <span
                className={cn(
                  'inline-block rounded-lg bg-fill-2 px-1.5 font-semibold text-fill-5 text-sm/5.5',
                )}
              >
                22
              </span>
            </Button>
          </div>
        </main>

        <CircleDashedTopRightCutSvg
          className={cn(
            '-translate-y-1/2 -translate-x-1/2 absolute top-0 left-0',
          )}
        />
      </div>

      <div
        className={cn('border-l-(length:--hairline-width) border-l-border')}
      />
    </div>
  )
}
