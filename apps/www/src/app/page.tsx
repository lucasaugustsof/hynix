import { RiArrowRightUpLine, RiGithubFill } from '@remixicon/react'

import { AnimatedUnderlinedText } from '@/components/animated-underlined-text'
import { BackgroundPattern } from '@/components/background-pattern'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'

import { cn } from '@/utilities/cn'
import { fetchGithubStars } from '@/utilities/fetch-github-stars'

export default async function Home() {
  const githubStars = await fetchGithubStars()

  return (
    <div
      className={cn(
        'relative flex h-dvh items-center justify-center',
        'lg:h-screen',
      )}
    >
      <section className={cn('max-w-[32.5rem] px-6')}>
        <Logo />

        <main className={cn('mt-6 mb-8 space-y-3')}>
          <h1 className={cn('font-semibold text-2xl/9.5 text-fg-1')}>
            Speed for purposeful{' '}
            <AnimatedUnderlinedText>developers</AnimatedUnderlinedText>
          </h1>

          <p
            className={cn(
              'text-base text-fg-1/70 [&>strong]:font-medium [&>strong]:text-fg-1',
            )}
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
                'rounded-lg bg-fill-2 px-1.5 py-px font-semibold text-fill-5 text-sm/5.5',
              )}
            >
              {githubStars}
            </span>
          </Button>
        </div>
      </section>

      <Footer />
      <BackgroundPattern />
    </div>
  )
}
