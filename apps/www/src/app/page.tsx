import { RiArrowRightUpLine, RiGithubFill } from '@remixicon/react'

import { AnimatedUnderlinedText } from '@/components/animated-underlined-text'
import { BackgroundPattern } from '@/components/background-pattern'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

import { cn } from '@/utilities/cn'

export default function Home() {
  const currentYear = new Date().getFullYear()

  return (
    <div
      className={cn('relative flex min-h-screen items-center justify-center')}
    >
      <section className={cn('max-w-[32.5rem]')}>
        <Logo />

        <main className={cn('mt-6 mb-8 space-y-3')}>
          <h1 data-typography="title" data-size="lg">
            Speed for purposeful{' '}
            <AnimatedUnderlinedText>developers</AnimatedUnderlinedText>
          </h1>

          <p
            className={cn(
              'text-fg-1/70 [&>strong]:font-medium [&>strong]:text-fg-1',
            )}
            data-typography="body"
            data-size="md"
          >
            A minimalist <strong>React</strong> component library powered by{' '}
            <strong>TailwindCSS</strong> and <strong>Ark UI</strong> —
            accessible by default, themeable, and production-ready.
          </p>
        </main>

        <div className={cn('flex items-center gap-3')}>
          <Button size="sm">
            Get Started
            <RiArrowRightUpLine />
          </Button>

          <Button variant="secondary" size="sm">
            <RiGithubFill />
            Star on
            <span
              className={cn(
                'rounded-lg bg-fill-2 px-1.5 py-px font-semibold text-fill-5 text-sm leading-5.5',
              )}
            >
              18
            </span>
          </Button>
        </div>
      </section>

      <footer className={cn('absolute bottom-12')}>
        <span className={cn('text-fg-1/40 text-sm leading-5.5')}>
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

      <BackgroundPattern />
    </div>
  )
}
